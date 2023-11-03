import * as zosdataset from '../../../bin/libs/zos-dataset';
import * as log from '../../log';

export function test_validDataSetMemberName(print){
    const TESTS = {
        t1: { 
            expected: true,
            members: [ 'MEMBER', 'VALID', '$$$$', '#@$', '$', '@', '#', '########' ] 
        },
        t2: {
            expected: false, 
            members : [ null, undefined, '', '   ', 'INVALIDNAME', '1AAAAA', 'A+B', '1234' ]
        }
    }

    let rc = 0;
    for (let test in TESTS) {
        for (let i = 0; i < TESTS[test].members.length; i++){
            const parms = TESTS[test].members[i];
            const expected = TESTS[test].expected;
            const result = zosdataset.validDatasetMemberName(parms);
            rc += log.infoAndErr(print, 'bin/libs/zos-dataset', 'validDatasetMemberName', parms, result, expected);
        }
    }
    return rc;
}

export function test_validDataSetName(print){
    const TESTS = {
        t1: { 
            expected: true,
            ds : [ 
                'SYS1.MACLIB',
                'ZOWE.V2R10P1',
                'USERID.ZOWE',
                'ZOWE-2.#10.#0.JCLLIB',
                '#-',
                '#-@.ABC-D.$$$$',
                'A2345678.A2345678.A2345678.A2345678.A2345678'
            ]
        },
        t2: {
            expected: false,
            ds : [ 
                null,
                undefined,
                '',
                '   ',
                '1ZOWE.2ZOWE',
                'A23456789.WRONG',
                '-ZOWE.-ZOWE',
                'A2345678.A2345678.A2345678.A2345678.A2345678.TOOLONG'
            ]
        }
    }

    let rc = 0;
    for (let test in TESTS){
        for (let i = 0; i < TESTS[test].ds.length; i++){
            const parms = TESTS[test].ds[i];
            const expected = TESTS[test].expected;
            const result = zosdataset.validDatasetName(TESTS[test].ds[i]);
            rc += log.infoAndErr(print, 'bin/libs/zos-dataset', 'validDatasetName', parms, result, expected);
        }
    }
    return rc;
}

export function test_isDatasetExists(print){
    const TESTS = {
        t1: {
            expected: true,
            ds: [ 'SYS1.MACLIB' ]
        },
        t2: {
            expected: false,
            ds: [ '', '  ', null, undefined, 'C:\Program Files', "/u/users/" ]
        }
    }

    let rc = 0;
    for (let test in TESTS){
        for (let i = 0; i < TESTS[test].ds; i ++){
            const parms = TESTS[test].ds[i];
            const expected = TESTS[test].expected;
            const result = zosdataset.isDatasetExists(parms);
            rc += log.infoAndErr(print, 'bin/libs/zos-dataset','isDatasetExists', parms, result, expected);
        }   
    }
    return rc;
}

export function test_tsoIsDatasetExists(print){
    const TESTS = {
        t1: { expected: 0, ds: 'SYS1.MACLIB'},
        t2: { expected: 1, ds: 'SYS1000.ASDF.QWER.P9999999' },
        t3: { expected: 9, ds: 'AAAAAAAAA' },
        t4: { expected: 9, ds: 'A B' }
    }

    let rc = 0; 
    for (let test in TESTS){
        const parms = TESTS[test].ds;
        const expected = TESTS[test].expected;
        const result = zosdataset.tsoIsDatasetExists(parms);
        rc += log.infoAndErr(print, 'bin/libs/zos-dataset', 'isTsoDatasetExists', parms, result, expected);
    }
    return rc;
}
