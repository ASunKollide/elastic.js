  /**
    @class
    <p>A <code>boolQuery</code> allows you to build <em>Boolean</em> query constructs
    from individual term or phrase queries. For example you might want to search
    for documents containing the terms <code>javascript</code> and <code>python</code>.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893930">View Code Example</a></p>

    @name ejs.BoolQuery

    @desc
    A Query that matches documents matching boolean combinations of other
    queries, e.g. <code>termQuerys, phraseQuerys</code> or other <code>boolQuerys</code>.

    */
  ejs.BoolQuery = function () {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.BoolQuery
         @property {Object} query
         */
    var query = {
      bool: {}
    };

    return {

      /**
             Adds query to boolean container. Given query "must" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      must: function (oQuery) {
        if (query.bool.must == null) {
          query.bool.must = [];
        }
      
        if (oQuery == null) {
          return query.bool.must;
        }

        query.bool.must.push(oQuery.get());
        return this;
      },

      /**
             Adds query to boolean container. Given query "must not" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid query object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      mustNot: function (oQuery) {
        if (query.bool.mustNot == null) {
          query.bool.mustNot = [];
        }

        if (oQuery == null) {
          return query.bool.mustNot;
        }
      
        query.bool.mustNot.push(oQuery.get());
        return this;
      },

      /**
             Adds query to boolean container. Given query "should" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid query object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      should: function (oQuery) {
        if (query.bool.should == null) {
          query.bool.should = [];
        }

        if (oQuery == null) {
          return query.bool.should;
        }
      
        query.bool.should.push(oQuery.get());
        return this;
      },

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.BoolQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.bool.boost;
        }

        query.bool.boost = boost;
        return this;
      },

      /**
            Enables or disables similarity coordinate scoring of documents
            matching the <code>Query</code>. Default: false.

            @member ejs.BoolQuery
            @param {String} trueFalse A <code>true/false</code value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      disableCoord: function (trueFalse) {
        if (trueFalse == null) {
          return query.bool.disable_coord;
        }

        query.bool.disable_coord = trueFalse;
        return this;
      },

      /**
            Sets the number of optional clauses that must match.
      
            By default no optional clauses are necessary for a match
            (unless there are no required clauses).  If this method is used,
            then the specified number of clauses is required..

            Use of this method is totally independent of specifying that
            any specific clauses are required (or prohibited).  This number will
            only be compared against the number of matching optional clauses.
   
            @member ejs.BoolQuery
            @param {Integer} minMatch A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minimumNumberShouldMatch: function (minMatch) {
        if (minMatch == null) {
          return query.bool.minimum_number_should_match;
        }

        query.bool.minimum_number_should_match = minMatch;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.BoolQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.BoolQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
