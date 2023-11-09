import * as stringlib from '../../../bin/libs/string';
import * as log from '../../log';

export function test_escapeDollar() {

    const TESTS = {
        t1: { parms: null, expected: undefined },
        t2: { parms: undefined, expected: undefined },
        t3: { parms: '', expected: ''},
        t4: { parms: ' ', expected: ' '},
        t5: { parms: 'ABC', expected: 'ABC'},
        t6: { parms: '$DOLLAR', expected: '\\$DOLLAR'},
        t7: { parms: '!@#$%^&*()', expected: '!@#\\$%^&*()'},
        t800: { parms: '$$$', expected: '\\$\\$\\$'}
    }
    let infos = [];
    let errors = [];

    for (let test in TESTS) {
        const parms = TESTS[test].parms;
        const expected = TESTS[test].expected;
        const result = stringlib.escapeRegExp(parms);
        log.infoAndErr(infos, errors, 'bin/libs/string', 'escapeDollar', parms, result, expected);
    };

    return { infos, errors }
}

export function test_escapeRegExp() {

    const TESTS = {
        t1: { parms: null, expected: undefined },
        t2: { parms: undefined, expected: undefined },
        t3: { parms: '', expected: ''},
        t4: { parms: ' ', expected: ' '},
        t5: { parms: '$', expected: '\\$'},
        t6: { parms: '^$', expected: '\\^\\$'},
        t7: { parms: '[$]', expected: '\\[\\$\\]'},
        t800: { parms: '..::|[Hello]|::..', expected: '\\.\\.::\\|\\[Hello\\]\\|::\\.\\.'}
    }
    let infos = [];
    let errors = [];

    for (let test in TESTS) {
        const parms = TESTS[test].parms;
        const expected = TESTS[test].expected;
        const result = stringlib.escapeRegExp(parms);
        log.infoAndErr(infos, errors, 'bin/libs/string', 'escapeRegExp', parms, result, expected);
    };

    return { infos, errors }
}