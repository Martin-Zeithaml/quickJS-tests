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

for (let lib in TEST) {
    for (let testFunction in TEST[lib]){
        if (typeof TEST[lib][testFunction] === 'function') {
            result = TEST[lib][testFunction]();
            infos = infos.concat(result.infos);
            errors = errors.concat(result.errors);
        } else {
            console.log(`${testFunction.name} is not a function. Skipping the test...`);
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
