import * as stringlib from '../../../bin/libs/string';
import * as tester from '../../tester';

const FILE = 'bin/libs/string';

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
    return tester.process(TESTS, FILE, stringlib.escapeDollar);
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
    return tester.process(TESTS, FILE, stringlib.escapeRegExp);
}

export function test_stripZweParms() {
    const TESTS = {
        t1: { parms: '', expected: ''},
        t2: { parms: 'zwe init -c zowe.yaml', expected: 'zwe init'},
        t3: { parms: 'some command --prefix ZOWE', expected: 'some command'},
        t4: { parms: '    some other-command --help      ', expected: 'some other-command'},
        t5: { parms: 'zwe-cli db2-connect --subsys T800', expected: 'zwe-cli db2-connect'},
        t6: { parms: '  Hello, world!  ', expected: 'Hello, world!'}
    }
    return tester.process(TESTS, FILE, stringlib.stripZweParms);
}
