import * as shell from '../bin/libs/shell';

export const RED = "\u001b[31m";
export const GREEN = "\u001b[32m";
export const PURPLE = "\u001b[35m";
export const CYAN = "\u001b[36m";
export const RESET = "\u001b[0m";

export function overview(msgArray, header, color) {
    if (msgArray.length > 0) {
        console.log();
        console.log(color + header);
        console.log('-'.repeat(header.length));
        for (let msg in msgArray) {
            console.log(msgArray[msg]);
        }
        console.log(RESET);
    }
}

export function msg(file, functionName, parms, result, expected) {
    return `${file}: ${functionName}(${parms})="${result}" [expected="${expected}"]`;
}

export function msgUndefined(file) {
    return `${file}: some function is not defined.`
}

function pushResults(infos, errors, file, functionName, parms, result, expected) {
    infos.push(msg(file, functionName, parms, result, expected));
    if (result != expected) {
        errors.push(msg(file, functionName, parms, result, expected));
    }
}

function getFunctionName(name) {
    if (typeof name === 'function')
        return name.name;
    if (typeof name === 'string')
        return name;
    return 'Unknown';
}

export function process(tests, file, functionName) {
    let infos = [];
    let errors = [];
    const functionType = typeof functionName;
    if (functionType === 'function' || functionType === 'string') {
        for (let t in tests['testset']) {
            if (tests['testset'][t].parms?.parmsArray) {
                let expected = tests['testset'][t].parms.expected;
                for (let i = 0; i < tests['testset'][t].parms.parmsArray.length; i++ ) {
                    const parms = tests['testset'][t].parms.parmsArray[i];
                    const result = functionName(parms);
                    pushResults(infos, errors, file, getFunctionName(functionName), parms, result, expected);
                }
            } else {
                const parms = tests['testset'][t].parms;
                let expected = tests['testset'][t].expected;
                let result;
                if (functionType === 'function') {
                    if (Array.isArray(parms)) {
                        result = functionName(...parms);
                    }
                    else {
                        if (tests['setting']?.shell)
                            result = functionName('sh', '-c', parms);
                        else
                            result = functionName(parms);
                    }
                } else {
                    result = shell.execOutSync('sh', '-c', `${functionName} ${parms}`)
                }
                if (tests['setting']?.shell) {
                    result = 'executed'
                    expected = 'executed'
                }
                if (tests['testset'][t].expected?.rc !== undefined || tests['testset'][t].expected?.out !== undefined) {
                    if (tests['testset'][t].expected?.rc !== undefined) {
                        expected = tests['testset'][t].expected.rc
                        result = result.rc
                        pushResults(infos, errors, file, getFunctionName(functionName), parms, result, expected)
                    }
                    if (tests['testset'][t].expected?.out !== undefined) {
                        expected = tests['testset'][t].expected.out
                        result = result.out
                        pushResults(infos, errors, file, getFunctionName(functionName), parms, result, expected)
                    }
                } else {
                    pushResults(infos, errors, file, getFunctionName(functionName), parms, result, expected)
                }
            }
        }
    } 
    if (typeof functionName === 'undefined') {
        infos.push(msgUndefined(file));
        errors.push(msgUndefined(file));
    }

    return { infos, errors }
}
