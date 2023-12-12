import * as shell from '../../../bin/libs/shell';
import * as tester from '../../tester';

const EXEC_TESTS = {
    t1: { parms: null, expected: { execOnly: true } },
    t2: { parms: undefined, expected: { execOnly: true } },
    t3: { parms: true, expected: { execOnly: true } },
    t4: { parms: false, expected: { execOnly: true } },
    t5: { parms: '', expected: { execOnly: true } },
    t6: { parms: 'a'.repeat(512), expected: { execOnly: true } },
    t7: { parms: ['aaa','bbb','ccc','ddd','eee'], expected: { execOnly: true } },
    t800: { parms: ['sysvar', 'SYSNAME'], expected: { execOnly: true } },
    t9: { parms: ['sysvar', 'AAAAAAAAAAAAAAA'], expected: { execOnly: true } },
    t10: { parms: 'cat ./files/hello.txt', expected: { execOnly: true } },
    t11: { parms: 'echo "Hello, world!" && cat hello.txt', expected: { execOnly: true } },
    t12: { parms: 'cat ./files/hello.txt >', expected: { execOnly: true } },
    t13: { parms: 'cat ./files/hello.txt >\\', expected: { execOnly: true } },
    t14: { parms: 'echo "Hello, world!" > /dev/null', expected: { execOnly: true } },
    t15: { parms: 'cat file.which.does.not.exist', expected: { execOnly: true } },
    t16: { parms: 'cat ./files/hello.txt | od -x', expected: { execOnly: true } },
    t17: { parms: 'cat ./files/hello.txt | iefbr14 | od -x', expected: { execOnly: true } },
    t18: { parms: 'ls -al', expected: { execOnly: true } },
    t19: { parms: 'list_all_files_in_current_directory -al', expected: { execOnly: true } },
    t20: { parms: 'java -version', expected: { execOnly: true } },
    t21: { parms: ['java', '-version'], expected: { execOnly: true } },
    t22: { parms: 'onetstat -h', expected: { execOnly: true } },
    t23: { parms: './files/iefbr14', expected: { execOnly: true } },
    t24: { parms: './files/iefbr14_print', expected: { execOnly: true } },
    t25: { parms: './files/iefbr14 && ./files/iefbr14_print', expected: { execOnly: true } },
    t26: { parms: 'for a in 1 2 3; do eval x$a="test"; done && echo $x1 $x2 $x3', expected: { execOnly: true } },
    t27: { parms: 'for a in 1 2 3 do eval x$a="test" done && echo $x1 $x2 $x3', expected: { execOnly: true } },
    t28: { parms: 'for i in 1 2 3 4 5 6 7 8 9 10; do if [ "$i" = "2" ]; then echo $i > /dev/null; else echo $i; fi; done', expected: { execOnly: true } },
    t29: { parms: 'sleep 1', expected: { execOnly: true } },
    t30: { parms: 'sleep -1', expected: { execOnly: true } }
}

export function test_execOutSync() {
    return tester(EXEC_TESTS, 'bin/libs/shell: execOutSync', shell.execOutSync);
}

export function test_execErrSync() {
    return tester.process(EXEC_TESTS, 'bin/libs/shell: execErrSync', shell.execErrSync)
}

export function test_execOutErrSync() {
    return tester.process(EXEC_TESTS, 'bin/libs/shell: execOutErrSync', shell.execOutErrSync)
}
