import * as std from 'cm_std';

import * as tfs from './bin/libs/test_fs';
import * as tshell from './bin/libs/test_shell';
import * as tstring from './bin/libs/test_string';
import * as tzoslib from './bin/libs/test_zos';
import * as tzosdataset from './bin/libs/test_zos-dataset';
import * as tzosfs from './bin/libs/test_zos-fs';
import * as tutils from './bin/utils/test_date-add';
import * as log from './log'

const TEST = {
    fs: [ 
        tfs.test_resolvePath, 
        tfs.test_convertToAbsolutePath
    ],
    shell: [ 
        tshell.test_execAnySync
    ],
    string: [ 
        tstring.test_escapeDollar,
        tstring.test_escapeRegExp
    ],
    zoslib: [ 
        tzoslib.test_tsoCommand
    ],
    zosdataset: [
        tzosdataset.test_validDataSetName,
        tzosdataset.test_validDataSetMemberName,
        tzosdataset.test_isDatasetExists,
        tzosdataset.test_tsoIsDatasetExists
    ],
    zosfs: [
        tzosfs.test_getFileEncoding
    ],
    utils: [
        tutils.test_dateAdd
    ]
}

let infos = [];
let errors = [];
let result;

const allTests = std.getenv('QUICK_JS_TESTS_ARGS') == undefined ? true : false;

for (let lib in TEST) {
    const libInArg = std.getenv(`QUICK_JS_TESTS_${lib.toUpperCase()}`) == undefined ? false : true;
    if (allTests || libInArg) {
        for (let testFunction in TEST[lib]) {
            result = TEST[lib][testFunction]();
            infos = infos.concat(result.infos);
            errors = errors.concat(result.errors);
        }
    }
}

console.log(log.CYAN + `*** INFOS(${infos.length}) ***`);
for (let info in infos) {
    console.log(infos[info]);
}

console.log();

if (errors.length > 0) {
    console.log(log.RED + `*** ERRORS(${errors.length}) ***`);
    for (let err in errors){
        console.log(errors[err]);
    }
}

console.log(log.RESET);
