import * as ??? from '../../../bin/libs/???';
/*
import * as std from 'cm_std';
import * as os from 'cm_os';
import * as zos from 'zos'; !!!

import * as fs from '../../../bin/libs/fs';
import * as shell from '../../../bin/libs/shell';
import * as zosdataset from '../../../bin/libs/zos-dataset';
import * as zosfs from '../../../bin/libs/zos-fs';
import * as zos from '../../../bin/libs/zos'; !!!
*/

import * as log from '../../log';

export function test_!!!() {

    const TESTS = {
        t1: { parms: 'Hello', expected: 0 },
        t1: { parms: 'World!', expected: 1 }
    }
    let infos = [];
    let errors = [];

    for (let test in TESTS) {
        const parms = TESTS[test].parms;
        const expected = TESTS[test].expected;
        const result = ???.!!!(parms);
        log.infoAndErr(infos, errors, 'bin/libs/???', '!!!', parms, result, expected);
    };

    return { infos, errors }
}
