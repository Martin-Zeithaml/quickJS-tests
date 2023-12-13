import * as zos from '../../../bin/libs/zos';
import * as tester from '../../tester';

const FILE = 'bin/libs/zos'

export function test_tsoCommand() {
    const TESTS = {
        testset: {
            t1: {
                parms: "LISTDS '1'",
                expected: { out: "LISTDS '1'\nIKJ56709I INVALID DATA SET NAME, '1'" }
            },
            t2: {
                parms: "HELP",
                expected: { rc: 0 }
            },
            t3: {
                parms: "",
                expected: { rc: 255 }
            }
        }
    }    
    return tester.process(TESTS, FILE, zos.tsoCommand)
}
