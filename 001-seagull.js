/* aproximación orientada a objetos */
// dificil seguir el estado porque es mutable

var Flock = function (n) {
  this.seagulls = n
}

Flock.prototype.conjoin = function (other) {
  this.seagulls += other.seagulls
  return this
}

Flock.prototype.breed = function (other) {
  this.seagulls = this.seagulls * other.seagulls
  return this
}

var flock_a_oo = new Flock(4)
var flock_b_oo = new Flock(2)
var flock_c_oo = new Flock(0)

var result_oo = flock_a_oo.conjoin(flock_c_oo)
  .breed(flock_b_oo).conjoin(flock_a_oo.breed(flock_b_oo)).seagulls
//=> 32

/* #############################################################################
############################################################################# */

/* aproximacion funcional */

var conjoin = function (flock_x, flock_y) { return flock_x + flock_y }
var breed = function (flock_x, flock_y) { return flock_x * flock_y }

var flock_a_fp = 4
var flock_b_fp = 2
var flock_c_fp = 0

var result_fp = conjoin(
  breed(flock_b_fp, conjoin(flock_a_fp, flock_c_fp)), breed(flock_a_fp, flock_b_fp)
)
//=>16

/* #############################################################################
############################################################################# */

// si nos fijamos, conjoin es simplemente sumar los dos argumentos y breed es
// multiplicar los argumentos, si simplificamos los nombre tenemos

var add = function (x, y) { return x + y }
var multiply = function (x, y) { return x * y }

var flock_a = 4
var flock_b = 2
var flock_c = 0

var result = add(
  multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b)
)
//=>16

/*
  - Principio asociativo
  Dados tres o mas elementos cualquiera de un conjunto determinado, se verifica
  que existe una operación: o, que cumpla la igualdad:
  a o (b o c) = (a o b) o c

  Three elements x, y and z of a set S are said to be associative under a
  binary operation * if they satisfy

  x*(y*z)=(x*y)*z.

  Real numbers are associative under addition

   x+(y+z)=(x+y)+z

  and multiplication

  x·(y·z)=(x·y)·z.

  add(add(x, y), z) === add(x, add(y, z))

  - Principio conmutativo
  El resultado es independiente del orden de los valores

  add(x, y) === add(y, x);


  - Principio de identidad
  Es la constatación de que dos objetos que matematicamente se escriben
  diferente, son de hecho el mismo objeto.

  Un elemento neutro o elemento entidad tiene un efecto neutro al ser utilizado
  en una operacion.
  add(x, 0) === x;

  - Propiedad distributiva
  La propiedad distributiva de la multiplicación sobre la suma en álgebra
  elemental es aquella en la que el resultado de un número multiplicado por la
  suma de dos o más sumandos, es igual a la suma de los productos de cada
  sumando por ese número

  a*(b + c) = a*b + a*c

  (2 x 3 + 3 x 2) === 3 x (2 + 2)

  multiply(x, add(y,z)) === add(multiply(x, y), multiply(x, z));

 */

// Original line
add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));

// Apply the identity property to remove the extra add
// (add(flock_a, flock_c) == flock_a)
add(multiply(flock_b, flock_a), multiply(flock_a, flock_b));

// Apply distributive property to achieve our result
multiply(flock_b, add(flock_a, flock_a));