import * as zos from '../../../bin/libs/zos';

export function test_tsoCommand(print){
    const EXPECTED_TSOCMD = "LISTDS '1'\nIKJ56709I INVALID DATA SET NAME, '1'";
    
    const result = zos.tsoCommand("LISTDS '1'");
    
    if (print){
        console.log('bin/libs/zos: tsoCommand:');
        console.log('Expected:');
        console.log(EXPECTED_TSOCMD);
        console.log('And got:');
        console.log(result.out);
    }

    if (EXPECTED_TSOCMD != result.out){
        console.log('bin/libs/zos: tsoCommand:');
        console.log('Expected:');
        console.log(EXPECTED_TSOCMD);
        console.log('But got:');
        console.log(result.out);
        return 1;
    }
    return 0;
}
