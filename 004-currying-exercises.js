var _ = require('ramda')

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

var words = function (str) {
  return _.split(' ', str)
}

// Exercise 1 Result

var wordsResult = _.split(' ')

// test
console.log(getWords()('hola mundo'))
console.log(getWords()('hola_mundo'))

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = undefined

// Exercise 1a Result

var sentencesResult = _.map(wordsResult)

// test
console.log(sentencesResult(['hola mundo', 'hola_mundo']))
console.log(sentencesResult(['hola que tal', 'bastante bien gracias']))

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

var filterQs = function (xs) {
  return _.filter(function (x) {
    return match(/q/i, x)
  }, xs)
}

// Exercise 2 Result

var filterQsResult = _.filter(match(/q/i))

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function (x, y) {
  return x >= y ? x : y
}

// REFACTOR THIS ONE:
var max = function (xs) {
  return _.reduce(function (acc, x) {
    return _keepHighest(acc, x)
  }, -Infinity, xs)
}

var masRefactor = _.reduce(_keepHighest, -Infinity)

// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = undefined

var sliceResult = _.curry(function (start, end, xs) {
  return xs.slice(start, end)
})

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
var take = undefined

var takeResult = slice(0)