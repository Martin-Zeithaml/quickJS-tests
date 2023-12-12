import * as fs from '../../../bin/libs/fs';
import * as tester from '../../tester';

export function test_resolvePath() {
    const TESTS = {
        //t1: { parms: null, expected: '' },
        //t2: { parms: undefined, expected: '' },
        t3: { parms: ['/u', '/userid/', '/zowe/'], expected: '/u/userid/zowe' },
        t4: { parms: '', expected: '/' },
        t5: { parms: ' ', expected: '/ ' },
        t6: { parms: 'C:\\', expected: '/C:\\' },
        t7: { parms: 'bin', expected: '/bin' },
        t800: { parms: ['/bin/ ', '/libs/'] , expected: '/bin/libs' }, //?
        t9: { parms: [' bin ', ' libs '], expected: '/bin/libs' }, //?
    }  
    return tester.process(TESTS, 'bin/libs/fs: resolvePath', fs.resolvePath);
}

export function test_convertToAbsolutePath() {
    const TESTS = { 
        t1: { parms: null, expected: undefined },
        t2: { parms: undefined, expected: undefined },
        t3: { parms: '', expected: undefined},
        t4: { parms: ' ', expected: undefined},
        t5: { parms: '/', expected: '/' },
    }
    return tester.process(TESTS, 'bin/libs/fs: convertToAbsolutePath', fs.convertToAbsolutePath);     
}
