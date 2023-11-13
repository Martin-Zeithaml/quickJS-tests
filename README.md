# quickJS-tests
Set of simple tests for zowe quickJS and libs

## Requirements
* To be in placed `zowe.runtimeDirectory`

## Tests
* Start `run` & enjoy
  * No parameter - run all tests
  * Multiple parameter as library name to test specified library, e.g. `run zoslib shell`
    * Minus sign to exclude. eg. `run -shell -string` = run all tests, but exclude `shell` and `string`

## To do list
* Fix the problem with encoding
* Add more and more and more tests
