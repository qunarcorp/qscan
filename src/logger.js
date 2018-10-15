const colors = require('colors');
const moment = require('moment');
const figures = require('figures');

// 开启颜色显示
colors.enable();

// 右侧附加空格，为了保持对齐
function rightPad(str, len, ch) {
    len = len || 12;
    ch = ch || ' ';
    for (let i = 0, l = len - str.length; i < l; i++) {
        str += ch;
    }
    return str;
}

// 左侧附加空格，为了保持对齐
function leftPad(str, len, ch) {
    len = len || 12;
    ch = ch || ' ';
    for (let i = 0, l = len - str.length; i < l; i++) {
        str = ch + str;
    }
    return str;
}

// 给字符串加颜色
function addColor(str, color) {
    if (color) {
        color.split(",").forEach(style => (str = str[style]));
    }
    return str;
}

module.exports = {
    log: (logs) => {
        console.log.apply(
            console, [`[${moment().format("HH:mm:ss")}]`].concat(logs)
        );
    },
    formatLog: function (logo, tag, logs, color) {
        this.log(
            [rightPad(` ${logo}  ${tag.toUpperCase()}`)]
            .concat(logs)
            .map(log => addColor(log, color))
        );
    },
    info: function (...logs) {
        this.formatLog(figures.info, "info", logs);
    },
    await: function (...logs) {
        this.formatLog(figures.ellipsis, "await", logs, 'gray');
    },
    success: function (...logs) {
        this.formatLog(figures.tick, "success", logs, "green");
    },
    warn: function (...logs) {
        this.formatLog(figures.warning, "warn", logs, "yellow");
    },
    primary: function (...logs) {
        this.formatLog(figures.star, "primary", logs, "magenta");
    },
    error: function (...logs) {
        this.formatLog(figures.cross, "error", logs, "red,bold");
    }
};