import * as zos from '../../../bin/libs/zos';
import * as log from '../../log';

export function test_tsoCommand(print) {
    const parm = "LISTDS '1'"
    const expected = "LISTDS '1'\nIKJ56709I INVALID DATA SET NAME, '1'";
    
    const result = zos.tsoCommand(parm);

    let infos = [];
    let errors = [];
    const formattedResults = log.infoAndErr(print, 'bin/libs/zos', 'tsoCommand', parm, result.out, expected);

    if (formattedResults.info != null)
        infos.push(formattedResults.info);
    if (formattedResults.error != null)
        errors.push(formattedResults.error);

    return { infos, errors }
}
