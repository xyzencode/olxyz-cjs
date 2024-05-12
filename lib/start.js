const path = require("path");
const { spawn } = require("child_process");
const { watchFile, unwatchFile } = require("fs");
const treeKill = require("./tree-kill");

let activeProcess = null

function start(file) {
    if (activeProcess) {
        treeKill(activeProcess.pid, 'SIGTERM', err => {
            if (err) {
                console.error('Error stopping process:', err);
            } else {
                console.log('Process stopped.');
                activeProcess = null;
                start(file);
            }
        });
    } else {
        console.log('Starting . . .');
        let args = [path.join(process.cwd(), file), ...process.argv.slice(2)];
        let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
            .on('message', data => {
                console.log('[RECEIVED]', data);
                switch (data) {
                    case 'reset':
                        start(file);
                        break;
                    case 'uptime':
                        p.send(process.uptime());
                        break;
                }
            })
            .on('exit', code => {
                console.error('Exited with code:', code);
                if (Number(code) && code === 0) return;
                watchFile(args[0], () => {
                    unwatchFile(args[0]);
                    start(file);
                });
            });

        activeProcess = p;
    }
}

module.exports = start;