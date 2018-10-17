const QScan = require('./core/qcan');

// 中间件
QScan.middleWare = ({customModel, modelOpts}) => {
    const scan = new QScan({customModel, modelOpts});
    return (req, res) => {
        // TODO
    };
};

module.exports = QScan;