import * as zosdataset from '../../../bin/libs/zos-dataset';
import * as log from '../../log';

export function test_validDataSetMemberName() {
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
    let infos = [];
    let errors = [];
    
    for (let test in TESTS) {
        for (let i = 0; i < TESTS[test].members.length; i++){
            const parms = TESTS[test].members[i];
            const expected = TESTS[test].expected;
            const result = zosdataset.validDatasetMemberName(parms);
            log.infoAndErr(infos, errors, 'bin/libs/zos-dataset', 'validDatasetMemberName', parms, result, expected);
        }
    }

    return { infos, errors };
}

export function test_validDataSetName() {
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
                'A',
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
    let infos = [];
    let errors = [];

    for (let test in TESTS){
        for (let i = 0; i < TESTS[test].ds.length; i++){
            const parms = TESTS[test].ds[i];
            const expected = TESTS[test].expected;
            const result = zosdataset.validDatasetName(TESTS[test].ds[i]);
            log.infoAndErr(infos, errors, 'bin/libs/zos-dataset', 'validDatasetName', parms, result, expected);
        }
    }

    return { infos, errors }
}

export function test_isDatasetExists() {
    const TESTS = {
        t1: {
            expected: true,
            ds: [ 'SYS1.MACLIB', 'SYS1.PARMLIB' ]
        },
        t2: {
            expected: false,
            ds: [ '', '  ', null, undefined, 'C:\Program Files', "/u/users/" ]
        }
    }
    let infos = [];
    let errors = [];

    for (let test in TESTS){
        for (let i = 0; i < TESTS[test].ds; i ++){
            const parms = TESTS[test].ds[i];
            const expected = TESTS[test].expected;
            const result = zosdataset.isDatasetExists(parms);
            log.infoAndErr(infos, errors, 'bin/libs/zos-dataset','isDatasetExists', parms, result, expected);
        }   
    }

    return { infos, errors }
}

export function test_tsoIsDatasetExists() {
    const TESTS = {
        t1: { expected: 0, ds: 'SYS1.MACLIB'},
        t2: { expected: 1, ds: 'SYS1000.ASDF.QWER.P9999999' },
        t3: { expected: 9, ds: 'AAAAAAAAA' },
        t4: { expected: 9, ds: 'A B' }
    }
    let infos = [];
    let errors = [];

    for (let test in TESTS){
        const parms = TESTS[test].ds;
        const expected = TESTS[test].expected;
        const result = zosdataset.tsoIsDatasetExists(parms);
        log.infoAndErr(infos, errors, 'bin/libs/zos-dataset', 'tsoIsDatasetExists', parms, result, expected);
    }

    return { infos, errors }
}
