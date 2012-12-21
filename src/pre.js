'use strict';

/**
 @namespace
 @name ejs
 @desc All elastic.js modules are organized under the ejs namespace.
 */
(function () {

  var 

    // save reference to global object
    // `window` in browser
    // `exports` on server
    root = this,
    
    // save the previous version of ejs
    _ejs = root && root.ejs,

    // from underscore.js, used in utils
    ArrayProto = Array.prototype, 
    ObjProto = Object.prototype, 
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProp = ObjProto.hasOwnProperty,
    nativeForEach = ArrayProto.forEach,
    nativeIsArray = Array.isArray,
    breaker = {},
    has,
    each,
    extend,
    isArray,
    isObject,
    isString,
    isNumber,
    isFunction,
    isEJSObject, // checks if valid ejs object
    isQuery, // checks valid ejs Query object
    isFilter, // checks valid ejs Filter object
    isFacet, // checks valid ejs Facet object
    isScriptField, // checks valid ejs ScriptField object
    isGeoPoint, // checks valid ejs GeoPoint object
    isIndexedShape, // checks valid ejs IndexedShape object
    isShape, // checks valid ejs Shape object
    isSort, // checks valid ejs Sort object
    isHighlight, // checks valid ejs Highlight object
    
    // create ejs object
    ejs;
    
  if (typeof exports !== 'undefined') {
    ejs = exports;
  } else {
    ejs = root.ejs = {};
  }
