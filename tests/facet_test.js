/*global require:true */
'use strict';

var ejs = require('../dist/elastic.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.facets = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(9);

    test.ok(ejs.TermsFacet, 'TermsFacet');
    test.ok(ejs.DateHistogramFacet, 'DateHistogramFacet');
    test.ok(ejs.GeoDistanceFacet, 'GeoDistanceFacet');
    test.ok(ejs.StatisticalFacet, 'StatisticalFacet');
    test.ok(ejs.TermStatsFacet, 'TermStatsFacet');
    test.ok(ejs.QueryFacet, 'QueryFacet');
    test.ok(ejs.FilterFacet, 'FilterFacet');
    test.ok(ejs.HistogramFacet, 'HistogramFacet');
    test.ok(ejs.RangeFacet, 'RangeFacet');

    test.done();
  },
  TermsFacet: function (test) {
    test.expect(8);

    var termFacet = ejs.TermsFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termFacet._self(), expected);
      };

    expected = {
      somename: {
        terms: {}
      }
    };

    test.ok(termFacet, 'TermsFacet exists');
    test.ok(termFacet._self(), '_self() works');
    doTest();

    termFacet.field('thefield');
    expected.somename.terms.field = 'thefield';
    doTest();

    termFacet.size(2);
    expected.somename.terms.size = 2;
    doTest();

    termFacet.order('count');
    expected.somename.terms.order = 'count';
    doTest();

    termFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    termFacet.allTerms(false);
    expected.somename.terms.all_terms = false;
    doTest();

    test.done();
  },
  GeoDistanceFacet: function (test) {
    test.expect(10);

    var geoDistanceFacet = ejs.GeoDistanceFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(geoDistanceFacet._self(), expected);
      };

    expected = {
      somename: {
        'geo_distance': {
          'distance_unit': "mi",
          'ranges': []
        }
      }
    };

    test.ok(geoDistanceFacet, 'geoDistanceFacet exists');
    test.ok(geoDistanceFacet._self(), '_self() works');
    doTest();

    geoDistanceFacet.pointField('location');
    expected.somename.geo_distance['location'] = [0, 0];
    doTest();

    geoDistanceFacet.point(40, - 70);
    expected.somename.geo_distance['location'] = [40, - 70];
    doTest();

    geoDistanceFacet.addUnboundedTo(10);
    expected.somename.geo_distance.ranges.push({
      "to": 10
    });
    doTest();

    geoDistanceFacet.addRange(10, 20);
    expected.somename.geo_distance.ranges.push({
      "from": 10,
      "to": 20
    });
    doTest();

    geoDistanceFacet.addRange(20, 30);
    expected.somename.geo_distance.ranges.push({
      "from": 20,
      "to": 30
    });
    doTest();

    geoDistanceFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    geoDistanceFacet.addUnboundedFrom(30);
    expected.somename.geo_distance.ranges.push({
      "from": 30
    });
    doTest();

    test.done();
  },
  StatisticalFacet: function (test) {
    test.expect(7);

    var statisticalFacet = ejs.StatisticalFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(statisticalFacet._self(), expected);
      };

    expected = {
      somename: {
        'statistical': {}
      }
    };

    test.ok(statisticalFacet, 'statisticalFacet exists');
    test.ok(statisticalFacet._self(), '_self() works');
    doTest();

    statisticalFacet.lang('js');
    expected.somename.statistical.lang = 'js';
    doTest();

    statisticalFacet.script('(_source.x + _source.y) * factor');
    expected.somename.statistical.script = '(_source.x + _source.y) * factor';
    doTest();

    statisticalFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    statisticalFacet.params({
      factor: 5
    });
    expected.somename.statistical.params = {
      "factor": 5
    };
    doTest();

    test.done();
  },
  TermStatsFacet: function (test) {
    test.expect(8);

    var termStatsFacet = ejs.TermStatsFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termStatsFacet._self(), expected);
      };

    expected = {
      somename: {
        'terms_stats': {}
      }
    };

    test.ok(termStatsFacet, 'termStatsFacet exists');
    test.ok(termStatsFacet._self(), '_self() works');
    doTest();

    termStatsFacet.keyField('product');
    expected.somename.terms_stats.key_field = 'product';
    doTest();

    termStatsFacet.valueField('quantity');
    expected.somename.terms_stats.value_field = 'quantity';
    doTest();

    termStatsFacet.order("total");
    expected.somename.terms_stats.order = "total";
    doTest();

    termStatsFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    termStatsFacet.size(5);
    expected.somename.terms_stats.size = 5;
    doTest();

    test.done();
  },
  DateHistogramFacet: function (test) {
    test.expect(24);

    var dateHistogramFacet = ejs.DateHistogramFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(dateHistogramFacet._self(), expected);
      };

    expected = {
      somename: {
        date_histogram: {}
      }
    };

    test.ok(dateHistogramFacet, 'dateHistogramFacet exists');
    test.ok(dateHistogramFacet._self(), '_self() works');
    doTest();

    dateHistogramFacet.field('pubdate');
    expected.somename.date_histogram.field = 'pubdate';
    doTest();

    dateHistogramFacet.interval('year');
    expected.somename.date_histogram.interval = 'year';
    doTest();

    dateHistogramFacet.facetFilter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    dateHistogramFacet.timeZone(5);
    expected.somename.date_histogram.time_zone = 5;
    doTest();

    dateHistogramFacet.keyField('pubdatekeys');
    expected.somename.date_histogram.key_field = 'pubdatekeys';
    doTest();
    
    dateHistogramFacet.valueField('pubdatevalues');
    expected.somename.date_histogram.value_field = 'pubdatevalues';
    doTest();
    
    dateHistogramFacet.preZone(-8);
    expected.somename.date_histogram.pre_zone = -8;
    doTest();
    
    dateHistogramFacet.preZoneAdjustLargeInterval(true);
    expected.somename.date_histogram.pre_zone_adjust_large_interval = true;
    doTest();
    
    dateHistogramFacet.postZone(-5);
    expected.somename.date_histogram.post_zone = -5;
    doTest();
    
    dateHistogramFacet.preOffset('1h');
    expected.somename.date_histogram.pre_offset = '1h';
    doTest();
    
    dateHistogramFacet.postOffset('2d');
    expected.somename.date_histogram.post_offset = '2d';
    doTest();
    
    dateHistogramFacet.factor(1000);
    expected.somename.date_histogram.factor = 1000;
    doTest();
    
    dateHistogramFacet.valueScript('script');
    expected.somename.date_histogram.value_script = 'script';
    doTest();
    
    dateHistogramFacet.order('time');
    expected.somename.date_histogram.order = 'time';
    doTest();
    
    dateHistogramFacet.order('INVALID');
    doTest();
    
    dateHistogramFacet.order('COUNT');
    expected.somename.date_histogram.order = 'count';
    doTest();
    
    dateHistogramFacet.order('Total');
    expected.somename.date_histogram.order = 'total';
    doTest();
    
    dateHistogramFacet.lang('mvel');
    expected.somename.date_histogram.lang = 'mvel';
    doTest();
    
    test.strictEqual(dateHistogramFacet._type(), 'facet');
    test.strictEqual(dateHistogramFacet.toString(), JSON.stringify(expected));
    
    test.throws(function () {
      dateHistogramFacet.facetFilter('invalid');
    }, TypeError);
    
    test.done();
  },
  QueryFacet: function (test) {
    test.expect(5);

    var queryFacet = ejs.QueryFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      termQuery = ejs.TermQuery('t2', 'v2'),
      expected,
      doTest = function () {
        test.deepEqual(queryFacet._self(), expected);
      };

    expected = {
      somename: {}
    };

    test.ok(queryFacet, 'QueryFacet exists');
    test.ok(queryFacet._self(), '_self() works');
    doTest();

    queryFacet.query(termQuery);
    expected.somename.query = termQuery._self();
    doTest();

    queryFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    test.done();
  },
  FilterFacet: function (test) {
    test.expect(8);

    var filterFacet = ejs.FilterFacet('somename'),
      termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      expected,
      doTest = function () {
        test.deepEqual(filterFacet._self(), expected);
      };

    expected = {
      somename: {}
    };

    test.ok(filterFacet, 'FilterFacet exists');
    test.ok(filterFacet._self(), '_self() works');
    doTest();

    filterFacet.filter(termFilter1);
    expected.somename.filter = termFilter1._self();
    doTest();

    filterFacet.facetFilter(termFilter2);
    expected.somename.facet_filter = termFilter2._self();
    doTest();

    test.strictEqual(filterFacet.toString(), JSON.stringify(expected));
    
    test.throws(function () {
      filterFacet.filter('invalid');
    }, TypeError);
    
    test.throws(function () {
      filterFacet.facetFilter('invalid');
    }, TypeError);
    
    test.done();
  },
  HistogramFacet: function (test) {
    test.expect(6);

    var histogramFacet = ejs.HistogramFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(histogramFacet._self(), expected);
      };

    expected = {
      somename: {
        'histogram': {}
      }
    };

    test.ok(histogramFacet, 'HistogramFacet exists');
    test.ok(histogramFacet._self(), '_self() works');
    doTest();

    histogramFacet.field('price');
    expected.somename.histogram.field = 'price';
    doTest();

    histogramFacet.interval(100);
    expected.somename.histogram.interval = 100;
    doTest();

    histogramFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    test.done();
  },
  RangeFacet: function (test) {
    test.expect(9);

    var rangeFacet = ejs.RangeFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(rangeFacet._self(), expected);
      };

    expected = {
      somename: {
        'range': {
          'ranges': []
        }
      }
    };

    test.ok(rangeFacet, 'RangeFacet exists');
    test.ok(rangeFacet._self(), '_self() works');
    doTest();

    rangeFacet.field('price');
    expected.somename.range.field = 'price';
    doTest();

    rangeFacet.addUnboundedTo(10);
    expected.somename.range.ranges.push({
      "to": 10
    });
    doTest();

    rangeFacet.addRange(10, 20);
    expected.somename.range.ranges.push({
      "from": 10,
      "to": 20
    });
    doTest();

    rangeFacet.addRange(20, 30);
    expected.somename.range.ranges.push({
      "from": 20,
      "to": 30
    });
    doTest();

    rangeFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter._self();
    doTest();

    rangeFacet.addUnboundedFrom(30);
    expected.somename.range.ranges.push({
      "from": 30
    });
    doTest();

    test.done();
  }
};
