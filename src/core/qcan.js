const fs = require('fs');
const path = require('path');
const wd = require('wd');
const async = require('async');

const Queue = require('queue');
const EventEmitter = require('events').EventEmitter;

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
    constructor({customModel, modelOpts}) {
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
            modelOpts = JSON.parse(fs.readFileSync(DEFAULT_MODEL_OPTS_PATH, 'UTF-8'));
        } else {
            modelOpts = {};
        }
        // 读取默认的 Model
        fs.readdirSync(DEFAULT_MODEL_PATH).forEach((file) => this.__loadModelFile({
            modelFilePath: path.join(DEFAULT_MODEL_PATH, file),
            modelOpts
        }));
        // 读取自定义 model，可以从指定目录读取，或者直接传入对象(key-value)或数组
        if (customModel) {
            if (typeof customModel === 'string' && fs.existsSync(customModel)) {
                fs.readdirSync(customModel, (file) => this.__loadModelFile({
                    modelFilePath: path.join(customModel, file),
                    modelOpts
                }));
            } else {
                Object.keys(customModel).forEach((key) => {
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
        tasks.push((cb) => {
            // TODO Check Appium
        });
        if (modelName && this.models[modelName]) {
            const model = this.models[modelName];
            if (model.udid) {
                tasks.push((cb) => {
                    // TODO Check Devices
                    // model.udid
                });
            }
            if (model.port) {
                tasks.push((cb) => {
                    // TODO Check Appium Process
                });
            }
            if (model.checkApp) {
                tasks.push((cb) => model.checkApp(cb));
            }
        }
        async.series(tasks, cb);
    }
    loadModel({model, udid, port, opts}) {
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
    run({modelName, type}, cb) {
        if (!this.queues[modelName]) {
            this.queues[modelName] = new Queue(QUEUE_OPTS);
        }
        this.queues[modelName].push((callback) => {
            this.__handleDevice({modelName, type, reset: false}, (err) => {
                cb(err);
                callback();
            });
        });
    }
    clone({newModelName, oldModelName, opts}) {
         this.models[newModelName] = Object.assign({}, this.models[oldModelName] || {}, {opts});
    }
    __loadModelFile({modelFilePath, modelOpts}) {
        const model = require(modelFilePath);
        const opts = modelOpts[model.name || 'default'] || {};
        this.loadModel({
            model,
            ...opts
        });
    }
    __connectAppium(model, cb) {
        //TODO Connect for Start Appium
        setTimeout(() => {
            cb(null);
        }, 100);
    }
    __initConnect(model, reset) {
        return wd.promiseChainRemote({
            host: LOCAL_HOST,
            port: model.port, 
        }).init(Object.assign({}, model.connectOpt, {
            noReset: !reset
        })).setImplicitWaitTimeout(model.waitTimeout || WAIT_TIMEOUT);
    }
    __initModel(model, reset) {
        return model.init(this.__initConnect(model, reset));
    }
    __checkStatus(model, cb) {
        model.checkStatus(this.__initConnect(model), model.opts, cb);
    }
    __handleDevice({modelName, type, reset}, cb) {
        const model = this.models[modelName];
        if (model) {
            if (model.types && model.types[type]) {
                this.__connectAppium(model, (err) => {
                    if (err) {
                        cb(err);
                    } else if (reset) {
                        model.types[type](this.__initModel(model, true), model.opts).catch((e) => {
                            cb(e);
                        }).finally(() => {
                            cb(null);
                        });
                    } else {
                        this.__checkStatus(model, (err, flag) => {
                            if (!err && flag) {
                                console.log('nodel types type', model.types[type]);

                                model.types[type](this.__initModel(model, false), model.opts).catch((e) => {
                                    cb(e);
                                }).finally(() => {
                                    cb(null);
                                });
                            } else {
                                this.__handleDevice({modelName, type, reset: true}, cb);
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

