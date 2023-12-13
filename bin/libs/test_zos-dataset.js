import * as zosdataset from '../../../bin/libs/zos-dataset';
import * as tester from '../../tester';

const FILE = 'bin/libs/zos-dataset';

export function test_validDataSetMemberName() {
    const TESTS = {
        testset: {
            t1: {
                parms: {
                    parmsArray: [ 'MEMBER', 'VALID', '$$$$', '#@$', '$', '@', '#', '########' ],
                    expected: true
                }
            },
            t2: {
                parms: {
                    parmsArray: [ null, undefined, '', '   ', 'INVALIDNAME', '1AAAAA', 'A+B', '1234' ],
                    expected: false
                }
            }
        }
    }
    return tester.process(TESTS, FILE, zosdataset.validDatasetMemberName);
}

export function test_validDataSetName() {
    const TESTS = {
        testset: {
            t1: {
                parms: {
                    parmsArray: [ 
                        'SYS1.MACLIB',
                        'ZOWE.V2R10P1',
                        'USERID.ZOWE',
                        'ZOWE-2.#10.#0.JCLLIB',
                        '#-',
                        '#-@.ABC-D.$$$$',
                        'A',
                        'A2345678.A2345678.A2345678.A2345678.A2345678'
                    ],
                    expected: true
                }
            },
            t2: {
                parms: {
                    parmsArray : [
                        null, undefined,
                        '',
                        '   ',
                        '1ZOWE.2ZOWE',
                        'A23456789.WRONG',
                        '-ZOWE.-ZOWE',
                        'A2345678.A2345678.A2345678.A2345678.A2345678.TOOLONG'
                    ],
                    expected: false,
                }
            }
        }
    }
    return tester.process(TESTS, FILE, zosdataset.validDatasetName);
}

export function test_isDatasetExists() {
    const TESTS = {
        testset: {
            t1: {
                parms: {
                    parmsArray: [ 'SYS1.MACLIB', 'SYS1.PARMLIB' ],
                    expected: true
                }
            },
            t2: {
                parms: {
                    parmsArray: [ '', '  ', null, undefined, 'C:\Program Files', "/u/users/" ],
                    expected: false
                }
            }
        }
    }
    return tester.process(TESTS, FILE, zosdataset.isDatasetExists);
}

export function test_tsoIsDatasetExists() {
    const TESTS = {
        testset: {
            t1: { parms: 'SYS1.MACLIB', expected: 0},
            t2: { parms: 'SYS1000.ASDF.QWER.P9999999', expected: 1 },
            t3: { parms: 'AAAAAAAAA', expected: 9 },
            t4: { parms: 'A B', expected: 9 }
        }
    }
    return tester.process(TESTS, FILE, zosdataset.tsoIsDatasetExists);
}
