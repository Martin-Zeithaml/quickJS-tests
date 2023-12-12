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
    return `${file} function not defined.`
}

export function process(tests, file, functionName) {
    let infos = [];
    let errors = [];
    if (typeof functionName === 'function') {
        for (let t in tests) {
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
            infos.push(msg(file, functionName.name, parms, result, expected));
            if (result != expected) {
                errors.push(msg(file, functionName.name, parms, result, expected));
            }
        }
    } else {
        infos.push(msgUndefined(file));
        errors.push(msgUndefined(file));
    }
    return { infos, errors }
}
