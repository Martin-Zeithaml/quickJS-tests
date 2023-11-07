export const RED = "\u001b[31m";
export const GREEN = "\u001b[32m";
export const PURPLE = "\u001b[35m";
export const CYAN = "\u001b[36m";
export const RESET = "\u001b[0m";

export function msg(fileName, functionName, parms, result, expected) {
    return `${fileName}: ${functionName}(${parms})="${result}" [expected="${expected}"]`;
}   

export function infoAndErr(infos, errors, fileName, functionName, parms, result, expected) {
    infos.push(msg(fileName, functionName, parms, result, expected));
    if (result != expected) {
        errors.push(msg(fileName, functionName, parms, result, expected));
    }
}
