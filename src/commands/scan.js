module.exports = {
    usage: '[options]',
    description: '扫描二维码',
    options: {
        '-u, --uri': '二维码地址',
        '-f, --file': '二维码本地图片文件地址',
        '-m, --model': '使用的扫码模式',
        '-t, --type': '使用的扫码类型',
        '-d, --device': '指定设备的 UDID'
    },
    action: (rc, options) => {
        
    }
};