module.exports = {
    usage: '[options]',
    description: '检查运行环境',
    options: [{
        pattern: '-l, --login [mode]',
        desc: '对登录逻辑进行检查'
    }, {
        pattern: '-m, --moduleName [name]',
        desc: 'module name'
    }],
    action: (rc, options) => {
        console.log('options', options.moduleName);
    }
};