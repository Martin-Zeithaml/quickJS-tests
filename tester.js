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

export function msg(id, parms, result, expected) {
    if (parms && results && expected)
        return `${id}(${parms})="${result}" [expected="${expected}"]`;
    else
    return `${id} not defined.`;
}

export function process(tests, id, functionName) {
    let infos = [];
    let errors = [];
    if (functionName) {
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
            infos.push(msg(id, parms, result, expected));
            if (result != expected) {
                errors.push(msg(id, parms, result, expected));
            }
        }
    } else {
        infos.push(msg(id, parms, result, expected));
        errors.push(msg(id, parms, result, expected));
    }
    return { infos, errors }
}
