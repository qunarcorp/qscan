const QScan = require('../core/qcan');
const Logger = require('../logger');

module.exports = {
    usage: '[options]',
    description: '检查运行环境',
    options: {
        '-c, --customModel <customModel>': '自定义模式路径，默认为空',
        '-r, --runConfig <runConfig>': '运行配置绝对路径，默认为 ~/.qscanrc'       
    },
    action: (options) => {
        new QScan({
            customModel: options.customModel || null,
            modelOpts: options.runConfig || null
        }).doctor((err) => {
            if (err) {
                Logger.error(`检查运行环境 —— 失败！${err}`);
            } else {
                Logger.success('检查运行环境 —— 成功！');
            }
        });
    }
};