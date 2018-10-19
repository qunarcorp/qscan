const pkgJSON = require('../package.json');
const xpathMap = require(`./models/wx_default_cfg/xpath-map_${pkgJSON.support_wx_version}`);

findBtnName = function(message) {
    let regex = /(\(.+?)\)/g;
    let xpath = message.replace('\\', '').match(regex)[0].split('').slice(2, -2).join('').replace('\\', '');
    return xpathMap[xpath];
};

module.exports = {
    handleResponse: function(res, cb) {
        switch(res.status) {
            case '7': 
                let name = findBtnName(res.message);
                cb(`找不到元素: ${name}`);
                break;
            case '6':
                cb(res.message);
                break;
            default:
                cb('运行失败, 请执行 doctor 命令检查运行环境');
                break;
        }
    }
}
