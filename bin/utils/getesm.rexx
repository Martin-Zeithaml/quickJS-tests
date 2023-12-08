/* REXX */
/* CVT = X'10'                                                        */
/* CVT + X'3E0' -> CVTRAC: RCVT | RTSS | ACF2                         */
/*--------------------------------------------------------------------*/
ESM = storage(d2x(c2d(storage('10', 4)) + x2d('3E0')), 4)
ESM_ID = storage(c2x(ESM), 4)

txtIn  = "RCVT RTSS ACF2"
txtOut = "RACF  TSS ACF2"

if wordpos(ESM_ID, txtIn) > 0 then
  ESM_ID = word(txtOut, wordpos(ESM_ID, txtIn))
else
  ESM_ID = "NONE"

say ESM_ID
exit
