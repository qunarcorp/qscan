const fs = require('fs');
const path = require('path');
const wd = require('wd');
const async = require('async');
const applescript = require('applescript');

const Queue = require('queue');
const EventEmitter = require('events').EventEmitter;
const shelljs = require('shelljs');
// 本地 Host
const LOCAL_HOST = '127.0.0.1';
// 默认的等待时间
const WAIT_TIMEOUT = 3000;
// 队列配置
const QUEUE_OPTS = {
    concurrency: 1, // 并发任务数1，等于串行
    timeout: 10 * 60 * 1000, // 单个任务超时，10分钟
    autostart: true // 有任务自动执行
};
// 默认的 Model
const DEFAULT_MODEL_PATH = path.join(__dirname, '../models');
// 默认的配置文件路径
const DEFAULT_MODEL_OPTS_PATH = path.join(process.env['HOME'], '.qscanrc');

class QScan extends EventEmitter {
    constructor({ customModel, modelOpts }) {
        super();
        // Models
        this.models = {};
        // 队列
        this.queues = {};
        // 读取配置 默认从 ~/.qscanrc 读取，也可以传进来
        if (modelOpts) {
            if (typeof modelOpts === 'string' && fs.existsSync(modelOpts)) {
                modelOpts = JSON.parse(fs.readFileSync(modelOpts, 'UTF-8'));
            }
        } else if (fs.existsSync(DEFAULT_MODEL_OPTS_PATH)) {
            modelOpts = JSON.parse(
                fs.readFileSync(DEFAULT_MODEL_OPTS_PATH, 'UTF-8')
            );
        } else {
            modelOpts = {};
        }
        
        // 读取默认的 Model
        fs.readdirSync(DEFAULT_MODEL_PATH).forEach(file =>
            this.__loadModelFile({
                modelFilePath: path.join(DEFAULT_MODEL_PATH, file),
                modelOpts
            })
        );
        // 读取自定义 model，可以从指定目录读取，或者直接传入对象(key-value)或数组
        if (customModel) {
            if (typeof customModel === 'string' && fs.existsSync(customModel)) {
                fs.readdirSync(customModel, file =>
                    this.__loadModelFile({
                        modelFilePath: path.join(customModel, file),
                        modelOpts
                    })
                );
            } else {
                Object.keys(customModel).forEach(key => {
                    const model = customModel[key];
                    const opts = modelOpts[model.name || 'default'] || {};
                    this.loadModel({
                        model,
                        ...opts
                    });
                });
            }
        }
    }
    // 检查环境
    doctor(modelName, cb) {
        const tasks = [];
        let ports = [];
        tasks.push(cb => {
            // TODO Check Appium
            console.log('check appium');
            let appServers = shelljs
                .exec('ps | grep "appium"', { silent: true})
                .stdout.trim().split('\n');
            !appServers.some(server => server.includes('node')) && cb('There is no appium server!');
            appServers.forEach(item => {
                    let pres = item.match(/[-p]{1} ([0-9]+)/);
                    pres && ports.push(pres[1]);
                });
            console.log('check appium over');
        });

        if (modelName && this.models[modelName]) {
            const model = this.models[modelName];
            if (model.udid) {
                tasks.push(cb => {
                    // TODO Check Devices
                    // model.udid
                    if(!shelljs
                        .exec('adb devices', {
                            silent: true
                        })
                        .stdout.trim().split('\n').some(item => {
                            item.split('\t')[0] === model;
                        })
                    ) {   
                        cb(`can not found device${model.udid}`);
                    }
                });
            }
            if (model.port) {
                tasks.push(cb => {
                    // TODO Check Appium Process
                    if(!ports.some(port => port === model.port)) {
                        cb(`There is no appium server at port${model.port}`);
                    }
                });
            }
            if (model.checkApp) {
                tasks.push(cb => model.checkApp(cb));
            }
        }
        async.series(tasks, cb);
    }
    loadModel({ model, udid, port, opts }) {
        if (udid) {
            model.udid = model.connectOpt.udid = udid;
        }
        if (port) {
            model.port = port;
        }
        if (opts) {
            model.opts = opts;
        }
        this.models[model.name] = model;
    }
    run({ modelName, type }, cb) {
        if (!this.queues[modelName]) {
            this.queues[modelName] = new Queue(QUEUE_OPTS);
        }
        this.queues[modelName].push(callback => {
            this.__handleDevice({ modelName, type }, err => {
                cb(err);
                callback();
            });
        });
        
    }
    clone({ newModelName, oldModelName, opts }) {
        this.models[newModelName] = Object.assign(
            {},
            this.models[oldModelName] || {},
            { opts }
        );
    }
    __loadModelFile({ modelFilePath, modelOpts }) {
        const model = require(modelFilePath);
        const opts = modelOpts[model.name || 'default'] || {};
        this.loadModel({
            model,
            ...opts
        });
    }
    __connectAppium(model, cb) {
        const { port, uuid } = model;

        const APPIUM_CLI = shelljs
            .exec('which appium', {
                silent: true
            })
            .stdout.replace('\n', '');

        const script = `tell application "Terminal"
                            activate
                            do script ("${APPIUM_CLI} -p ${port} -U ${uuid}")
                        end tell`;

        applescript.execString(script, function(err) {
            if (err) {
                throw err;
            }

            cb();
        });
    }
    __initConnect(model) {
        return wd
            .promiseChainRemote({
                host: LOCAL_HOST,
                port: model.port
            })
            .init(model.connectOpt)
            .setImplicitWaitTimeout(model.waitTimeout || WAIT_TIMEOUT);
    }
    __initModel(model) {
        console.log('__init Model');
        return model.init(this.__initConnect(model), model.opts);
    }
    __checkStatus(model, cb) {
        console.log('__checkStatus');
        let init = this.__initConnect(model);
        console.log('init', init);   
        console.log('!!!!!!init  click after');

        model.checkStatus(this.__initConnect(model), model.opts, cb);
    }
    __handleDevice({ modelName, type }, cb) {
        const model = this.models[modelName];
        if (model) {
            if (model.types && model.types[type]) {
                // 检测运行环境
                this.doctor(modelName, err => {
                    if (err) {
                        console.log('doctor error', err);
                        // 启动appium
                        this.__connectAppium(
                            model,
                            this.__handleDevice({ modelName, type }, cb)
                        );
                    } else {
                        // 检测登录状态
                        console.log('检登录状态');
                        this.__checkStatus(model, (err, flag, app) => {
                            if (!err) {
                                if (flag) {
                                    // 可以直接扫码
                                    model.types[type](app, model.opts, cb);
                                } else {
                                    // 重新登录并扫码
                                    model.types[type](
                                        this.__initModel(model),
                                        model.opts,
                                        cb
                                    );
                                }
                            } else {
                                // 尝试再检测
                                console.log(err);
                                this.__handleDevice({ modelName, type }, cb);
                            }
                        });
                    }
                });
            } else {
                cb(new Error(`Not Found This Type <${type}>.`));
            }
        } else {
            cb(new Error(`Not Found This Model <${modelName}>.`));
        }
    }
}

module.exports = QScan;
