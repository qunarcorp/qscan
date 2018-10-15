const fs = require('fs');
const path = require('path');
const prog = require('commander');

// 通过遍历的形式设置 option
// https://github.com/tj/commander.js/pull/140
prog.Command.prototype.and = function(fn) {
    fn.call(this, this);
    return this;
  };

const pkgJSON = require('../package.json');

prog.version(pkgJSON.version, '-v, --version');
    // .usage('<command> [options]');

fs.readdirSync(path.join(__dirname, './commands')).forEach(file => {
    if (/\.js$/.test(file)) {
        const cmd = require(`./commands/${file}`);
        const name = path.basename(file, '.js');
        // prog.command(name)
        //     .usage(cmd.usage)
        //     .description(cmd.description)
        //     .and(function(prog) {
        //         if (cmd.options) {
        //             cmd.options.forEach(function(option) {
        //                 prog.option(option.pattern, option.desc);
        //           });
        //         }
        //       })
        //     .action(function (arg) {
        //         cmd.action(process.cwd(), arg);
        //     })
            // .action(cmd.action);
        let program = prog.command(name)
            .usage(cmd.usage)
            .description(cmd.description);
        Object.keys(cmd.options).forEach(key => program = program.option(key, cmd.options[key]));
        program.action(cmd.action);
    }
});

prog.parse(process.argv);

if (!prog.args.length) {
    prog.help();
}