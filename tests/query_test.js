/*global require:true */
'use strict';

var ejs = require('../dist/elastic.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.test.test.expect(numAssertions)
    test.done()
  Test assertions:
    test.test.test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.test.test.deepEqual(actual, expected, [message])
    test.nottest.test.deepEqual(actual, expected, [message])
    test.test.test.strictEqual(actual, expected, [message])
    test.nottest.test.strictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.queries = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(25);

    test.ok(ejs.HasParentQuery, 'HasParentQuery');
    test.ok(ejs.HasChildQuery, 'HasChildQuery');
    test.ok(ejs.FuzzyQuery, 'FuzzyQuery');
    test.ok(ejs.FuzzyLikeThisFieldQuery, 'FuzzyLikeThisFieldQuery');
    test.ok(ejs.FuzzyLikeThisQuery, 'FuzzyLikeThisQuery');
    test.ok(ejs.CustomBoostFactorQuery, 'CustomBoostFactorQuery');
    test.ok(ejs.CustomScoreQuery, 'CustomScoreQuery');
    test.ok(ejs.IdsQuery, 'IdsQuery');
    test.ok(ejs.BoostingQuery, 'BoostingQuery');
    test.ok(ejs.MatchQuery, 'MatchQuery');
    test.ok(ejs.MultiMatchQuery, 'MultiMatchQuery');
    test.ok(ejs.TermQuery, 'TermQuery');
    test.ok(ejs.BoolQuery, 'BoolQuery');
    test.ok(ejs.FieldQuery, 'FieldQuery');
    test.ok(ejs.DisMaxQuery, 'DisMaxQuery');
    test.ok(ejs.QueryStringQuery, 'QueryStringQuery');
    test.ok(ejs.FilteredQuery, 'FilteredQuery');
    test.ok(ejs.NestedQuery, 'NestedQuery');
    test.ok(ejs.ConstantScoreQuery, 'ConstantScoreQuery');
    test.ok(ejs.MatchAllQuery, 'MatchAllQuery');
    test.ok(ejs.MatchAllQuery, 'SpanTermQuery');
    test.ok(ejs.MatchAllQuery, 'SpanNearQuery');
    test.ok(ejs.MatchAllQuery, 'SpanNotQuery');
    test.ok(ejs.MatchAllQuery, 'SpanOrQuery');
    test.ok(ejs.MatchAllQuery, 'SpanFirstQuery');

    test.done();
  },
  HasParentQuery: function (test) {
    test.expect(8);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      hasParentQuery = ejs.HasParentQuery(termQuery, 't1'),
      expected,
      doTest = function () {
        test.deepEqual(hasParentQuery.get(), expected);
      };

    expected = {
      has_parent: {
        query: termQuery.get(),
        parent_type: 't1'
      }
    };

    test.ok(hasParentQuery, 'HasParentQuery exists');
    test.ok(hasParentQuery.get(), 'get() works');
    doTest();
    
    hasParentQuery.query(termQuery2);
    expected.has_parent.query = termQuery2.get();
    doTest();
    
    hasParentQuery.parentType('t2');
    expected.has_parent.parent_type = 't2';
    doTest();
    
    hasParentQuery.scope('my_scope');
    expected.has_parent._scope = 'my_scope';
    doTest();
    
    hasParentQuery.boost(1.2);
    expected.has_parent.boost = 1.2;
    doTest();
    
    test.strictEqual(hasParentQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  HasChildQuery: function (test) {
    test.expect(8);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      hasChildQuery = ejs.HasChildQuery(termQuery, 't1'),
      expected,
      doTest = function () {
        test.deepEqual(hasChildQuery.get(), expected);
      };

    expected = {
      has_child: {
        query: termQuery.get(),
        type: 't1'
      }
    };

    test.ok(hasChildQuery, 'HasChildQuery exists');
    test.ok(hasChildQuery.get(), 'get() works');
    doTest();
    
    hasChildQuery.query(termQuery2);
    expected.has_child.query = termQuery2.get();
    doTest();
    
    hasChildQuery.type('t2');
    expected.has_child.type = 't2';
    doTest();
    
    hasChildQuery.scope('my_scope');
    expected.has_child._scope = 'my_scope';
    doTest();
    
    hasChildQuery.boost(1.2);
    expected.has_child.boost = 1.2;
    doTest();
    
    test.strictEqual(hasChildQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  FuzzyQuery: function (test) {
    test.expect(11);

    var fuzzyQuery = ejs.FuzzyQuery('f1', 'fuzz'),
      expected,
      doTest = function () {
        test.deepEqual(fuzzyQuery.get(), expected);
      };

    expected = {
      fuzzy: {
        f1: {
          value: 'fuzz'
        }
      }
    };

    test.ok(fuzzyQuery, 'FuzzyQuery exists');
    test.ok(fuzzyQuery.get(), 'get() works');
    doTest();
    
    fuzzyQuery.value('fuzz2');
    expected.fuzzy.f1.value = 'fuzz2';
    doTest();
    
    fuzzyQuery.field('f2');
    expected = {
      fuzzy: {
        f2: {
          value: 'fuzz2'
        }
      }
    };
    doTest();
    
    fuzzyQuery.transpositions(false);
    expected.fuzzy.f2.transpositions = false;
    doTest();
    
    fuzzyQuery.maxExpansions(10);
    expected.fuzzy.f2.max_expansions = 10;
    doTest();
    
    fuzzyQuery.minSimilarity(0.6);
    expected.fuzzy.f2.min_similarity = 0.6;
    doTest();
    
    fuzzyQuery.prefixLength(4);
    expected.fuzzy.f2.prefix_length = 4;
    doTest();
    
    fuzzyQuery.boost(1.2);
    expected.fuzzy.f2.boost = 1.2;
    doTest();
    
    test.strictEqual(fuzzyQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  FuzzyLikeThisFieldQuery: function (test) {
    test.expect(12);

    var fltQuery = ejs.FuzzyLikeThisFieldQuery('f1', 'like text'),
      expected,
      doTest = function () {
        test.deepEqual(fltQuery.get(), expected);
      };

    expected = {
      flt_field: {
        f1: {
          like_text: 'like text'
        }
      }
    };

    test.ok(fltQuery, 'FuzzyLikeThisFieldQuery exists');
    test.ok(fltQuery.get(), 'get() works');
    doTest();
    
    fltQuery.likeText('like text 2');
    expected.flt_field.f1.like_text = 'like text 2';
    doTest();
    
    fltQuery.field('f2');
    expected = {
      flt_field: {
        f2: {
          like_text: 'like text 2'
        }
      }
    };
    doTest();
    
    fltQuery.ignoreTf(false);
    expected.flt_field.f2.ignore_tf = false;
    doTest();
    
    fltQuery.maxQueryTerms(10);
    expected.flt_field.f2.max_query_terms = 10;
    doTest();
    
    fltQuery.minSimilarity(0.6);
    expected.flt_field.f2.min_similarity = 0.6;
    doTest();
    
    fltQuery.prefixLength(4);
    expected.flt_field.f2.prefix_length = 4;
    doTest();
    
    fltQuery.analyzer('some analyzer');
    expected.flt_field.f2.analyzer = 'some analyzer';
    doTest();
    
    fltQuery.boost(1.2);
    expected.flt_field.f2.boost = 1.2;
    doTest();
    
    test.strictEqual(fltQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  FuzzyLikeThisQuery: function (test) {
    test.expect(14);

    var fltQuery = ejs.FuzzyLikeThisQuery('like text'),
      expected,
      doTest = function () {
        test.deepEqual(fltQuery.get(), expected);
      };

    expected = {
      flt: {
        like_text: 'like text'
      }
    };

    test.ok(fltQuery, 'FuzzyLikeThisQuery exists');
    test.ok(fltQuery.get(), 'get() works');
    doTest();
    
    fltQuery.fields('f1');
    expected.flt.fields = ['f1'];
    doTest();
    
    fltQuery.fields('f2');
    expected.flt.fields.push('f2');
    doTest();
    
    fltQuery.fields(['f3', 'f4']);
    expected.flt.fields = ['f3', 'f4'];
    doTest();
    
    fltQuery.likeText('like text 2');
    expected.flt.like_text = 'like text 2';
    doTest();
    
    fltQuery.ignoreTf(false);
    expected.flt.ignore_tf = false;
    doTest();
    
    fltQuery.maxQueryTerms(10);
    expected.flt.max_query_terms = 10;
    doTest();
    
    fltQuery.minSimilarity(0.6);
    expected.flt.min_similarity = 0.6;
    doTest();
    
    fltQuery.prefixLength(4);
    expected.flt.prefix_length = 4;
    doTest();
    
    fltQuery.analyzer('some analyzer');
    expected.flt.analyzer = 'some analyzer';
    doTest();
    
    fltQuery.boost(1.2);
    expected.flt.boost = 1.2;
    doTest();
    
    test.strictEqual(fltQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  CustomBoostFactorQuery: function (test) {
    test.expect(7);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      cbfQuery = ejs.CustomBoostFactorQuery(termQuery),
      expected,
      doTest = function () {
        test.deepEqual(cbfQuery.get(), expected);
      };

    expected = {
      custom_boost_factor: {
        query: termQuery.get()
      }
    };

    test.ok(cbfQuery, 'CustomScoreQuery exists');
    test.ok(cbfQuery.get(), 'get() works');
    doTest();
    
    cbfQuery.query(termQuery2);
    expected.custom_boost_factor.query = termQuery2.get();
    doTest();
    
    cbfQuery.boostFactor(5.1);
    expected.custom_boost_factor.boost_factor = 5.1;
    doTest();
    
    cbfQuery.boost(1.2);
    expected.custom_boost_factor.boost = 1.2;
    doTest();
    
    test.strictEqual(cbfQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  CustomScoreQuery: function (test) {
    test.expect(10);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      customScoreQuery = ejs.CustomScoreQuery(termQuery, 's1'),
      expected,
      doTest = function () {
        test.deepEqual(customScoreQuery.get(), expected);
      };

    expected = {
      custom_score: {
        query: termQuery.get(),
        script: 's1'
      }
    };

    test.ok(customScoreQuery, 'CustomScoreQuery exists');
    test.ok(customScoreQuery.get(), 'get() works');
    doTest();
    
    customScoreQuery.query(termQuery2);
    expected.custom_score.query = termQuery2.get();
    doTest();
    
    customScoreQuery.script('s2');
    expected.custom_score.script = 's2';
    doTest();
    
    customScoreQuery.lang('native');
    expected.custom_score.lang = 'native';
    doTest();
    
    customScoreQuery.boost(1.2);
    expected.custom_score.boost = 1.2;
    doTest();
    
    customScoreQuery.params({p1: 'v1', p2: 'v2'});
    expected.custom_score.params = {p1: 'v1', p2: 'v2'};
    doTest();
    
    customScoreQuery.params({p3: 'v3'});
    expected.custom_score.params = {p3: 'v3'};
    doTest();
    
    test.strictEqual(customScoreQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  IdsQuery: function (test) {
    test.expect(11);

    var idsQuery = ejs.IdsQuery('id1'),
      expected,
      doTest = function () {
        test.deepEqual(idsQuery.get(), expected);
      };

    expected = {
      ids: {
        values: ['id1']
      }
    };

    test.ok(idsQuery, 'IdsQuery exists');
    test.ok(idsQuery.get(), 'get() works');
    doTest();
    
    idsQuery = ejs.IdsQuery(['id2', 'id3']);
    expected.ids.values = ['id2', 'id3'];
    doTest();
    
    idsQuery.values('id4');
    expected.ids.values.push('id4');
    doTest();
    
    idsQuery.values(['id5', 'id6']);
    expected.ids.values = ['id5', 'id6'];
    doTest();
    
    idsQuery.type('type1');
    expected.ids.type = ['type1'];
    doTest();
    
    idsQuery.type('type2');
    expected.ids.type.push('type2');
    doTest();
    
    idsQuery.type(['type3', 'type4']);
    expected.ids.type = ['type3', 'type4'];
    doTest();
    
    idsQuery.boost(0.5);
    expected.ids.boost = 0.5;
    doTest();
    
    test.strictEqual(idsQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  BoostingQuery: function (test) {
    test.expect(8);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      boostingQuery = ejs.BoostingQuery(termQuery1, termQuery2, 0.2),
      expected,
      doTest = function () {
        test.deepEqual(boostingQuery.get(), expected);
      };

    expected = {
      boosting: {
        positive: termQuery1.get(),
        negative: termQuery2.get(),
        negative_boost: 0.2
      }
    };

    test.ok(boostingQuery, 'BoostingQuery exists');
    test.ok(boostingQuery.get(), 'get() works');
    doTest();

    boostingQuery.positive(termQuery2);
    expected.boosting.positive = termQuery2.get();
    doTest();
    
    boostingQuery.negative(termQuery1);
    expected.boosting.negative = termQuery1.get();
    doTest();
    
    boostingQuery.negativeBoost(0.6);
    expected.boosting.negative_boost = 0.6;
    doTest();
    
    boostingQuery.boost(3);
    expected.boosting.boost = 3;
    doTest();
    
    test.strictEqual(boostingQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  MatchQuery: function (test) {
    test.expect(19);

    var matchQuery = ejs.MatchQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(matchQuery.get(), expected);
      };

    expected = {
      match: {
        t1: {
          query: 'v1'
        }
      }
    };

    test.ok(matchQuery, 'MatchQuery exists');
    test.ok(matchQuery.get(), 'get() works');
    doTest();

    matchQuery.boost(1.5);
    expected.match.t1.boost = 1.5;
    doTest();

    matchQuery.query('v2');
    expected.match.t1.query = 'v2';
    doTest();

    matchQuery.type('boolean');
    expected.match.t1.type = 'boolean';
    doTest();

    matchQuery.type('junk');
    doTest();

    matchQuery.type('phrase');
    expected.match.t1.type = 'phrase';
    doTest();

    matchQuery.type('phrase_prefix');
    expected.match.t1.type = 'phrase_prefix';
    doTest();

    matchQuery.type('phrasePrefix');
    expected.match.t1.type = 'phrasePrefix';
    doTest();

    matchQuery.fuzziness(0.5);
    expected.match.t1.fuzziness = 0.5;
    doTest();

    matchQuery.prefixLength(2);
    expected.match.t1.prefix_length = 2;
    doTest();

    matchQuery.maxExpansions(5);
    expected.match.t1.max_expansions = 5;
    doTest();

    matchQuery.operator('and');
    expected.match.t1.operator = 'and';
    doTest();

    matchQuery.operator('junk');
    doTest();

    matchQuery.operator('or');
    expected.match.t1.operator = 'or';
    doTest();

    matchQuery.slop(15);
    expected.match.t1.slop = 15;
    doTest();

    matchQuery.analyzer('the analyzer');
    expected.match.t1.analyzer = 'the analyzer';
    doTest();

    test.strictEqual(matchQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  MultiMatchQuery: function (test) {
    test.expect(22);

    var mmQuery = ejs.MultiMatchQuery(['t1', 't2'], 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(mmQuery.get(), expected);
      };

    expected = {
      multi_match: {
        query: 'v1',
        fields: ['t1', 't2']
      }
    };

    test.ok(mmQuery, 'MultiMatchQuery exists');
    test.ok(mmQuery.get(), 'get() works');
    doTest();

    mmQuery.boost(1.5);
    expected.multi_match.boost = 1.5;
    doTest();

    mmQuery.query('v2');
    expected.multi_match.query = 'v2';
    doTest();

    mmQuery.fields(['f3', 'f4']);
    expected.multi_match.fields = ['f3', 'f4'];
    doTest();
    
    mmQuery.useDisMax(true);
    expected.multi_match.use_dis_max = true;
    doTest();
    
    mmQuery.tieBreaker(0.6);
    expected.multi_match.tie_breaker = 0.6;
    doTest();
    
    mmQuery.type('boolean');
    expected.multi_match.type = 'boolean';
    doTest();

    mmQuery.type('junk');
    doTest();

    mmQuery.type('phrase');
    expected.multi_match.type = 'phrase';
    doTest();

    mmQuery.type('phrase_prefix');
    expected.multi_match.type = 'phrase_prefix';
    doTest();

    mmQuery.type('phrasePrefix');
    expected.multi_match.type = 'phrasePrefix';
    doTest();

    mmQuery.fuzziness(0.5);
    expected.multi_match.fuzziness = 0.5;
    doTest();

    mmQuery.prefixLength(2);
    expected.multi_match.prefix_length = 2;
    doTest();

    mmQuery.maxExpansions(5);
    expected.multi_match.max_expansions = 5;
    doTest();

    mmQuery.operator('and');
    expected.multi_match.operator = 'and';
    doTest();

    mmQuery.operator('junk');
    doTest();

    mmQuery.operator('or');
    expected.multi_match.operator = 'or';
    doTest();

    mmQuery.slop(15);
    expected.multi_match.slop = 15;
    doTest();

    mmQuery.analyzer('the analyzer');
    expected.multi_match.analyzer = 'the analyzer';
    doTest();

    test.strictEqual(mmQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  TermQuery: function (test) {
    test.expect(5);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termQuery.get(), expected);
      };

    expected = {
      term: {
        t1: 'v1'
      }
    };

    test.ok(termQuery, 'TermQuery exists');
    test.ok(termQuery.get(), 'get() works');
    doTest();

    termQuery.boost(1.5);
    expected.term.t1 = {
      value: 'v1',
      boost: 1.5
    };
    doTest();

    test.strictEqual(termQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  BoolQuery: function (test) {
    test.expect(11);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      termQuery3 = ejs.TermQuery('t3', 'v3'),
      termQuery4 = ejs.TermQuery('t4', 'v4'),
      boolQuery = ejs.BoolQuery(),
      expected,
      doTest = function () {
        test.deepEqual(boolQuery.get(), expected);
      };

    expected = {
      bool: {}
    };

    test.ok(boolQuery, 'BoolQuery exists');
    test.ok(boolQuery.get(), 'get() works');
    doTest();

    boolQuery.must(termQuery1);
    expected.bool.must = [termQuery1.get()];
    doTest();

    boolQuery.mustNot(termQuery2);
    expected.bool.mustNot = [termQuery2.get()];
    doTest();

    boolQuery.should(termQuery3);
    expected.bool.should = [termQuery3.get()];
    doTest();

    boolQuery.should(termQuery4);
    expected.bool.should.push(termQuery4.get());
    doTest();

    boolQuery.boost(1.5);
    expected.bool.boost = 1.5;
    doTest();

    boolQuery.disableCoord(false);
    expected.bool.disable_coord = false;
    doTest();

    boolQuery.minimumNumberShouldMatch(2);
    expected.bool.minimum_number_should_match = 2;
    doTest();

    test.strictEqual(boolQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  FieldQuery: function (test) {
    test.expect(18);

    var fieldQuery = ejs.FieldQuery('f1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(fieldQuery.get(), expected);
      };

    expected = {
      field: {
        f1: 'v1'
      }
    };

    test.ok(fieldQuery, 'FieldQuery exists');
    test.ok(fieldQuery.get(), 'get() works');
    doTest();

    fieldQuery.defaultOperator('and');
    expected.field.f1 = {
      query: 'v1'
    };
    expected.field.f1.default_operator = 'AND';
    doTest();

    fieldQuery.defaultOperator('or');
    expected.field.f1.default_operator = 'OR';
    doTest();

    fieldQuery.defaultOperator('invalid');
    doTest();

    fieldQuery.analyzer('someAnalyzer');
    expected.field.f1.analyzer = 'someAnalyzer';
    doTest();

    fieldQuery.autoGeneratePhraseQueries(false);
    expected.field.f1.auto_generate_phrase_queries = false;
    doTest();

    fieldQuery.allowLeadingWildcard(true);
    expected.field.f1.allow_leading_wildcard = true;
    doTest();

    fieldQuery.lowercaseExpandedTerms(false);
    expected.field.f1.lowercase_expanded_terms = false;
    doTest();

    fieldQuery.enablePositionIncrements(true);
    expected.field.f1.enable_position_increments = true;
    doTest();

    fieldQuery.fuzzyMinSim(0.2);
    expected.field.f1.fuzzy_min_sim = 0.2;
    doTest();

    fieldQuery.boost(1.5);
    expected.field.f1.boost = 1.5;
    doTest();

    fieldQuery.fuzzyPrefixLength(4);
    expected.field.f1.fuzzy_prefix_length = 4;
    doTest();

    fieldQuery.phraseSlop(2);
    expected.field.f1.phrase_slop = 2;
    doTest();

    fieldQuery.analyzeWildcard(false);
    expected.field.f1.analyze_wildcard = false;
    doTest();

    fieldQuery.minimumShouldMatch(5);
    expected.field.f1.minimum_should_match = 5;
    doTest();

    test.strictEqual(fieldQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  DisMaxQuery: function (test) {
    test.expect(8);

    var disMaxQuery = ejs.DisMaxQuery(),
      termQuery1 = ejs.TermQuery('t1', 'v1'),
      fieldQuery1 = ejs.FieldQuery('f1', 'v1'),
      boolQuery1 = ejs.BoolQuery(),
      expected,
      doTest = function () {
        test.deepEqual(disMaxQuery.get(), expected);
      };

    expected = {
      dis_max: {}
    };
    termQuery1.boost(1.5);
    boolQuery1.must(termQuery1)
      .boost(2);

    test.ok(disMaxQuery, 'DisMaxQuery exists');
    test.ok(disMaxQuery.get(), 'get() works');
    doTest();

    disMaxQuery.add(fieldQuery1);
    expected.dis_max.queries = [fieldQuery1.get()];
    doTest();

    disMaxQuery.add(boolQuery1);
    expected.dis_max.queries.push(boolQuery1.get());
    doTest();

    disMaxQuery.boost(3);
    expected.dis_max.boost = 3;
    doTest();

    disMaxQuery.tieBreaker(4.4);
    expected.dis_max.tie_breaker = 4.4;
    doTest();

    test.strictEqual(disMaxQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  QueryStringQuery: function (test) {
    test.expect(23);

    var queryString = ejs.QueryStringQuery('this AND that'),
      expected,
      doTest = function () {
        test.deepEqual(queryString.get(), expected);
      };

    expected = {
      query_string: {
        query: 'this AND that'
      }
    };

    test.ok(queryString, 'QueryString exists');
    test.ok(queryString, 'get() works');
    doTest();

    queryString.query('that OR this');
    expected.query_string.query = 'that OR this';
    doTest();

    queryString.defaultField('somefield');
    expected.query_string.default_field = 'somefield';
    doTest();

    queryString.fields(['field1', 'field2']);
    expected.query_string.fields = ['field1', 'field2'];
    doTest();

    queryString.useDisMax(true);
    expected.query_string.use_dis_max = true;
    doTest();

    queryString.defaultOperator('and');
    expected.query_string.default_operator = 'AND';
    doTest();

    queryString.defaultOperator('or');
    expected.query_string.default_operator = 'OR';
    doTest();

    queryString.defaultOperator('junkoperator');
    doTest();

    queryString.analyzer('theanalyzer');
    expected.query_string.analyzer = 'theanalyzer';
    doTest();

    queryString.allowLeadingWildcard(false);
    expected.query_string.allow_leading_wildcard = false;
    doTest();

    queryString.lowercaseExpandedTerms(true);
    expected.query_string.lowercase_expanded_terms = true;
    doTest();

    queryString.enablePositionIncrements(false);
    expected.query_string.enable_position_increments = false;
    doTest();

    queryString.fuzzyPrefixLength(2);
    expected.query_string.fuzzy_prefix_length = 2;
    doTest();

    queryString.fuzzyMinSim(0.6);
    expected.query_string.fuzzy_min_sim = 0.6;
    doTest();

    queryString.phraseSlop(6);
    expected.query_string.phrase_slop = 6;
    doTest();

    queryString.boost(2.3);
    expected.query_string.boost = 2.3;
    doTest();

    queryString.analyzeWildcard(true);
    expected.query_string.analyze_wildcard = true;
    doTest();

    queryString.autoGeneratePhraseQueries(false);
    expected.query_string.auto_generate_phrase_queries = false;
    doTest();

    queryString.minimumShouldMatch(1);
    expected.query_string.minimum_should_match = 1;
    doTest();

    queryString.tieBreaker(1.1);
    expected.query_string.tie_breaker = 1.1;
    doTest();

    test.strictEqual(queryString.toString(), JSON.stringify(expected));

    test.done();
  },
  FilteredQuery: function (test) {
    test.expect(4);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      filterQuery = ejs.FilteredQuery(termQuery1, termFilter1),
      expected,
      doTest = function () {
        test.deepEqual(filterQuery.get(), expected);
      };

    expected = {
      filtered: {
        query: termQuery1.get(),
        filter: termFilter1.get()
      }
    };

    test.ok(filterQuery, 'FilteredQuery exists');
    test.ok(filterQuery.get(), 'get() works');
    doTest();

    test.strictEqual(filterQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  NestedQuery: function (test) {
    test.expect(8);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      nestedQuery = ejs.NestedQuery(),
      expected,
      doTest = function () {
        test.deepEqual(nestedQuery.get(), expected);
      };

    expected = {
      nested: {}
    };

    test.ok(nestedQuery, 'NestedQuery exists');
    test.ok(nestedQuery.get(), 'get() works');
    doTest();

    nestedQuery = ejs.NestedQuery(termQuery1);
    expected.nested.query = termQuery1.get();
    doTest();

    nestedQuery.path('root/path');
    expected.nested.path = 'root/path';
    doTest();

    nestedQuery.scoreMode('avg');
    expected.nested.score_mode = 'avg';
    doTest();

    nestedQuery.query(termQuery2);
    expected.nested.query = termQuery2.get();
    doTest();

    test.strictEqual(nestedQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  ConstantScoreQuery: function (test) {
    test.expect(7);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      constantScoreQuery = ejs.ConstantScoreQuery(),
      expected,
      doTest = function () {
        test.deepEqual(constantScoreQuery.get(), expected);
      };

    expected = {
      constant_score: {}
    };

    test.ok(constantScoreQuery, 'ConstantScoreQuery exists');
    test.ok(constantScoreQuery.get(), 'get() works');
    doTest();

    constantScoreQuery.query(termQuery1);
    expected.constant_score.query = termQuery1.get();
    doTest();

    test.strictEqual(constantScoreQuery.toString(), JSON.stringify(expected));

    constantScoreQuery = ejs.ConstantScoreQuery();
    constantScoreQuery.filter(termFilter1);
    expected = {
      constant_score: {
        filter: termFilter1.get()
      }
    };
    doTest();

    test.strictEqual(constantScoreQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  MatchAllQuery: function (test) {
    test.expect(4);

    var matchAllQuery = ejs.MatchAllQuery(),
      expected,
      doTest = function () {
        test.deepEqual(matchAllQuery.get(), expected);
      };

    expected = {
      match_all: {}
    };

    test.ok(matchAllQuery, 'MatchAllQuery exists');
    test.ok(matchAllQuery.get(), 'get() works');
    doTest();

    test.strictEqual(matchAllQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanTermQuery: function (test) {
    test.expect(5);

    var spanTermQuery = ejs.SpanTermQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(spanTermQuery.get(), expected);
      };

    expected = {
      span_term: {
        t1: 'v1'
      }
    };

    test.ok(spanTermQuery, 'SpanTermQuery exists');
    test.ok(spanTermQuery.get(), 'get() works');
    doTest();

    spanTermQuery.boost(1.5);
    expected.span_term.t1 = {
      value: 'v1',
      boost: 1.5
    };
    doTest();

    test.strictEqual(spanTermQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanNearQuery: function (test) {
    test.expect(10);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanTermQuery3 = ejs.SpanTermQuery('t3', 'v3'),
      spanTermQuery4 = ejs.SpanTermQuery('t4', 'v4'),
      spanNearQuery = ejs.SpanNearQuery([spanTermQuery3, spanTermQuery4]),
      expected,
      doTest = function () {
        test.deepEqual(spanNearQuery.get(), expected);
      };

    expected = {
      span_near: {
        clauses: [{
          span_term: {
            t3: 'v3'
          }
        }, {
          span_term: {
            t4: 'v4'
          }
        }]
      }
    };

    test.ok(spanNearQuery, 'SpanNearQuery exists');
    test.ok(spanNearQuery.get(), 'get() works');
    doTest();

    spanNearQuery.addClause(spanTermQuery1);
    expected.span_near.clauses.push({
      span_term: {
        t1: 'v1'
      }
    });
    doTest();

    spanNearQuery.addClause(spanTermQuery2);
    expected.span_near.clauses.push({
      span_term: {
        t2: 'v2'
      }
    });
    doTest();

    spanNearQuery.slop(3);
    expected.span_near.slop = 3;
    doTest();

    spanNearQuery.inOrder(true);
    expected.span_near.in_order = true;
    doTest();

    spanNearQuery.collectPayloads(false);
    expected.span_near.collect_payloads = false;
    doTest();

    spanNearQuery.clauses([spanTermQuery3, spanTermQuery4]);
    expected.span_near.clauses = [];
    expected.span_near.clauses.push({
      span_term: {
        t3: 'v3'
      }
    });
    expected.span_near.clauses.push({
      span_term: {
        t4: 'v4'
      }
    });
    doTest();

    test.strictEqual(spanNearQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanNotQuery: function (test) {
    test.expect(6);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanNotQuery = ejs.SpanNotQuery(),
      expected,
      doTest = function () {
        test.deepEqual(spanNotQuery.get(), expected);
      };

    expected = {
      span_not: {}
    };

    test.ok(spanNotQuery, 'SpanNotQuery exists');
    test.ok(spanNotQuery.get(), 'get() works');
    doTest();

    spanNotQuery.include(spanTermQuery1);
    expected.span_not.include = {
      span_term: {
        t1: 'v1'
      }
    };
    doTest();

    spanNotQuery.exclude(spanTermQuery2);
    expected.span_not.exclude = {
      span_term: {
        t2: 'v2'
      }
    };
    doTest();

    test.strictEqual(spanNotQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanOrQuery: function (test) {
    test.expect(6);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanTermQuery3 = ejs.SpanTermQuery('t3', 'v3'),
      spanTermQuery4 = ejs.SpanTermQuery('t4', 'v4'),
      spanTermQuery5 = ejs.SpanTermQuery('t5', 'v5'),
      spanOrQuery = ejs.SpanOrQuery([spanTermQuery4, spanTermQuery5]),
      expected,
      doTest = function () {
        test.deepEqual(spanOrQuery.get(), expected);
      };

    expected = {
      span_or: {
        clauses: [{
          span_term: {
            t4: 'v4'
          }
        }, {
          span_term: {
            t5: 'v5'
          }
        }]
      }
    };

    test.ok(spanOrQuery, 'SpanOrQuery exists');
    test.ok(spanOrQuery.get(), 'get() works');
    doTest();

    spanOrQuery.addClause(spanTermQuery3);
    expected.span_or.clauses.push({
      span_term: {
        t3: 'v3'
      }
    });
    doTest();

    spanOrQuery.clauses([spanTermQuery1, spanTermQuery2]);
    expected.span_or.clauses = [];
    expected.span_or.clauses.push({
      span_term: {
        t1: 'v1'
      }
    });
    expected.span_or.clauses.push({
      span_term: {
        t2: 'v2'
      }
    });
    doTest();

    test.strictEqual(spanOrQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanFirstQuery: function (test) {
    test.expect(6);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanFirstQuery = ejs.SpanFirstQuery(),
      expected,
      doTest = function () {
        test.deepEqual(spanFirstQuery.get(), expected);
      };

    expected = {
      span_first: {}
    };

    test.ok(spanFirstQuery, 'SpanFirstQuery exists');
    test.ok(spanFirstQuery.get(), 'get() works');
    doTest();

    spanFirstQuery.match(spanTermQuery1);
    expected.span_first.match = {
      span_term: {
        t1: 'v1'
      }
    };
    doTest();

    spanFirstQuery.end(5);
    expected.span_first.end = 5;
    doTest();

    test.strictEqual(spanFirstQuery.toString(), JSON.stringify(expected));

    test.done();
  }
};
