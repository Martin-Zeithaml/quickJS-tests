import * as shell from '../../../bin/libs/shell';
import * as tester from '../../tester';

function getESMRexx(){
    const result = shell.execOutSync('sh', '-c', "./bin/utils/getesm.rexx");
    console.log(result.rc);
    console.log(result.out);
    return result.out;
}

export function test_getesm() {
    const TESTS = {
        setting : { binary: true },
        testset: {
            t1: { parms: '-h', expected: { rc: 0 } },
            t2: { parms: '', expected: { rc: 0, out: getESMRexx() } },
            t3: { parms: 'asdf', expected: { rc: 1 } }
        }
    }
    return tester.process(TESTS, 'bin/libs/utils', '../bin/utils/getesm');
}
