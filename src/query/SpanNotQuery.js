  /**
    @class
    <p>Removes matches which overlap with another span query.
    The span not query maps to Lucene SpanNotQuery.</p>

    @name ejs.SpanNotQuery

    @desc
    Removes matches which overlap with another span query.

    @param {Query} includeQry a valid SpanQuery whose matching docs will be returned.
    @param {Query} excludeQry a valid SpanQuery whose matching docs will not be returned
    
    */
  ejs.SpanNotQuery = function (includeQry, excludeQry) {

    if (!isQuery(includeQry) || !isQuery(excludeQry)) {
      throw new TypeError('Argument must be a SpanQuery');
    }
    
    /**
         The internal query object. <code>Use toJSON()</code>
         @member ejs.SpanNotQuery
         @property {Object} query
         */
    var query = {
      span_not: {
        include: includeQry.toJSON(),
        exclude: excludeQry.toJSON()
      }
    };

    return {

      /**
            Set the span query whose matches are filtered.

            @member ejs.SpanNotQuery
            @param {Object} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      include: function (spanQuery) {
        if (spanQuery == null) {
          return query.span_not.include;
        }
      
        if (!isQuery(spanQuery)) {
          throw new TypeError('Argument must be a SpanQuery');
        }
        
        query.span_not.include = spanQuery.toJSON();
        return this;
      },

      /**
            Sets the span query whose matches must not overlap those returned.

            @member ejs.SpanNotQuery
            @param {Object} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      exclude: function (spanQuery) {
        if (spanQuery == null) {
          return query.span_not.exclude;
        }
      
        if (!isQuery(spanQuery)) {
          throw new TypeError('Argument must be a SpanQuery');
        }
        
        query.span_not.exclude = spanQuery.toJSON();
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.SpanNotQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.span_not.boost;
        }

        query.span_not.boost = boost;
        return this;
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.SpanNotQuery
            @returns {String} the type of object
            */
      _type: function () {
        return 'query';
      },
      
      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.SpanNotQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      toJSON: function () {
        return query;
      }
    };
  };
