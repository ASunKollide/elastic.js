  /**
    @class
    <p>Filters documents that have fields that match any of the provided 
    terms (not analyzed)</p>

    @name ejs.TermsFilter

    @desc
    A Filter that matches documents containing provided terms. 

    @param {String} field the document field/key to filter against
    @param {String || Array} terms a single term or an array of terms.
    */
  ejs.TermsFilter = function (field, terms) {

    /**
         The internal filter object. <code>Use get()</code>
         @member ejs.TermsFilter
         @property {Object} filter
         */
    var filter = {
      terms: {}
    };
   
    if (isArray(terms)) {
      filter.terms[field] = terms;
    } else {
      filter.terms[field] = [terms];
    }

    return {

      /**
            Sets the fields to filter against.

            @member ejs.TermsFilter
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = filter.terms[field];
    
        if (f == null) {
          return field;
        }

        delete filter.terms[field];
        field = f;
        filter.terms[f] = oldValue;
    
        return this;
      },
  
      /**
            Sets the terms.  If t is a String, it is added to the existing
            list of terms.  If t is an array, the list of terms replaces the
            existing terms.

            @member ejs.TermsFilter
            @param {String || Array} t A single term or an array or terms.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      terms: function (t) {
        if (t == null) {
          return filter.terms[field];
        }

        if (isArray(t)) {
          filter.terms[field] = t;
        } else {
          filter.terms[field].push(t);
        }
    
        return this;
      },

      /**
            Sets the way terms filter executes is by iterating over the terms 
            provided and finding matches docs (loading into a bitset) and 
            caching it.  Valid values are: plain, bool, bool_nocache, and, 
            and_nocache, or, or_nocache.  Defaults to plain.

            @member ejs.TermsFilter
            @param {String} e A valid execution method.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      execution: function (e) {
        if (e == null) {
          return filter.terms.execution;
        }
      
        e = e.toLowerCase();
        if (e === 'plain' || e === 'bool' || e === 'bool_nocache' || 
          e === 'and' || e === 'and_nocache' || e === 'or' || e === 'or_nocache') {
          filter.terms.execution = e;
        }
      
        return this;
      },
    
      /**
            Sets the filter name.

            @member ejs.TermsFilter
            @param {String} name A name for the filter.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      name: function (name) {
        if (name == null) {
          return filter.terms._name;
        }

        filter.terms._name = name;
        return this;
      },

      /**
            Enable or disable caching of the filter

            @member ejs.TermsFilter
            @param {Boolean} trueFalse True to cache the filter, false otherwise.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cache: function (trueFalse) {
        if (trueFalse == null) {
          return filter.terms._cache;
        }

        filter.terms._cache = trueFalse;
        return this;
      },
  
      /**
            Sets the cache key.

            @member ejs.TermsFilter
            @param {String} key the cache key as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cacheKey: function (key) {
        if (key == null) {
          return filter.terms._cache_key;
        }

        filter.terms._cache_key = key;
        return this;
      },
    
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.TermsFilter
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
            Retrieves the internal <code>filter</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.TermsFilter
            @returns {String} returns this object's internal <code>filter</code> property.
            */
      get: function () {
        return filter;
      }
    };
  };
