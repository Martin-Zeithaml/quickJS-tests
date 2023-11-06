import * as shell from '../../../bin/libs/shell';
import * as zosfs from '../../../bin/libs/zos-fs';
import * as log from '../../log';

function prepareFiles() {
    const result = shell.execOutSync('sh', '-c', './getFileEncoding');
    if (result.rc == 0)
        return 0;
    else
        return result.out;
}

export function test_getFileEncoding(print) {
    const TESTS = { 
        t1: { expected: 819, file: './files/iso.txt' },
        t2: { expected: 1047, file: './files/ibm.txt' },
        t3: { expected: 819, file: './files/iso_link.txt' },
        t4: { expected: 0, file: './files/untagged.txt' },
        t5: { expected: undefined, file: './files/directory' },
        t6: { expected: undefined, file : '/dev/null' },
        t7: { expected: undefined, file: '/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin' },
        t800: { expected: undefined, file: undefined },
        t9: { expected: undefined, file: null },
        t10: { expected: undefined, file: '/' },
        t11: { expected: undefined, file: "\x00" },
        t12: { expected: undefined, file: "\x00" + "HELLO" },
        t13: { expected: undefined, file: "\"//'SYS1.MACLIB(CVT)\"" },
        t14: { expected: undefined, file: "a".repeat(1023) }
    };

    let infos = [];
    let errors = [];
    let formattedResults;

    let rc = prepareFiles();
    if (rc != 0) {
        formattedResults = log.infoAndErr(print, 'bin/libs/zosfs', 'getFileEncoding.prepareFiles', '', rc, 0); 
        if (formattedResults.info != null)
            infos.push(formattedResults.info);
        if (formattedResults.error != null)
            errors.push(formattedResults.error);
        return { infos, errors };
    }

    for (let test in TESTS){
        const parms = TESTS[test].file;
        const expected = TESTS[test].expected;
        const result = zosfs.getFileEncoding(parms);
        formattedResults = log.infoAndErr(print, 'bin/libs/zosfs', 'getFileEncoding', parms, result, expected); 
        if (formattedResults.info != null)
            infos.push(formattedResults.info);
        if (formattedResults.error != null)
            errors.push(formattedResults.error);
    }
    return { infos, errors };
}
