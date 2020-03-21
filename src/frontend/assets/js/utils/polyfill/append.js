/* eslint-disable no-multi-assign, vars-on-top, no-underscore-dangle */

//
// append polyfill
// https://github.com/Financial-Times/polyfill-library/tree/master/polyfills/Element/prototype/append
// --------------------------------------------------

export default () => {
  var _mutation = (function() {
    function isNode(object) {
      // DOM, Level2
      if (typeof Node === 'function') return object instanceof Node

      // older browsers, check if it looks like a Node instance)
      return object && typeof object === 'object' && object.nodeName && object.nodeType >= 1 && object.nodeType <= 12
    }

    // http://dom.spec.whatwg.org/#mutation-method-macro
    return function mutation(nodes) {
      if (nodes.length === 1) {
        return isNode(nodes[0]) ? nodes[0] : document.createTextNode(nodes[0] + '')
      }

      var fragment = document.createDocumentFragment()

      for (var i = 0; i < nodes.length; i++) {
        fragment.appendChild(isNode(nodes[i]) ? nodes[i] : document.createTextNode(nodes[i] + ''))
      }

      return fragment
    }
  })()

  Document.prototype.append = Element.prototype.append = function append() {
    this.appendChild(_mutation(arguments))
  }
}
