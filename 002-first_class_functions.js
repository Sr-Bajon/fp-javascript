/*
  First class function no es otra cosa que considerar function como otro tipo de
  dato mas, se puede usar como argumento, devolverlo, formar parte de un array,
  etc
 */

var hi = function (name) {
  return 'Hi ' + name
}

var greeting = function (name) {
  return hi(name)
}

/* ############################################################################
############################################################################# */

// ignorant
var getServerStuffBad = function (callback) {
  return ajaxCall(function (json) {
    return callback(json)
  })
}

// enlightened
var getServerStuff = ajaxCall

/*
  // this line
  return ajaxCall(function(json) {
    return callback(json);
  });

  // is the same as this line
  return ajaxCall(callback);

  // so refactor getServerStuff
  var getServerStuff = function(callback) {
    return ajaxCall(callback);
  };

  // ...which is equivalent to this
  var getServerStuff = ajaxCall; // <-- look mum, no ()'s
*/

/* ############################################################################
############################################################################# */

var BlogControllerBad = (function () {
  var index = function (posts) {
    return Views.index(posts)
  }

  var show = function (post) {
    return Views.show(post)
  }

  var create = function (attrs) {
    return Db.create(attrs)
  }

  var update = function (post, attrs) {
    return Db.update(post, attrs)
  }

  var destroy = function (post) {
    return Db.destroy(post)
  }

  return {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy,
  }
})()

var BlogController = {
  index: Views.index,
  show: Views.show,
  create: Db.create,
  update: Db.update,
  destroy: Db.destroy
}

/* ############################################################################
############################################################################# */

httpGet('/post/2', function (json) {
  return renderPost(json)
})

// si cambiamos httpGet para enviar un posible error, tambien tenemos que
// cambiar la función que lo envuelve.

// go back to every httpGet call in the application and explicitly
// pass err along.
httpGet('/post/2', function (json, err) {
  return renderPost(json, err)
})

// si lo hubiermos escrito como una first class function, nos ahorramos trabajo
// solo tenemos que cambiar la definicion de la función
httpGet('/post/2', renderPost)

/* ############################################################################
############################################################################# */

// la importancia de nombrar correctamente
// procura usar nombres genericos

// specific to our current blog
var validArticles = function (articles) {
  return articles.filter(function (article) {
    return article !== null && article !== undefined
  })
}

// vastly more relevant for future projects
var compact = function (xs) {
  return xs.filter(function (x) {
    return x !== null && x !== undefined
  })
}

/* ############################################################################
############################################################################# */

// en fp no hay necesidad de usar this, o no deberia
// un patron comun para interactuar con otras librerias es bindearlas consigo
// mismas

var fs = require('fs')

// scary
fs.readFile('freaky_friday.txt', Db.save)

// less so
fs.readFile('freaky_friday.txt', Db.save.bind(Db))
