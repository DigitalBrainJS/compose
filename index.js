'use strict'

/**
 * Expose compositor.
 */

module.exports = compose;

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose(middleware){
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context) {
    return dispatch(0)
    function dispatch(i) {
      const fn = middleware[i]
      if (!fn) return Promise.resolve()
      return Promise.resolve(fn(context, function next() {
        return dispatch(i + 1)
      }))
    }
  }
}

/**
 * Noop.
 *
 * @api private
 */

function noop(){}
