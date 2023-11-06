import * as fs from '../../../bin/libs/fs';
import * as log from '../../log';

export function test_resolvePath(print) {
    const TESTS = {
        /* t1 + t2 -> TypeError: cannot read property 'startsWith' of null/undefined
        t1: { parms: null, expected: '' },
        t2: { parms: undefined, expected: '' },
        */
        t3: { parms: ['/u', '/userid/', '/zowe/'], expected: '/u/userid/zowe' },
        t4: { parms: '', expected: '/' },
        t5: { parms: ' ', expected: '/ ' },
        t6: { parms: 'C:\\', expected: '/C:\\' },
        t7: { parms: 'bin', expected: '/bin' },
        t8: { parms: ['/bin/ ', '/libs/'] , expected: '/bin/libs' }, //?
        t9: { parms: [' bin ', ' libs '], expected: '/bin/libs' }, //?
    }
    let infos = [];
    let errors = [];
    let formattedResults;
    for (let test in TESTS){   
        let result;     
        const parms = TESTS[test].parms;
        const expected = TESTS[test].expected;
        if (Array.isArray(TESTS[test].parms))
            result = fs.resolvePath(...parms);        
        else
            result = fs.resolvePath(parms);
        formattedResults = log.infoAndErr(print, 'bin/libs/fs', 'resolvePath', parms, result, expected);
        if (formattedResults.info != null)
            infos.push(formattedResults.info);
        if (formattedResults.error != null)
            errors.push(formattedResults.error);
    };
    return { infos, errors }
}

export function test_convertToAbsolutePath(print){
    const TESTS = [null, undefined, '', ' '];
    let infos = [];
    let errors = [];
    let formattedResults;
    for (let i = 0; i < TESTS.length; i++) {
        const parms = TESTS[i];
        const expected = undefined;
        const result = fs.convertToAbsolutePath(parms);
        formattedResults = log.infoAndErr(print, 'bin/libs/fs', 'convertToAbsolutePath', parms, result, expected); 
        if (formattedResults.info != null)
            infos.push(formattedResults.info);
        if (formattedResults.error != null)
            errors.push(formattedResults.error);
    };
    return { infos, errors }
}
