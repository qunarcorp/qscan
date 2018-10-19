const pkgJSON = require('../package.json');

getXpathMap = function() {
    let xpathMap = {};
    const btns = require(`./models/wx_default_cfg/wx_${pkgJSON.support_wx_version}`);
    for(key in btns) {
        if(btns.hasOwnProperty(key)) {
            btns[key].id ? xpathMap[btns[key].id] = btns[key].name
                : xpathMap[btns[key].xpath] = btns[key].name;
        }
    }
    return xpathMap;
};

//  忽略根据id 查找元素
findBtnName = function(message) {
    const regex = /(\(.+?)\)/g;
    const xpath = message.replace('\\', '').match(regex)[0].split('').slice(2, -2).join('').replace('\\', '') || '';
    const xpathMap = getXpathMap();
    return xpathMap[xpath] || '';
};

module.exports = {
    handleError: function(res) {
        let name = '';
        switch(res.status) {
        case 6:
            return new Error(`会话没有启动或者被意外终止`);
        case 7:
            name = findBtnName(res.message);
            return new Error(`找不到元素: ${name}`);
        case 13:
            name = findBtnName(res.message);
            return new Error(`定位元素: ${name} 超时`);
        default:
            return res;
        }
    }
}
