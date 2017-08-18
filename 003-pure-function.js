// una funcion pura es aquella que teniendo la misma entrada siempre devuelve
// la misma salida, a mismo input igual output.

// como ejemplo, dos funciones propias de javascript, slice es pura ya que no
// modifica el valor de entrada, y splice es impura ya que lo modifica.
// En terminos funcionale muta el estado, que es lo que no queremos
var xs = [1, 2, 3, 4, 5]

// pure
xs.slice(0, 3)
//=> [1, 2, 3]

xs.slice(0, 3)
//=> [1, 2, 3]

xs.slice(0, 3)
//=> [1, 2, 3]

// impure
xs.splice(0, 3)
//=> [1, 2, 3]

xs.splice(0, 3)
//=> [4, 5]

xs.splice(0, 3)
//=> []

/* ############################################################################
############################################################################# */

// en esta ocasion la primera funcion depende de un valor mutable y la segunda
// no

// impure
var minimum = 21

var checkAge = function (age) {
  return age >= minimum
}

// pure
var checkAge = function (age) {
  var minimum = 21
  return age >= minimum
}

/*
  Side effects may include, but are not limited to
    changing the file system
    inserting a record into a database
    making an http call
    mutations
    printing to the screen / logging
    obtaining user input
    querying the DOM
    accessing system state
 */

/*
  Una funcion en matematicas es una relacion entre dos valores, cada uno de los
  inputs tiene como resultado exactamente un output

  Un input que pudiera tener varios outputs dependiendo de la situacion no sería
  una función.

  Y que pasa con las funciones en programacion con varios argumentos, de momento
  los encapsularemos en un array o usaremos "arguments" de javascript.
 */

/* ############################################################################
############################################################################# */

// memoization
// si tenemos una funcion pura, a igual argumento podemos devolver directamente
// el resultado, a esta tecnica se le llama memoization

var squareNumber = memoize(function (x) {
  return x * x
})

squareNumber(4)
//=> 16

squareNumber(4) // returns cache for input 4
//=> 16

squareNumber(5)
//=> 25

squareNumber(5) // returns cache for input 5
//=> 25

var memoize = function (f) {
  var cache = {}

  return function () {
    var arg_str = JSON.stringify(arguments)
    // si existe la funcion cacheada se devuelve directamente, si no se ejecuta
    // con apply (le pasa como this la misma funcion...), se guarda en la
    // variable cache y se devuelve.
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments)
    return cache[arg_str]
  }
}

/* ############################################################################
############################################################################# */

/* portable - self-documenting */
/* testable */

//impure
var signUp = function (attrs) {
  var user = saveUser(attrs)
  welcomeUser(user)
}

var saveUser = function (attrs) {
  var user = Db.save(attrs)
// ...
}

var welcomeUser = function (user) {
  Email(user/*, ...*/)
// ...
}

//pure
// en la funcion pura de ejemplo todo lo que necesita la operación se pasa como
// argumento, no depende de valores externos a ella como en el ejemplo signUp
// anterior
var signUp = function (Db, Email, attrs) {
  return function () {
    var user = saveUser(Db, attrs)
    welcomeUser(Email, user)
  }
}

var saveUser = function (Db, attrs) {
// ...
}

var welcomeUser = function (Email, user) {
// ...
}

/* ############################################################################
############################################################################# */

/* REASONABLE */
// se puede razonar sobre el codigo
// referential transparency, un trozo de codigo es referential transparency
// cuando puede ser substituido por su valor evaluado sin cambios en el
// comportamiento del programa

// esto permite refactorizar y comprender el codigo
// ademas permite tambien ejecutar codigo en paralelo porque no necesita acceder
// a memoria compartida y no puede, por definicio, tener condiciones de carrera
// por efectos colaterales

// en nodejs se podría hacer con workers y en el browser con web workers

var Immutable = require('immutable')

var decrementHP = function (player) {
  return player.set('hp', player.get('hp') - 1)
}

var isSameTeam = function (player1, player2) {
  return player1.get('team') === player2.get('team')
}

var punch = function (player, target) {
  return isSameTeam(player, target) ? target : decrementHP(target)
}

var jobe = Immutable.Map({
  name: 'Jobe',
  hp: 20,
  team: 'red'
})
var michael = Immutable.Map({
  name: 'Michael',
  hp: 20,
  team: 'green'
})

punch(jobe, michael)
//=> Immutable.Map({name:'Michael', hp:19, team: 'green'})


// referential transparency en la practica

// en vez de llamar a isSameTeam ponemos la funcion inline
var punch = function(player, target) {
  return player.get('team') === target.get('team') ? target : decrementHP(target);
};

// como los datos son inmutables podemos reemplazar los equipos con su valor
// actual
var punch = function(player, target) {
  return 'red' === 'green' ? target : decrementHP(target);
};

// como en este caso es falso podemos eliminar la condicion false del
// condicional terciario
var punch = function(player, target) {
  return decrementHP(target);
};

// si ponemos inline la funcion decrementHP vemos que en este caso concreto,
// punch es una llamada a decrementar el hp en 1
var punch = function(player, target) {
  return target.set('hp', target.get('hp') - 1);
};