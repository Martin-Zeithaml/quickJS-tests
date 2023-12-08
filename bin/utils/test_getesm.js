import * as shell from '../../../bin/libs/shell';
import * as log from '../../log';

export function test_getesm() {
    const TESTS = {
        t1: { parms: '-h', expected: { rc: 0, out: false } },
        t2: { parms: '', expected: { rc: 0, out: true } },
        t3: { parms: 'asdf', expected: { rc: 1, out: false } }
    }
    let infos = [];
    let errors = [];

    for (let test in TESTS) {
        const parms = TESTS[test].parms;
        const result = shell.execOutSync('sh', '-c', `../bin/utils/getesm ${parms}`);
        if (TESTS[test].expected.out) {
            const expected = shell.execOutSync('sh', '-c', "./bin/utils/getesm.rexx");
            log.infoAndErr(infos, errors, 'bin/utils/getesm', 'getesm', parms, result.out, expected.out)
        } else {
            log.infoAndErr(infos, errors, 'bin/utils/getesm', 'getesm', parms, result.rc, TESTS[test].expected.rc)
        }
        
    }
    
    return { infos, errors }
}
