var compose = function (f, g) {
  return function (x) {
    return f(g(x))
  }
}

// f y g son funciones
// x es el valor que se pasa a través de ellas

/* ############################################################################
############################################################################# */

var toUpperCase = function (x) {
  return x.toUpperCase()
}

var exclaim = function (x) {
  return x + '!'
}

var shout = compose(exclaim, toUpperCase)

shout('send in the clowns')
//=> "SEND IN THE CLOWNS!"

// la composicion de dos funciones devuelve una nueva funcion. La composición
// de dos unidades del mismo tipo devuelve una undidad del mismo tipo.

// con compose la funcionalidad va de derecha a izquierda, sin él, la
// funcionalidad va de dentro a afuera y es mas dificil de leer

var shoutDentroFuera = function (x) {
  return exclaim(toUpperCase(x))
}

/* ############################################################################
############################################################################# */

var head = function (x) {
  return x[0]
}

var reverse = reduce(function (acc, x) {
  return [x].concat(acc)
}, [])

var last = compose(head, reverse)

last(['jumpkick', 'roundhouse', 'uppercut'])
//=> 'uppercut'

/* ############################################################################
############################################################################# */

// associativity

var associative = compose(f, compose(g, h)) == compose(compose(f, g), h)
// true

// (a + b) + c = a + (b + c)

compose(toUpperCase, compose(head, reverse))

// or
compose(compose(toUpperCase, head), reverse)

/* ############################################################################
############################################################################# */

// con la regla asociativa podemos volver a escribir el ejemplo de otra forma

// notese que el compose que se usa aqui no es el definido al principio de este
// documento, sería el disponible en ramda, lodash o underscore

// previously we'd have to write two composes, but since it's associative, we
// can give compose as many fn's as we like and let it decide how to group them.
var lastUpper = compose(toUpperCase, head, reverse)

lastUpper(['jumpkick', 'roundhouse', 'uppercut'])
//=> 'UPPERCUT'

var loudLastUpper = compose(exclaim, toUpperCase, head, reverse)

loudLastUpper(['jumpkick', 'roundhouse', 'uppercut'])
//=> 'UPPERCUT!'

/* ############################################################################
############################################################################# */

// ejemplos de composición

var loudLastUpper2 = compose(exclaim, toUpperCase, head, reverse)

// or
var last2 = compose(head, reverse)
var loudLastUpper3 = compose(exclaim, toUpperCase, last)

// or
var last3 = compose(head, reverse)
var angry = compose(exclaim, toUpperCase)
var loudLastUpper4 = compose(angry, last)

/* ############################################################################
############################################################################# */

// Pointfree
// pointfree es un estilo de programación en el que no se mencionan los datos

// not pointfree because we mention the data: word
var snakeCase = function (word) {
  return word.toLowerCase().replace(/\s+/ig, '_')
}

// pointfree
// aqui tener en cuenta que replace es la funcion de los ejemplos anteriores y
// esta currificada, por lo que esta preparada para esperar otro argumento
var snakeCase2 = compose(replace(/\s+/ig, '_'), toLowerCase)

// otro ejemplo de Pointfree
// not pointfree because we mention the data: name
var initials = function (name) {
  return name.split(' ').map(compose(toUpperCase, head)).join('. ')
}

//pointfree
var initials2 = compose(join('. '), map(compose(toUpperCase, head)), split(' '))

initials2('hunter stockton thompson')
// 'H. S. T'

// Pointfree nos permite eliminar nombre innecesarios y mantener nuestro codigo
// conciso y generico
// esto no significa que todo el codigo funcional deba ser pointfree, es otra
// tecnica mas que podemos aplicar cuando sea conveniente.

/* ############################################################################
############################################################################# */

// Debugging

// un error comun es componer algo como map, que es una funcion de dos
// argumentos sin hacer partial applyng sobre ella primero

//wrong - we end up giving angry an array and we partially applied map with who
// knows what.
var latin = compose(map, angry, reverse)

latin(['frog', 'eyes'])
// error

// right - each function expects 1 argument.
var latin2 = compose(map(angry), reverse)

latin(['frog', 'eyes'])
// ['EYES!', 'FROG!'])

/* ############################################################################
############################################################################# */

// si tenemos problemas depurando una composicion podemos usar esta funcion
// para trazas
var trace = curry(function (tag, x) {
  console.log(tag, x)
  return x
})

var dasherize = compose(join('-'), toLower, split(' '), replace(/\s{2,}/ig, ' '))

dasherize('The world is a vampire')
// TypeError: Cannot read property 'apply' of undefined

// hay un error, vamos a depurar

var dasherize2 = compose(join('-'), toLower, trace('after split'), split(' '),
  replace(/\s{2,}/ig, ' '))
// after split [ 'The', 'world', 'is', 'a', 'vampire' ]

// vemos que toLower recibe un array y por eso falla, lo envolvemos en un map
var dasherize3 = compose(join('-'), map(toLower), split(' '),
  replace(/\s{2,}/ig, ' '))

dasherize('The world is a vampire')

// 'the-world-is-a-vampire'

// lenguajes como haskell y purescript tienen funciones similares