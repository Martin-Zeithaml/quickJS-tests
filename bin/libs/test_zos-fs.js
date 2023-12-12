import * as shell from '../../../bin/libs/shell';
import * as zosfs from '../../../bin/libs/zos-fs';
import * as tester from '../../tester';

const FILE = 'bin/libs/zos-fs';

function prepareFiles() {
    const result = shell.execOutSync('sh', '-c', './files/getFileEncoding');
    if (result.rc == 0)
        return 0;
    else
        return result.out;
}

export function test_getFileEncoding() {
    const TESTS = { 
        t1: { parms: './files/iso.txt', expected: 819 },
        t2: { parms: './files/ibm.txt', expected: 1047 },
        t3: { parms: './files/iso_link.txt', expected: 819 },
        t4: { parms: './files/untagged.txt', expected: 0 },
        t5: {
            parms: {
                parmsArray: [
                    './files/directory',
                    '/dev/null',
                    '/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin/bin',
                    undefined,
                    null,
                    '/',
                    "\x00",
                    "\x00" + "HELLO",
                    "\"//'SYS1.MACLIB(CVT)\"",
                    "a".repeat(1023)
                ],
                expected: undefined
            }
        }
    };
    let rc = prepareFiles();
    if (rc != 0) {
        console.log('test_zos-fs: getFileEncoding.prepareFiles failed!');
        console.log(rc.out);
        return;
    }
    return tester.process(TESTS, FILE, zosfs.getFileEncoding);
}
