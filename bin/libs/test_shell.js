import * as shell from '../../../bin/libs/shell';
import * as tester from '../../tester';

const FILE = 'bin/libs/shell'

const EXEC_TESTS = {
    setting: { shell: true },
    testset: {
        t1: { parms: null },
        t2: { parms: undefined },
        t3: { parms: true },
        t4: { parms: false },
        t5: { parms: '' },
        t6: { parms: 'a'.repeat(512) },
        t7: { parms: ['aaa','bbb','ccc','ddd','eee'] },
        t800: { parms: ['sysvar', 'SYSNAME'] },
        t9: { parms: ['sysvar', 'AAAAAAAAAAAAAAA'] },
        t10: { parms: 'cat ./files/hello.txt' },
        t11: { parms: 'echo "Hello, world!" && cat hello.txt' },
        t12: { parms: 'cat ./files/hello.txt >' },
        t13: { parms: 'cat ./files/hello.txt >\\' },
        t14: { parms: 'echo "Hello, world!" > /dev/null' },
        t15: { parms: 'cat file.which.does.not.exist' },
        t16: { parms: 'cat ./files/hello.txt | od -x' },
        t17: { parms: 'cat ./files/hello.txt | iefbr14 | od -x' },
        t18: { parms: 'ls -al' },
        t19: { parms: 'list_all_files_in_current_directory -al' },
        t20: { parms: 'java -version' },
        t21: { parms: ['java', '-version'] },
        t22: { parms: 'onetstat -h' },
        t23: { parms: './files/iefbr14' },
        t24: { parms: './files/iefbr14_print' },
        t25: { parms: './files/iefbr14 && ./files/iefbr14_print' },
        t26: { parms: 'for a in 1 2 3; do eval x$a="test"; done && echo $x1 $x2 $x3' },
        t27: { parms: 'for a in 1 2 3 do eval x$a="test" done && echo $x1 $x2 $x3' },
        t28: { parms: 'for i in 1 2 3 4 5 6 7 8 9 10; do if [ "$i" = "2" ]; then echo $i > /dev/null; else echo $i; fi; done' },
        t29: { parms: 'sleep 1' },
        t30: { parms: 'sleep -1' }
    }
}

export function test_execOutSync() {
    return tester.process(EXEC_TESTS, FILE, shell.execOutSync);
}

export function test_execErrSync() {
    return tester.process(EXEC_TESTS, FILE, shell.execErrSync);
}

export function test_execOutErrSync() {
    return tester.process(EXEC_TESTS, FILE, shell.execOutErrSync);
}
