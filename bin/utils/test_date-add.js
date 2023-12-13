import * as shell from '../../../bin/libs/shell';
import * as tester from '../../tester';

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

export function test_dateAdd() {
    const dateAddRexx = "../bin/utils/date-add.rex";
    const TESTS = {
        setting : { rexx: true },
        testset: {
            t1: {
                parms : '1 YYMMDD',
                expected: { out: addDays(new Date(), 1, 'YYMMDD') }
            },
            t2: {
                parms : '-1 YYYY-MM-DD',
                expected: { out: addDays(new Date(), -1, 'YYYY-MM-DD') }
            },
            t3: {
                parms : '100 YYMMDD',
                expected: { out: addDays(new Date(), 100, 'YYMMDD') }
            },
            t4: {
                parms : '1000 DD.MM.YYYY',
                expected: { out: addDays(new Date(), 1000, 'DD.MM.YYYY') }
            },
            t5: {
                parms : '720 MM!DD!YY',
                expected: { out: addDays(new Date(), 1, 'MM!DD!YY') }
            },
            t6: { 
                parms: '', 
                expected: { out: "ERROR: expected numeric value for days: ''" },
            },
            t7: { 
                parms: '1 2',
                expected: { out: "ERROR: invalid date format: '2' is too short", },
            },
            t800: {
                parms: 'A YY/MM/DD',
                expected: { out: "ERROR: expected numeric value for days: 'A'" },
            },
            t9: {
                parms: '1000 YYMM',
                expected: { out: "ERROR: invalid date format: 'YYMM' is too short" },
            },
            t10: {
                parms: '-10 MMDDMM',
                expected: { out: "ERROR: invalid date format: 'MMDDMM' is missing YY or YYYY (year)" },
            },
            t11: {
                parms: 'Hello, world',
                expected: { out: "ERROR: expected numeric value for days: 'HELLO,'" },
            },
            t12: {
                parms: '25 YY--M--D',
                expected: { out: "ERROR: invalid date format: 'YY--M--D' is missing MM (month)" },
            }
        }
    }  
    return tester.process(TESTS, 'bin/libs/utils', dateAddRexx)
}
