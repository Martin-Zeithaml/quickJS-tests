import * as shell from '../../../bin/libs/shell';
import * as tester from '../../tester';

const EXEC_TESTS = {
    t1: { parms: null, expected: { shell: true } },
    t2: { parms: undefined, expected: { shell: true } },
    t3: { parms: true, expected: { shell: true } },
    t4: { parms: false, expected: { shell: true } },
    t5: { parms: '', expected: { shell: true } },
    t6: { parms: 'a'.repeat(512), expected: { shell: true } },
    t7: { parms: ['aaa','bbb','ccc','ddd','eee'], expected: { shell: true } },
    t800: { parms: ['sysvar', 'SYSNAME'], expected: { shell: true } },
    t9: { parms: ['sysvar', 'AAAAAAAAAAAAAAA'], expected: { shell: true } },
    t10: { parms: 'cat ./files/hello.txt', expected: { shell: true } },
    t11: { parms: 'echo "Hello, world!" && cat hello.txt', expected: { shell: true } },
    t12: { parms: 'cat ./files/hello.txt >', expected: { shell: true } },
    t13: { parms: 'cat ./files/hello.txt >\\', expected: { shell: true } },
    t14: { parms: 'echo "Hello, world!" > /dev/null', expected: { shell: true } },
    t15: { parms: 'cat file.which.does.not.exist', expected: { shell: true } },
    t16: { parms: 'cat ./files/hello.txt | od -x', expected: { shell: true } },
    t17: { parms: 'cat ./files/hello.txt | iefbr14 | od -x', expected: { shell: true } },
    t18: { parms: 'ls -al', expected: { shell: true } },
    t19: { parms: 'list_all_files_in_current_directory -al', expected: { shell: true } },
    t20: { parms: 'java -version', expected: { shell: true } },
    t21: { parms: ['java', '-version'], expected: { shell: true } },
    t22: { parms: 'onetstat -h', expected: { shell: true } },
    t23: { parms: './files/iefbr14', expected: { shell: true } },
    t24: { parms: './files/iefbr14_print', expected: { shell: true } },
    t25: { parms: './files/iefbr14 && ./files/iefbr14_print', expected: { shell: true } },
    t26: { parms: 'for a in 1 2 3; do eval x$a="test"; done && echo $x1 $x2 $x3', expected: { shell: true } },
    t27: { parms: 'for a in 1 2 3 do eval x$a="test" done && echo $x1 $x2 $x3', expected: { shell: true } },
    t28: { parms: 'for i in 1 2 3 4 5 6 7 8 9 10; do if [ "$i" = "2" ]; then echo $i > /dev/null; else echo $i; fi; done', expected: { shell: true } },
    t29: { parms: 'sleep 1', expected: { shell: true } },
    t30: { parms: 'sleep -1', expected: { shell: true } }
}

export function test_execOutSync() {
    return tester.process(EXEC_TESTS, 'bin/libs/shell: execOutSync', shell.execOutSync);
}

export function test_execErrSync() {
    return tester.process(EXEC_TESTS, 'bin/libs/shell: execErrSync', shell.execErrSync);
}

export function test_execOutErrSync() {
    return tester.process(EXEC_TESTS, 'bin/libs/shell: execOutErrSync', shell.execOutErrSync);
}
