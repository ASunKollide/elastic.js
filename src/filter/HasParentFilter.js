  /**
    @class
    <p>The has_parent results in child documents that have parent docs matching 
    the query being returned.</p>

    @name ejs.HasParentFilter

    @desc
    Returns results that have parent documents matching the filter.

    @param {Object} qry A valid query object.
    @param {String} parentType The child type
    */
  ejs.HasParentFilter = function (qry, parentType) {

    /**
         The internal filter object. <code>Use get()</code>
         @member ejs.HasParentFilter
         @property {Object} query
         */
    var filter = {
      has_parent: {
        query: qry.get(),
        parent_type: parentType
      }
    };

    return {

      /**
            Sets the query

            @member ejs.HasParentFilter
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return filter.has_parent.query;
        }

        filter.has_parent.query = q.get();
        return this;
      },

      /**
            Sets the child document type to search against

            @member ejs.HasParentFilter
            @param {String} t A valid type name
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      parentType: function (t) {
        if (t == null) {
          return filter.has_parent.parent_type;
        }

        filter.has_parent.parent_type = t;
        return this;
      },

      /**
            Sets the scope of the filter.  A scope allows to run facets on the 
            same scope name that will work against the parent documents. 

            @member ejs.HasParentFilter
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        if (s == null) {
          return filter.has_parent._scope;
        }

        filter.has_parent._scope = s;
        return this;
      },
    
      /**
            Sets the filter name.

            @member ejs.HasParentFilter
            @param {String} name A name for the filter.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      name: function (name) {
        if (name == null) {
          return filter.has_parent._name;
        }

        filter.has_parent._name = name;
        return this;
      },
    
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.HasParentFilter
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
            Retrieves the internal <code>filter</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.HasParentFilter
            @returns {String} returns this object's internal <code>filter</code> property.
            */
      get: function () {
        return filter;
      }
    };
  };
