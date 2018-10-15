const QScan = require('../core/qcan');
const Logger = require('../logger');

module.exports = {
    usage: '[options]',
    description: '检查运行环境',
    options: {
        '-c, --customModel <customModel>': '自定义模式路径，默认为空',
        '-r, --runConfig <runConfig>': '运行配置，默认为 ~/.qscanrc'       
    },
    action: (options) => {
        new QScan({
            customModel: options.customModel || null,
            runConfig: options.runConfig || null
        }).doctor((err) => {
            if (err) {
                Logger.error('检查运行环境 —— 失败！');
            } else {
                Logger.success('检查运行环境 —— 成功！');
            }
        });
    }
};