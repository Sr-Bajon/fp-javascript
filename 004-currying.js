// el concepto es que si llamamos a una función con menos argumentos de los que
// espera, devuelve otra función que espera los argumentos que faltan

var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12


/* ############################################################################
############################################################################# */

// en el ejemplo anterior no podemos llamar a la función con los dos argumentos
// a la vez, podemos hacerlo con una función auxiliar llamada curry

var curry = require('lodash/curry');

var match = curry(function(what, str) {
  return str.match(what);
});

var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function(f, ary) {
  return ary.filter(f);
});

var map = curry(function(f, ary) {
  return ary.map(f);
});

// observa que colocamos siempre el dato sobre el que vamos a operar al final

match(/\s+/g, 'hello world');
// [ ' ' ]

match(/\s+/g)('hello world');
// [ ' ' ]

var hasSpaces = match(/\s+/g);
// function(x) { return x.match(/\s+/g) }

hasSpaces('hello world');
// [ ' ' ]

hasSpaces('spaceless');
// null

filter(hasSpaces, ['tori_spelling', 'tori amos']);
// ['tori amos']

var findSpaces = filter(hasSpaces);
// function(xs) { return xs.filter(function(x) { return x.match(/\s+/g) }) }

findSpaces(['tori_spelling', 'tori amos']);
// ['tori amos']

var noVowels = replace(/[aeiouy]/ig);
// function(replacement, x) { return x.replace(/[aeiouy]/ig, replacement) }

var censored = noVowels("*");
// function(x) { return x.replace(/[aeiouy]/ig, '*') }

censored('Chocolate Rain');
// 'Ch*c*l*t* R**n'

// tambien tenemos la habilidad de transformar cualquier funcion que trabaje
// sobre elementos unicos en funciones que trabajen con arrays simplemente
// envolviendolas en un map

var getChildren = function(x) {
  return x.childNodes;
};

var allTheChildren = map(getChildren);

// normalmente no se definen funciones que trabajen sobre arrays porque podemos
// llamar a map(getChildren) inline, lo mismo con sort, filter y otras funciones
// de orden superior (funciones toman y devuelven otras funcioens)

// curring hace que se cumpla la funcion matematica, para 1 input recibimos
// exactamente 1 output, para 1 input se devuelve una funcion si es que no se
// satisfacen todos los argumentos

/* ############################################################################
############################################################################# */

// llamar a una funcion con menos argumentos de los que espera normalmente se
// le llama "partial application"
