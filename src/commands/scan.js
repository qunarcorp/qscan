const QScan = require('../core/qcan');
const Logger = require('../logger');
const Util = require('../util');

module.exports = {
    usage: '[options]',
    description: '扫描二维码',
    options: {
        '-c, --customModel <customModel>': '自定义模式路径，默认为空',
        '-r, --runConfig <runConfig>': '运行配置，默认为 ~/.qscanrc',
        '-m, --model <model>': '使用的扫码模式',
        '-t, --type <type>': '使用的扫码类型'
    },
    action: (options) => {

        if (!options.model || !options.type) {
            Logger.error(`使用的扫码模式 <Model> 和使用的扫码类型 <Type> 参数，必须传入。`);
        } else {
            new QScan({
                customModel: options.customModel || null,
                modelOpts: options.runConfig || null
            }).run({
                modelName: options.model,
                type: options.type 
            }, (err) => {
                if (err) {
                    Util.handleResponse(err, function(msg) {
                        Logger.warn(err.msg);
                        Logger.error(msg);
                    });
                } else {
                    Logger.success('执行成功！');
                }
            });
        }
    }
};