export const RED = "\u001b[31m";
export const GREEN = "\u001b[32m";
export const PURPLE = "\u001b[35m";
export const CYAN = "\u001b[36m";
export const RESET = "\u001b[0m";

function msg(fileName, functionName, input, result, expected) {
    return `${fileName}: ${functionName}(${input})="${result}" [expected="${expected}"]`;
}   

function info(fileName, functionName, input, result, expected) {
    console.log(CYAN + msg(fileName, functionName, input, result, expected) + RESET);
}

function error(fileName, functionName, input, result, expected) {
    console.log(RED + msg(fileName, functionName, input, result, expected) + RESET);
}

export function infoAndErr(infoMsg, fileName, functionName, input, result, expected) {
    if (infoMsg)
        info(fileName, functionName, input, result, expected);
    if (result != expected) {
        error(fileName, functionName, input, result, expected);
        return 1;
    }
    return 0;
}

export function box(msg) {
    const msgLength = msg.length;
    console.log(PURPLE + '-'.repeat(msgLength + 4));
    console.log(`| ${msg} |`);
    console.log('-'.repeat(msgLength + 4) + RESET);
}
