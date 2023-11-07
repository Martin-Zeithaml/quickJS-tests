import * as zos from '../../../bin/libs/zos';
import * as log from '../../log';

export function test_tsoCommand() {
    const TESTS = {
        t1: {
            parms: "LISTDS '1'",
            expected: "LISTDS '1'\nIKJ56709I INVALID DATA SET NAME, '1'" 
        },
        t2: {
            parms: "HELP",
            expected: 0
        },
        t3: {
            parms: "",
            expected: 255
        }
    }    
    let infos = [];
    let errors = [];

    for (let test in TESTS){
        const parms = TESTS[test].parms;
        const result = zos.tsoCommand(parms);
        let resultToCheck;
        const expected = TESTS[test].expected;
        if ((typeof expected) == 'number'){
            resultToCheck = result.rc;
        } else {
            resultToCheck = result.out;
        }
        log.infoAndErr(infos, errors, 'bin/libs/zos', 'tsoCommand', parms, resultToCheck, expected);
    }

    return { infos, errors }
}
