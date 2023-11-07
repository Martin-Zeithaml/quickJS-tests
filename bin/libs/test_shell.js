import * as shell from '../../../bin/libs/shell';
import * as log from '../../log';

export function test_execAnySync() {
    const FUNCTIONS = [ shell.execOutSync, shell.execErrSync, shell.execOutErrSync ];
    const COMMANDS = [
        [], [null], [undefined], [true], [false], [''],
        ['a'.repeat(512)],
        ['aaa','bbb','ccc','ddd','eee'],
        ['sysvar', 'SYSNAME'],
        ['sysvar', 'AAAAAAAAAAAAAAA'],
        ['cat ./files/hello.txt'],
        ['echo "Hello, world!" && cat hello.txt'],
        ['cat ./files/hello.txt >'],
        ['cat ./files/hello.txt >\\'],
        ['echo "Hello, world!" > /dev/null'],
        ['cat file.which.does.not.exist'],
        ['cat ./files/hello.txt | od -x'],
        ['cat ./files/hello.txt | iefbr14 | od -x'],
        ['ls -al'],
        ['list_all_files_in_current_directory -al'],
        ['java -version'],
        ['java', '-version'],
        ['onetstat -h'],
        ['./files/iefbr14'],
        ['./files/iefbr14_print'],
        ['./files/iefbr14 && ./files/iefbr14_print'],
        ['for a in 1 2 3; do eval x$a="test"; done && echo $x1 $x2 $x3'],
        ['for a in 1 2 3 do eval x$a="test" done && echo $x1 $x2 $x3'],
        ['for i in 1 2 3 4 5 6 7 8 9 10; do if [ "$i" = "2" ]; then echo $i > /dev/null; else echo $i; fi; done'],
        ['sleep 1'],
        ['sleep -1']
    ];
    let infos = [];
    let errors = [];

    FUNCTIONS.forEach(func => {
        COMMANDS.forEach(cmd => {
            if (cmd.length == 1){
                func('sh', '-c', cmd);
            } else {
                func(...cmd);
            }
            infos.push(log.msg('bin/libs/shell', `${func.name}`, `${cmd}`, '?', 'no shell freeze'));
        });
    });
    
    return { infos, errors }
}
