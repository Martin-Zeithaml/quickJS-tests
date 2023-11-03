import * as tfs from './bin/libs/test_fs';
import * as tshell from './bin/libs/test_shell';
import * as tzos from './bin/libs/test_zos';
import * as tzosdataset from './bin/libs/test_zos-dataset';
import * as tzosfs from './bin/libs/test_zos-fs';
import * as tutils from './bin/utils/test_date-add';
import * as log from './log'

const PRINT = true;

const TEST_FS = [
    tfs.test_resolvePath, 
    tfs.test_convertToAbsolutePath
];

const TEST_SHELL = [ tshell.test_execAnySync ];

const TEST_ZOS = [ tzos.test_tsoCommand ];

const TEST_ZOSDATASET = [
    tzosdataset.test_validDataSetName,
    tzosdataset.test_validDataSetMemberName,
    tzosdataset.test_isDatasetExists,
    tzosdataset.test_tsoIsDatasetExists
];

const TEST_ZOSFS = [ tzosfs.test_getFileEncoding ];

const TEST_UTILS = [ tutils.test_dateAdd ];

let TEST_ALL = [];
TEST_ALL = TEST_ALL.concat(TEST_FS, TEST_SHELL, TEST_ZOS, TEST_ZOSFS, TEST_ZOSDATASET, TEST_UTILS);

let rc = 0

TEST_ALL.forEach(testFunction => {
    if (typeof testFunction === 'function') {
        rc += testFunction(PRINT);
        log.box(`${testFunction.name} RC=${rc}`);
    } else {
        log.box(`${testFunction.name} is not a function. Skipping the test...`);
    }
})

console.log();
log.box(`<<< Total number of error: ${rc} >>>`);
