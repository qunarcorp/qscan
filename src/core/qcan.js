const fs = require('fs');
const path = require('path');
const wd = require('wd');
const async = require('async');
const applescript = require('applescript');
const Queue = require('queue');
const EventEmitter = require('events').EventEmitter;
const shelljs = require('shelljs');
const logger = require('../logger');

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
        // webdrivers
        this.wds = {};
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
        fs.readdirSync(DEFAULT_MODEL_PATH).forEach(file => {
            if (path.extname(file) === '.js') {
                this.__loadModelFile({
                    modelFilePath: path.join(DEFAULT_MODEL_PATH, file),
                    modelOpts
                });
            }
        });
        // 读取自定义 model，可以从指定目录读取，或者直接传入对象(key-value)或数组
        if (customModel) {
            if (typeof customModel === 'string' && fs.existsSync(customModel)) {
                fs.readdirSync(customModel, file => {
                    if (path.extname(file) === '.js') {
                        this.__loadModelFile({
                            modelFilePath: path.join(customModel, file),
                            modelOpts
                        });
                    }
                });
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
    doctor(cb) {
        const tasks = [];
        let ports = [],
            devices = [],
            connectDevices = [];
        tasks.push(cb => {
            // TODO Check Appium

            if (!shelljs.which('appium')) {
                cb('Not Found Appium');
            } else {
                cb(null);
            }
        });

        if (this.models) {
            let appServers = shelljs
                .exec('ps | grep "appium"', { silent: true })
                .stdout.trim()
                .split('\n');
            appServers.forEach(item => {
                let devicesRes = item.match(/[-U]{1} ([0-9A-Za-z]+)/);
                devicesRes && devices.push(devicesRes[1]);
                let portsRes = item.match(/[-p]{1} ([0-9]+)/);
                portsRes && ports.push(portsRes[1]);
            });

            connectDevices = shelljs
                .exec('adb devices', { silent: true })
                .stdout.trim()
                .split('\n')
                .map(item => {
                    return item.split('\t')[0].trim();
                });
        }

        Object.keys(this.models).forEach(key => {
            let modelName = this.models[key].name;
            if (modelName && this.models[modelName]) {
                const model = this.models[modelName];

                if (model.udid) {
                    tasks.push(cb => {
                        // TODO Check Devices
                        // model.udid
                        if (!connectDevices.includes(model.udid)) {
                            cb(`Can Not Found device: ${model.udid}`);
                            return;
                        }
                        // appium -u
                        if (!devices.includes(model.udid)) {
                            cb(
                                `There is no appium server at devices: ${
                                    model.udid
                                }`
                            );
                            return;
                        }
                        logger.success('The devices is ok');
                        cb(null);
                    });
                }
                if (model.port) {
                    tasks.push(cb => {
                        // TODO Check Appium Process
                        if (!ports.includes(model.port)) {
                            cb(
                                `There is no appium server at port: ${
                                    model.port
                                }`
                            );
                            return;
                        }
                        logger.success('The port is ok');
                        cb(null);
                    });
                }
                if (model.checkApp) {
                    tasks.push(cb => model.checkApp(cb, model.udid));
                }

                if(model.udid) {
                    tasks.push( cb => {
                        shelljs.exec(`adb -s ${model.udid} shell rm -r /sdcard/TBS`, { silent: true }, (code, stdout, stderr) => {
                            if(code === 0) {
                                logger.success('Delete TBS ok')
                                cb(null)
                            } else {
                                cb(stderr)
                            }
                        });
                    })
                }
            }
        });
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
    __clearTbsCache(cb) {
        shelljs.exec('adb shell rm -r /sdcard/TBS', { silent: false }, () => {
            cb();
        });
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
        const { port, udid } = model;

        const process = shelljs
            .exec(`ps -A | awk '/appium/{print $1 " " $4 " " $7 " " $9}'`, {
                silent: true
            })
            .stdout.split('\n')
            .filter(t => {
                const l = t.trim().split(' ');
                return l[1] === 'node' && +l[2] === +port && l[3] === udid;
            });

        if (process.length) return cb();

        const APPIUM_CLI = shelljs
            .exec('which appium', {
                silent: true
            })
            .stdout.replace('\n', '');

        const script = `tell application "Terminal"
                            activate
                            do script ("${APPIUM_CLI} -p ${port} -U ${udid}")
                        end tell`;

        applescript.execString(script, function(err) {
            setTimeout(() => cb(err), 4000);
        });
    }
    __initConnect(model) {
        let ret = null;

        if (this.wds[model.port]) {
            ret = this.wds[model.port];
        } else {
            this.wds[model.port] = ret = wd
                .promiseChainRemote({
                    host: LOCAL_HOST,
                    port: model.port
                })
                .init(model.connectOpt)
                .setImplicitWaitTimeout(model.waitTimeout || WAIT_TIMEOUT);
        }

        return ret;
    }
    __initModel(model) {
        return this.__clearTbsCache(() => {
            model.init(this.__initConnect(model), model.opts);
        });
    }
    __checkStatus(model, cb) {
        model.checkStatus(this.__initConnect(model), model.opts, cb);
    }
    __handleDevice({ modelName, type }, cb) {
        const model = this.models[modelName];

        if (model) {
            if (model.types && model.types[type]) {
                this.__connectAppium(model, err => {
                    if (err) {
                        cb(err);
                    } else {
                        // 检测登录状态
                        this.__checkStatus(model, (err, flag, app) => {
                            if (!err) {
                                if (flag) {
                                    // 可以直接扫码
                                    model.types[type](app, model.opts)
                                        .catch(e => {
                                            cb(e);
                                        })
                                        .finally(() => {
                                            cb(null);
                                        });
                                } else {
                                    // 重新登录并扫码
                                    model.types[type](
                                        this.__initModel(model),
                                        model.opts
                                    )
                                        .catch(e => {
                                            cb(e);
                                        })
                                        .finally(() => {
                                            cb(null);
                                        });
                                }
                            } else {
                                // 尝试再检测
                                cb(err);
                                // this.__handleDevice({ modelName, type }, cb);
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
