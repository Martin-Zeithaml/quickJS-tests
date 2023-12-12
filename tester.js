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

export function process(tests, file, functionName) {
    let infos = [];
    let errors = [];

    if (typeof functionName === 'function') {
        for (let t in tests) {
            if (tests[t].parms?.parmsArray) {
                let expected = tests[t].parms.expected;
                for (let i = 0; i < tests[t].parms.parmsArray.length; i++ ) {
                    const parms = tests[t].parms.parmsArray[i];
                    const result = functionName(parms);
                    pushResults(infos, errors, file, functionName.name, parms, result, expected);
                }
            } else {
                const parms = tests[t].parms;
                let expected = tests[t].expected;
                let result;
                if (Array.isArray(parms)) {
                    result = functionName(...parms);
                }
                else {
                    if (tests[t].expected?.shell)
                        result = functionName('sh', '-c', parms);
                    else
                        result = functionName(parms);
                }
                if (tests[t].expected?.shell) {
                    result = 'executed'
                    expected = 'executed'
                }
                if (tests[t].expected?.rc !== undefined) {
                    expected = tests[t].expected.rc
                    result = result.rc
                }
                if (tests[t].expected?.out !== undefined) {
                    expected = tests[t].expected.out
                    result = result.out
                }
                pushResults(infos, errors, file, functionName.name, parms, result, expected)
            }
        }
    } else {
        infos.push(msgUndefined(file));
        errors.push(msgUndefined(file));
    }

    return { infos, errors }
}
