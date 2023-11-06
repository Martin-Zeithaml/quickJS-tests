import * as shell from '../../../bin/libs/shell';
import * as log from '../../log';

function addDays(theDate, days, format) {
    const newDate = new Date(theDate.getTime() + days*24*60*60*1000);
    const YYYY = newDate.getFullYear().toString();
    const YY = YYYY.toString().substring(2, 4);
    var MM = (newDate.getMonth() + 1).toString();
    if (MM.length == 1 )
        MM = '0' + MM;
    var DD = newDate.getDate().toString();
    if (DD.length == 1)
        DD = '0' + DD;
    if (format.indexOf('YYYY') == -1)
        format = format.replace('YY', YY);
    else
        format = format.replace('YYYY', YYYY);
    format = format.replace('MM', MM);
    format = format.replace('DD', DD);
    return format;
}

export function test_dateAdd(print){
    const dateAddRexx = "../bin/utils/date-add.rex";
    const TESTS = {
        t1: {
            expected: 0,
            parms : [
                [ 1, 'YYMMDD' ], [ -1, 'YYYY-MM-DD' ], [ 100, 'YYMMDD' ], [ 1000, 'DD.MM.YYYY' ], [ 720, 'MM!DD!YY']
            ]
        },
        t2: {
            expected: "ERROR: expected numeric value for days: ''",
            parms: ''
        },
        t3: {
            expected: "ERROR: invalid date format: '2' is too short", 
            parms: '1 2'
        },
        t4: {
            expected: "ERROR: expected numeric value for days: 'A'",
            parms: 'A YY/MM/DD'
        },
        t5: {
            expected: "ERROR: invalid date format: 'YYMM' is too short",
            parms: '1000 YYMM'
        },
        t6: {
            expected: "ERROR: invalid date format: 'MMDDMM' is missing YY or YYYY (year)",
            parms: '-10 MMDDMM'
        },
        t7: {
            expected: "ERROR: expected numeric value for days: 'HELLO,'",
            parms: 'Hello, world' 
        },
        t8: {
            expected: "ERROR: invalid date format: 'YY--M--D' is missing MM (month)",
            parms: '25 YY--M--D'
        }
    } 
    
    let infos = [];
    let errors = [];
    let formattedResults;
    for (let test in TESTS){
        let parms;
        let expected;
        if (TESTS[test].expected === 0){
            for (let i = 0; i < TESTS[test].parms.length; i++){
                expected = addDays(new Date(), TESTS[test].parms[i][0], TESTS[test].parms[i][1]);
                parms = `${TESTS[test].parms[i][0]} ${TESTS[test].parms[i][1]}`;
                const result = shell.execOutSync('sh', '-c', `${dateAddRexx} ${parms}`);
                formattedResults = log.infoAndErr(print, 'bin/utils/date-add.rex', 'date-add', parms, result.out, expected)
                if (formattedResults.info != null)
                    infos.push(formattedResults.info);
                if (formattedResults.error != null)
                    errors.push(formattedResults.error);
            }
        } else {
            parms = TESTS[test].parms;
            expected = TESTS[test].expected;
            const result = shell.execOutSync('sh', '-c', `${dateAddRexx} ${parms}`);
            formattedResults = log.infoAndErr(print, 'bin/utils/date-add.rex', 'date-add', parms, result.out, expected)
            if (formattedResults.info != null)
                infos.push(formattedResults.info);
            if (formattedResults.error != null)
                errors.push(formattedResults.error);
        }
    }
    return { infos, errors }
}
