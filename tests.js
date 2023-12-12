import * as std from 'cm_std';

import * as tfs from './bin/libs/test_fs';
import * as tshell from './bin/libs/test_shell';
/*
import * as tstring from './bin/libs/test_string';
import * as tzoslib from './bin/libs/test_zos';
import * as tzosdataset from './bin/libs/test_zos-dataset';
import * as tzosfs from './bin/libs/test_zos-fs';
import * as tutilsDateAdd from './bin/utils/test_date-add';
import * as tutilsGetESM from './bin/utils/test_getesm';
*/
import * as tester from './tester'

const TEST = {
    fs: [ 
        tfs.test_resolvePath, 
        tfs.test_convertToAbsolutePath
    ],
    shell: [ 
        tshell.test_execOutSync,
        tshell.test_execErrSync,
        tshell.test_execOutErrSync
    ],
    string: [ 
        tstring.test_escapeDollar,
        tstring.test_escapeRegExp,
        tstring.test_stripZweParms
    ],
    /*
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
        tutilsDateAdd.test_dateAdd,
        tutilsGetESM.test_getesm
    ] */
}

let infos = [];
let errors = [];
let result;
let proceed = {};

for (let lib in TEST) {
    let libArg = std.getenv(`QUICK_JS_TESTS_${lib.toUpperCase()}`) == undefined ? false : true;
    if (std.getenv(`QUICK_JS_TESTS_TYPE`) == 'N')
        libArg = !libArg;
    proceed[`${lib}`] = libArg;
}

for (let lib in TEST) {
    if (proceed[lib]) {
        for (let testFunction in TEST[lib]) {
            result = TEST[lib][testFunction]();
            infos = infos.concat(result.infos);
            errors = errors.concat(result.errors);
        }
    }
}

tester.overview(infos, `   Infos(${infos.length})   `, tester.CYAN);
tester.overview(errors, `   Errors(${errors.length})   `, tester.RED);
