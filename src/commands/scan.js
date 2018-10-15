module.exports = {
    usage: '[options]',
    description: '扫描二维码',
    options: [{
        pattern: '-u, --uri',
        desc: '二维码地址'
    }, {
        pattern: '-f, --file',
        desc: '二维码本地图片文件地址'
    },{
        pattern: '-m, --model',
        desc: '使用的扫码模式'
    },{
        pattern:  '-t, --type',
        desc: '使用的扫码类型'
    }, {
        pattern: '-d, --device',
        desc: '指定设备的 UDID'
    }],
    action: (rc, options) => {

    }
};