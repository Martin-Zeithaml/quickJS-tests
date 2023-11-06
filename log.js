export const RED = "\u001b[31m";
export const GREEN = "\u001b[32m";
export const PURPLE = "\u001b[35m";
export const CYAN = "\u001b[36m";
export const RESET = "\u001b[0m";

export function msg(fileName, functionName, input, result, expected) {
    return `${fileName}: ${functionName}(${input})="${result}" [expected="${expected}"]`;
}   

export function infoAndErr(infoMsg, fileName, functionName, input, result, expected) {
    let info = null;
    let error = null;
    if (infoMsg)
        info = msg(fileName, functionName, input, result, expected);
    if (result != expected) {
        error = msg(fileName, functionName, input, result, expected);
    }
    return { info, error };
}
