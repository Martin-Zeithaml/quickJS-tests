import * as tfs from './bin/libs/test_fs';
import * as tshell from './bin/libs/test_shell';
import * as tzos from './bin/libs/test_zos';
import * as tzosdataset from './bin/libs/test_zos-dataset';
import * as tzosfs from './bin/libs/test_zos-fs';
import * as tutils from './bin/utils/test_date-add';

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
TEST_ALL = TEST_ZOSFS.concat(TEST_FS, TEST_SHELL, TEST_ZOS, TEST_ZOSFS, TEST_ZOSDATASET, TEST_UTILS);

let result = 0

TEST_ALL.forEach(testFunction =>{
    result += testFunction(PRINT);
})

console.log("\n" + '='.repeat(32));
console.log(`Errors: ${result}\n`);
