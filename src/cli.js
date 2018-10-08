const fs = require('fs');
const path = require('path');
const prog = require('commander');

const pkgJSON = require('../package.json');

prog.version(pkgJSON.version, '-v, --version')
    .usage('<command> [options]');

fs.readdirSync(path.join(__dirname, './commands')).forEach(file => {
    if (/\.js$/.test(file)) {
        const cmd = require(`./commands/${file}`);
        const name = path.basename(file, '.js');
        const program = prog.command(name)
            .usage(cmd.usage)
            .description(cmd.description)
            .action(cmd.action);
        
    }
});

prog.parse(process.argv);

if (!prog.args.length) {
    prog.help();
}