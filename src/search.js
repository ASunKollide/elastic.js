  /**
    @class
    <p>The <code>Request</code> object provides methods for performing searches
       against data stored in Cloud9. Search is an inherent part of Cloud9 and
       fundemental to how documents are actually stored on disk. With that said,
       the mere act of storing a document means it's a searchable entity.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895052">View Code Example</a></p>

    @name ejs.Request

    @desc
    <p>Provides methods for searching data stored in Cloud9.</p>

    @param {Object} conf A configuration object containing the index and type to search
    against. Both object properties expect <code>Array</code> values and allow users to
    specify multiple values for each. See example below.<br>
    */
  ejs.Request = function (conf) {

    var query, indices, types;

    /**
        The internal query object.
        @member ejs.Request
        @property {Object} query
        */
    query = {
      size: 10,
      from: 0
    };

    conf = conf || {};
    // check if we are searching across any specific indeices        
    if (conf.collections == null) {
      indices = [];
    } else if (typeof conf.collections === "string") {
      indices = [conf.collections];
    } else {
      indices = conf.collections;
    }

    // check if we are searching across any specific types
    if (conf.types == null) {
      types = [];
    } else if (typeof conf.types === "string") {
      types = [conf.types];
    } else {
      types = conf.types;
    }

    // check that an index is specified when a type is
    // if not, search across _all indices
    if (indices.length === 0 && types.length > 0) {
      indices = ["_all"];
    }

    return {

      /**
            Sets the sort order for results. Multi-level sorting is supported so the
            order in which sort fields are added to the query requests is relevant.

            @member ejs.Request
            @param {String} fieldName The field to be sorted by.
            @param {String} order The order in which to sort. Valid values are <code>desc, asc</code>. Default is <code>desc</code>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      sort: function (fieldName, order) {
        order = order || "desc";

        if (!has(query, "sort")) {
          query.sort = [];
        }

        if (arguments.length === 0) {
          return query.sort;
        }
        
        var sorter = {};
        sorter[fieldName] = order;
        query.sort.push(sorter);

        return this;
      },

      /**
            Sets the number of results/documents to be returned. This is set on a per page basis.

            @member ejs.Request
            @param {Integer} s The number of results that are to be returned by the search.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (s) {
        if (s == null) {
          return query.size;
        }
        
        query.size = s;
        return this;
      },

      /**
            By default, searches return full documents, meaning every property or field.
            This method allows you to specify which fields you want returned.

            @member ejs.Request
            @param {Array} s The set fields that are to be returned by the search.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fields: function (fieldList) {
        if (fieldList == null) {
          return query.fields;
        }
        
        query.fields = fieldList;
        return this;
      },

      /**
            A search result set could be very large (think Google). Setting the
            <code>from</code> parameter allows you to page through the result set
            by making multiple request. This parameters specifies the starting
            result/document number point. Combine with <code>size()</code> to achieve paging.

            @member ejs.Request
            @param {Array} f The offset at which to start fetching results/documents from the result set.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      from: function (f) {
        if (f == null) {
          return query.from;
        }
          
        query.from = f;
        return this;
      },

      /**
            Allows you to set the specified query on this search object. This is the
            query that will be used when the search is executed using <code>get()</code>.

            @member ejs.Request
            @param {Query} someQuery Any valid Cloud9 <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (someQuery) {
        if (someQuery == null) {
          return query.query;
        }
        
        query.query = someQuery.get();
        return this;
      },

      /**
            Allows you to set the specified collections on this request object. This is the
            set of collections that will be used when the search is executed using <code>get()</code>.

            @member ejs.Request
            @param {Array} indexArray An array of collection names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      collections: function (indexArray) {
        if (indexArray == null) {
          return indices;
        } else if (typeof indexArray === "string") {
          indices = [indexArray];
        } else {
          indices = indexArray;
        }

        // check that an index is specified when a type is
        // if not, search across _all indices
        if (indices.length === 0 && types.length > 0) {
          indices = ["_all"];
        }

        return this;
      },

      /**
            Allows you to set the specified content-types on this request object. This is the
            set of collections that will be used when the search is executed using <code>get()</code>.

            @member ejs.Request
            @param {Array} typeArray An array of content-type names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      types: function (typeArray) {
        if (typeArray == null) {
          return types;
        } else if (typeof typeArray === "string") {
          types = [typeArray];
        } else {
          types = typeArray;
        }

        // check that an index is specified when a type is
        // if not, search across _all indices
        if (indices.length === 0 && types.length > 0) {
          indices = ["_all"];
        }

        return this;
      },

      /**
            Allows you to set the specified facet on this request object. Multiple facets can
            be set, all of which will be returned when the search is executed using <code>get()</code>.

            @member ejs.Request
            @param {Facet} facet Any valid Cloud9 <code>Facet</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      facet: function (facet) {
        if (facet == null) {
          return query.facets;
        }
        
        if (query.facets == null) {
          query.facets = {};
        }
        
        extend(query.facets, facet.get());

        return this;
      },

      /**
            Allows you to set a specified filter on this request object.

            @member ejs.Request
            @param {Object} filter Any valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (filter) {
        if (filter == null) {
          return query.filter;
        }
        
        query.filter = filter.get();
        return this;
      },

      /**
            Performs highlighting of matched terms against the specified fields.

            @member ejs.Request
            @param {Facet} fieldNames An array of field names which to perform highlighting against.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlight: function (fieldNames) {
        var i, len;

        query.highlight = {
          fields: {}
        };

        if (fieldNames == null) {
          return query.highlight.fields;
        }
        
        for (i = 0, len = fieldNames.length; i < len; i++) {
          query.highlight.fields[fieldNames[i]] = {};
        }

        return this;
      },

      /**
            Sets the pre tags for highlighted fragments.

            @member ejs.Request
            @param {Array} tags An array of string pre tags.
            @param {String} oField An optional field name these settings will be applied to.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlightPreTags: function (tags, oField) {
        if (query.highlight == null) {
          query.highlight = {
            fields: {}
          };
        }

        if (arguments.length === 0) {
          return query.highlight.pre_tags;
        }
        
        if (oField == null) {
          query.highlight.pre_tags = tags;
        } else {
          query.highlight.fields[oField] = query.highlight.fields[oField] || {};
          query.highlight.fields[oField].pre_tags = tags;
        }

        return this;
      },

      /**
            Sets the post tags for highlighted fragments.

            @member ejs.Request
            @param {Array} tags An array of string post tags.
            @param {String} oField An optional field name these settings will be applied to.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlightPostTags: function (tags, oField) {
        if (query.highlight == null) {
          query.highlight = {
            fields: {}
          };
        }

        if (arguments.length === 0) {
          return query.highlight.post_tags;
        }
        
        if (oField == null) {
          query.highlight.post_tags = tags;
        } else {
          query.highlight.fields[oField] = query.highlight.fields[oField] || {};
          query.highlight.fields[oField].post_tags = tags;
        }

        return this;
      },

      /**
            Sets the highlighting tag schema.

            @member ejs.Request
            @param {String} tagSchema A string tag schema name.
            @param {String} oField An optional field name these settings will be applied to.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlightTagSchema: function (tagSchema, oField) {
        if (query.highlight == null) {
          query.highlight = {
            fields: {}
          };
        }

        if (arguments.length === 0) {
          return query.highlight.tags_schema;
        }
        
        if (oField == null) {
          query.highlight.tags_schema = tagSchema;
        } else {
          query.highlight.fields[oField] = query.highlight.fields[oField] || {};
          query.highlight.fields[oField].tags_schema = tagSchema;
        }

        return this;
      },

      /**
            Sets the number of highlight fragments.

            @member ejs.Request
            @param {Integer} num The number of highlight fragments.
            @param {String} oField An optional field name these settings will be applied to.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlightFragments: function (num, oField) {
        if (query.highlight == null) {
          query.highlight = {
            fields: {}
          };
        }

        if (arguments.length === 0) {
          return query.highlight.number_of_fragments;
        }
        
        if (oField == null) {
          query.highlight.number_of_fragments = num;
        } else {
          query.highlight.fields[oField] = query.highlight.fields[oField] || {};
          query.highlight.fields[oField].number_of_fragments = num;
        }

        return this;
      },

      /**
            Sets the size of each highlight fragment in characters.

            @member ejs.Request
            @param {Integer} num The number of characters in each highlight fragment.
            @param {String} oField An optional field name these settings will be applied to.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlightFragmentSize: function (num, oField) {
        if (query.highlight == null) {
          query.highlight = {
            fields: {}
          };
        }

        if (arguments.length === 0) {
          return query.highlight.fragment_size;
        }
        
        if (oField == null) {
          query.highlight.fragment_size = num;
        } else {
          query.highlight.fields[oField] = query.highlight.fields[oField] || {};
          query.highlight.fields[oField].fragment_size = num;
        }

        return this;
      },

      /**
            Computes a document property dynamically based on the supplied <code>ComputedProperty</code>.

            @member ejs.Request
            @param {ComputedProperty} oComputedProperty A valid Cloud9 <code>ComputedProperty</code>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      computedProperty: function (oComputedProperty) {
        if (oComputedProperty == null) {
          return query.script_fields;
        }
        
        if (query.script_fields == null) {
          query.script_fields = {};
        }
        
        
        extend(query.script_fields, oComputedProperty.get());
        return this;
      },

      /**
            Controls a preference of which shard replicas to execute the search request on.
            By default, the operation is randomized between the each shard replicas.  The
            preference can be one of the following:

            _primary - the operation will only be executed on primary shards
            _local - the operation will prefer to be executed on local shards
            _only_node:$nodeid - the search will only be executed on node with id $nodeid
            custom - any string, will guarentee searches always happen on same node.

            @member ejs.Request
            @param {String} perf the preference, any of _primary, _local, _only_:$nodeid, or a custom string value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      preference: function (perf) {
        if (perf == null) {
          return query.perference;
        }
        
        query.perference = perf;
        return this;
      },

      /**
            Boosts hits in the specified index by the given boost value.

            @member ejs.Request
            @param {String} index the index to boost
            @param {Double} boost the boost value
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      indexBoost: function (index, boost) {
        if (query.indices_boost == null) {
          query.indices_boost = {};
        }

        if (arguments.length === 0) {
          return query.indices_boost;
        }
        
        query.indices_boost[index] = boost;
        return this;
      },

      /**
            Enable/Disable explanation of score for each search result.

            @member ejs.Request
            @param {Boolean} trueFalse true to enable, false to disable
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      explain: function (trueFalse) {
        if (trueFalse == null) {
          return query.explain;
        } 
          
        query.explain = trueFalse;
        return this;
      },

      /**
            Enable/Disable returning version number for each search result.

            @member ejs.Request
            @param {Boolean} trueFalse true to enable, false to disable
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      version: function (trueFalse) {
        if (trueFalse == null) {
          return query.version;
        }
          
        query.version = trueFalse;
        return this;
      },

      /**
            Filters out search results will scores less than the specified minimum score.

            @member ejs.Request
            @param {Double} min a positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minScore: function (min) {
        if (min == null) {
          return query.min_score;
        }
          
        query.min_score = min;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.Request
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Executes the search. This call runs synchronously when used on the server side.
            The callback is still executed and the function returns the return value of the callback.

            @member ejs.Request
            @param {Function} fnCallBack A callback function that handles the search response.
            @returns {void} Returns the value of the callback when executing on the server.
            */
      get: function (fnCallBack) {
        var 
          queryData = JSON.stringify(query),
          searchUrl = '';
        
        // make sure the user has set a client
        if (ejs.client == null) {
          throw new Error("No Client Set");
        }
            
        // generate the search url
        if (indices.length > 0) {
          searchUrl = searchUrl + '/' + indices.join();
        }

        if (types.length > 0) {
          searchUrl = searchUrl + '/' + types.join();
        }
          
        searchUrl = searchUrl + '/_search';
        return ejs.client.post(searchUrl, queryData, fnCallBack);
      }
    };
  };

  ejs.Pager = function (srch, cb) {
    var search = srch,
      callback = cb,
      hits = 0,
      total = 0,
      current = 0,
      update = function () {
        total = Math.ceil(hits / search.size());
        total = total === 0 ? 1 : total;
        current = Math.ceil((search.from() / search.size()) + 1);
      };

    return {
      hits: function (h) {
        hits = h;
        update();
        return this;
      },
      total: function () {
        return total;
      },
      current: function () {
        return current;
      },
      next: function () {
        var next = current;
        if (current < total) {
          next = current + 1;
        }
        return next;
      },
      previous: function () {
        var prev = current;
        if (current > 1) {
          prev = current - 1;
        }
        return prev;
      },
      pages: function (min, max) {
        var pages = [],
          end = current + min < total ? current + min : total + 1,
          start = end - max > 1 ? end - max : 1,
          i;

        for (i = start; i < end; i++) {
          pages.push(i);
        }
        return pages;
      },
      go: function (page) {
        var from = (page * search.size()) - search.size();
        return search.from(from).get(callback);
      }
    };
  };

  /**
    @class
    <p>Computed properties allow you create dynamic fields on stored documents at query
    time. For example, you might have a set of document thats containsthe fields
    <code>price</code> and <code>quantity</code>. At query time, you could define a computed
    property that dynamically creates a new field called <code>total</code>in each document
    based on the calculation <code>price * quantity</code>.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895052">View Code Example</a></p>

    @name ejs.ComputedProperty

    @desc
    <p>Computes dynamic document properties based on information from other fields.</p>

    @param {String} fieldName A name of the computed property to create.
  
    */
  ejs.ComputedProperty = function (fieldName) {
    var script = {};

    script[fieldName] = {};

    return {

      /**
            The script language being used. Currently supported values are
            <code>javascript</code> and <code>mvel</code>.

            @member ejs.ComputedProperty
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return script[fieldName].lang;
        }
        
        script[fieldName].lang = language;
        return this;
      },

      /**
            Sets the script/code that will be used to perform the calculation.

            @member ejs.ComputedProperty
            @param {String} expression The script/code to use.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      script: function (expression) {
        if (expression == null) {
          return script[fieldName].script;
        }
        
        script[fieldName].script = expression;
        return this;
      },

      /**
            Allows you to set script parameters to be used during the execution of the script.

            @member ejs.ComputedProperty
            @param {Object} oParams An object containing key/value pairs representing param name/value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (oParams) {
        if (oParams == null) {
          return script[fieldName].params;
        }
        
        script[fieldName].params = oParams;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.ComputedProperty
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(script);
      },

      /**
            Retrieves the internal <code>script</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.ComputedProperty
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return script;
      }
    };
  };

