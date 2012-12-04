/*global require:true */
'use strict';

var ejs = require('../dist/elastic.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.test.expect(numAssertions)
    test.done()
  Test assertions:
    test.test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.test.deepEqual(actual, expected, [message])
    test.nottest.deepEqual(actual, expected, [message])
    test.test.strictEqual(actual, expected, [message])
    test.nottest.strictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.filters = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(17);

    test.ok(ejs.LimitFilter, 'LimitFilter');
    test.ok(ejs.IdsFilter, 'IdsFilter');
    test.ok(ejs.BoolFilter, 'BoolFilter');
    test.ok(ejs.GeoShapeFilter, 'GeoShapeFilter');
    test.ok(ejs.TermFilter, 'TermFilter');
    test.ok(ejs.TypeFilter, 'TypeFilter');
    test.ok(ejs.NotFilter, 'NotFilter');
    test.ok(ejs.AndFilter, 'AndFilter');
    test.ok(ejs.NumericRangeFilter, 'NumericRangeFilter');
    test.ok(ejs.GeoPolygonFilter, 'GeoPolygonFilter');
    test.ok(ejs.GeoBboxFilter, 'GeoBboxFilter');
    test.ok(ejs.GeoDistanceFilter, 'GeoDistanceFilter');
    test.ok(ejs.GeoDistanceRangeFilter, 'GeoDistanceRangeFilter');
    test.ok(ejs.ExistsFilter, 'ExistsFilter');
    test.ok(ejs.PrefixFilter, 'PrefixFilter');
    test.ok(ejs.MissingFilter, 'MissingFilter');
    test.ok(ejs.OrFilter, 'OrFilter');

    test.done();
  },
  LimitFilter: function (test) {
    test.expect(5);

    var limitFilter = ejs.LimitFilter(100),
      expected,
      doTest = function () {
        test.deepEqual(limitFilter.get(), expected);
      };

    expected = {
      limit: {
        value: 100
      }
    };

    test.ok(limitFilter, 'LimitFilter exists');
    test.ok(limitFilter.get(), 'get() works');
    doTest();
    
    limitFilter.value(1000);
    expected.limit.value = 1000;
    doTest();

    test.strictEqual(limitFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  IdsFilter: function (test) {
    test.expect(11);

    var idsFilter = ejs.IdsFilter('id1'),
      expected,
      doTest = function () {
        test.deepEqual(idsFilter.get(), expected);
      };

    expected = {
      ids: {
        values: ['id1']
      }
    };

    test.ok(idsFilter, 'IdsFilter exists');
    test.ok(idsFilter.get(), 'get() works');
    doTest();
    
    idsFilter = ejs.IdsFilter(['id2', 'id3']);
    expected.ids.values = ['id2', 'id3'];
    doTest();
    
    idsFilter.values('id4');
    expected.ids.values.push('id4');
    doTest();
    
    idsFilter.values(['id5', 'id6']);
    expected.ids.values = ['id5', 'id6'];
    doTest();
    
    idsFilter.type('type1');
    expected.ids.type = ['type1'];
    doTest();
    
    idsFilter.type('type2');
    expected.ids.type.push('type2');
    doTest();
    
    idsFilter.type(['type3', 'type4']);
    expected.ids.type = ['type3', 'type4'];
    doTest();
    
    idsFilter.name('idsfilter');
    expected.ids._name = 'idsfilter';
    doTest();
    
    test.strictEqual(idsFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  BoolFilter: function (test) {
    test.expect(11);

    var termFilter = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      termFilter3 = ejs.TermFilter('t3', 'v3'),
      termFilter4 = ejs.TermFilter('t4', 'v4'),
      boolFilter = ejs.BoolFilter(),
      expected,
      doTest = function () {
        test.deepEqual(boolFilter.get(), expected);
      };

    expected = {
      bool: {}
    };

    test.ok(boolFilter, 'BoolFilter exists');
    test.ok(boolFilter.get(), 'get() works');
    doTest();

    boolFilter.must(termFilter);
    expected.bool.must = [termFilter.get()];
    doTest();

    boolFilter.mustNot(termFilter2);
    expected.bool.must_not = [termFilter2.get()];
    doTest();

    boolFilter.should(termFilter3);
    expected.bool.should = [termFilter3.get()];
    doTest();

    boolFilter.should(termFilter4);
    expected.bool.should.push(termFilter4.get());
    doTest();

    boolFilter.name('boolfilter');
    expected.bool._name = 'boolfilter';
    doTest();
    
    boolFilter.cache(true);
    expected.bool._cache = true;
    doTest();
    
    boolFilter.cacheKey('testkey');
    expected.bool._cache_key = 'testkey';
    doTest();
    
    test.strictEqual(boolFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoShapeFilter: function (test) {
    test.expect(16);

    var geoShapeFilter = ejs.GeoShapeFilter('f1'),
      shape1 = ejs.Shape('envelope', [[-45.0, 45.0], [45.0, -45.0]]),
      shape2 = ejs.Shape('polygon', [[-180.0, 10.0], [20.0, 90.0], 
        [180.0, -5.0], [-30.0, -90.0]]),
      iShape1 = ejs.IndexedShape('countries', 'New Zealand'),
      iShape2 = ejs.IndexedShape('state', 'CA')
        .index('states')
        .shapeFieldName('stateShape'),
      expected,
      doTest = function () {
        test.deepEqual(geoShapeFilter.get(), expected);
      };

    expected = {
      geo_shape: {
        f1: {}
      }
    };

    test.ok(geoShapeFilter, 'GeoShapeFilter exists');
    test.ok(geoShapeFilter.get(), 'get() works');
    doTest();

    geoShapeFilter.shape(shape1);
    expected.geo_shape.f1.shape = shape1.get();
    doTest();
    
    geoShapeFilter.field('f2');
    expected = {
      geo_shape: {
        f2: {
          shape: shape1.get()
        }
      }
    };
    doTest();
    
    geoShapeFilter.shape(shape2);
    expected.geo_shape.f2.shape = shape2.get();
    doTest();
    
    geoShapeFilter.relation('intersects');
    expected.geo_shape.f2.relation = 'intersects';
    doTest();
    
    geoShapeFilter.relation('INVALID');
    doTest();
    
    geoShapeFilter.relation('DisJoint');
    expected.geo_shape.f2.relation = 'disjoint';
    doTest();
    
    geoShapeFilter.relation('WITHIN');
    expected.geo_shape.f2.relation = 'within';
    doTest();
    
    geoShapeFilter.indexedShape(iShape1);
    delete expected.geo_shape.f2.shape;
    expected.geo_shape.f2.indexed_shape = iShape1.get();
    doTest();
    
    geoShapeFilter.indexedShape(iShape2);
    expected.geo_shape.f2.indexed_shape = iShape2.get();
    doTest();
    
    
    geoShapeFilter.cache(true);
    expected.geo_shape.f2._cache = true;
    doTest();
    
    geoShapeFilter.name('geofiltername');
    expected.geo_shape.f2._name = 'geofiltername';
    doTest();
    
    geoShapeFilter.cacheKey('test_key');
    expected.geo_shape.f2._cache_key = 'test_key';
    doTest();
    
    test.strictEqual(geoShapeFilter.toString(), JSON.stringify(expected));
    
    test.done();
  },
  TermFilter: function (test) {
    test.expect(6);

    var termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termFilter.get(), expected);
      };

    expected = {
      term: {
        t1: 'v1'
      }
    };

    test.ok(termFilter, 'TermFilter exists');
    test.ok(termFilter.get(), 'get() works');
    test.strictEqual(termFilter.key(), 't1');
    test.strictEqual(termFilter.value(), 'v1');
    doTest();

    test.strictEqual(termFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  TypeFilter: function (test) {
    test.expect(5);

    var typeFilter = ejs.TypeFilter('type1'),
      expected,
      doTest = function () {
        test.deepEqual(typeFilter.get(), expected);
      };

    expected = {
      type: {
        value: 'type1'
      }
    };

    test.ok(typeFilter, 'TypeFilter exists');
    test.ok(typeFilter.get(), 'get() works');
    doTest();

    typeFilter.type('type2');
    expected.type.value = 'type2';
    doTest();

    test.strictEqual(typeFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoPolygonFilter: function (test) {
    test.expect(4);

    var geoPolygonFilter = ejs.GeoPolygonFilter('location').points([
      [-122.396480, 37.7819288],
      [-122.396181, 37.7817289]
    ]),
      expected,
      doTest = function () {
        test.deepEqual(geoPolygonFilter.get(), expected);
      };

    expected = {
      geo_polygon: {
        'location': {
          "points": [
            [-122.396480, 37.7819288],
            [-122.396181, 37.7817289]
          ]
        }
      }
    };

    test.ok(geoPolygonFilter, 'GeoPolygonFilter exists');
    test.ok(geoPolygonFilter.get(), 'get() works');
    doTest();

    test.strictEqual(geoPolygonFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoBboxFilter: function (test) {
    test.expect(4);

    var geoBboxFilter = ejs.GeoBboxFilter('location')
      .topLeft(-122.396480, 37.7819288)
      .bottomRight(-122.396181, 37.7817289),
      expected,
      doTest = function () {
        test.deepEqual(geoBboxFilter.get(), expected);
      };

    expected = {
      geo_bounding_box: {
        'location': {
          "top_left": [-122.396480, 37.7819288],
          "bottom_right": [-122.396181, 37.7817289]
        }
      }
    };

    test.ok(geoBboxFilter, 'GeoBboxFilter exists');
    test.ok(geoBboxFilter.get(), 'get() works');
    doTest();

    test.strictEqual(geoBboxFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoDistanceFilter: function (test) {
    test.expect(4);

    var geoDistanceFilter = ejs.GeoDistanceFilter('location')
      .distance(10)
      .point(-122.396480, 37.7819288),
      expected,
      doTest = function () {
        test.deepEqual(geoDistanceFilter.get(), expected);
      };

    expected = {
      geo_distance: {
        "distance_unit": "mi",
        "distance": 10,
        "location": [-122.396480, 37.7819288]
      }
    };

    test.ok(geoDistanceFilter, 'GeoDistanceFilter exists');
    test.ok(geoDistanceFilter.get(), 'get() works');
    doTest();

    test.strictEqual(geoDistanceFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoDistanceRangeFilter: function (test) {
    test.expect(4);

    var geoDistanceRangeFilter = ejs.GeoDistanceRangeFilter('location')
      .from(10)
      .to(20)
      .point(-122.396480, 37.7819288),
      expected,
      doTest = function () {
        test.deepEqual(geoDistanceRangeFilter.get(), expected);
      };

    expected = {
      geo_distance_range: {
        "distance_unit": "mi",
        "from": 10,
        "to": 20,
        "location": [-122.396480, 37.7819288]
      }
    };

    test.ok(geoDistanceRangeFilter, 'GeoDistanceFilter exists');
    test.ok(geoDistanceRangeFilter.get(), 'get() works');
    doTest();

    test.strictEqual(geoDistanceRangeFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  NotFilter: function (test) {
    test.expect(5);

    var termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      notFilter = ejs.NotFilter(termFilter1),
      expected,
      doTest = function () {
        test.deepEqual(notFilter.get(), expected);
      };

    expected = {
      not: termFilter1.get()
    };

    test.ok(notFilter, 'NotFilter exists');
    test.ok(notFilter.get(), 'get() works');
    doTest();

    notFilter.filter(termFilter2);
    expected.not = termFilter2.get();
    doTest();

    test.strictEqual(notFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  AndFilter: function (test) {
    test.expect(5);

    var termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      termFilter3 = ejs.TermFilter('t3', 'v3'),
      andFilter = ejs.AndFilter([termFilter1, termFilter2]),
      expected,
      doTest = function () {
        test.deepEqual(andFilter.get(), expected);
      };

    expected = {
      and: [termFilter1.get(), termFilter2.get()]
    };

    test.ok(andFilter, 'AndFilter exists');
    test.ok(andFilter.get(), 'get() works');
    doTest();

    andFilter.add(termFilter3);
    expected.and.push(termFilter3.get());
    doTest();

    test.strictEqual(andFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  NumericRangeFilter: function (test) {
    test.expect(11);

    var numericRangeFilter = ejs.NumericRangeFilter('f1'),
      expected,
      start = new Date(1230768000000),
      end = new Date(start.getTime()),
      doTest = function () {
        test.deepEqual(numericRangeFilter.get(), expected);
      };

    expected = {
      numeric_range: {
        f1: {}
      }
    };
    end.setFullYear(start.getFullYear() + 1);

    test.ok(numericRangeFilter, 'NumericRangeFilter exists');
    test.ok(numericRangeFilter.get(), 'get() works');
    test.strictEqual(numericRangeFilter.field(), 'f1');
    test.strictEqual(numericRangeFilter.from(), '-1');
    test.strictEqual(numericRangeFilter.to(), '-1');
    doTest();

    numericRangeFilter.from(start.getTime());
    expected.numeric_range.f1.from = start.getTime();
    test.strictEqual(numericRangeFilter.from(), JSON.stringify(start.getTime()));
    doTest();

    numericRangeFilter.to(end.getTime());
    expected.numeric_range.f1.to = end.getTime();
    test.strictEqual(numericRangeFilter.to(), JSON.stringify(end.getTime()));
    doTest();

    test.strictEqual(numericRangeFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  ExistsFilter: function (test) {
    test.expect(4);

    var existsFilter = ejs.ExistsFilter('title'),
      expected,
      doTest = function () {
        test.deepEqual(existsFilter.get(), expected);
      };

    expected = {
      exists: {
        field: 'title'
      }
    };

    test.ok(existsFilter, 'ExistsFilter exists');
    test.ok(existsFilter.get(), 'get() works');
    doTest();

    test.strictEqual(existsFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  PrefixFilter: function (test) {
    test.expect(4);

    var prefixFilter = ejs.PrefixFilter('title').prefix('th'),
      expected,
      doTest = function () {
        test.deepEqual(prefixFilter.get(), expected);
      };

    expected = {
      prefix: {
        title: 'th'
      }
    };

    test.ok(prefixFilter, 'PrefixFilter exists');
    test.ok(prefixFilter.get(), 'get() works');
    doTest();

    test.strictEqual(prefixFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  MissingFilter: function (test) {
    test.expect(4);

    var missingFilter = ejs.MissingFilter('title'),
      expected,
      doTest = function () {
        test.deepEqual(missingFilter.get(), expected);
      };

    expected = {
      missing: {
        field: 'title'
      }
    };

    test.ok(missingFilter, 'MissingFilter exists');
    test.ok(missingFilter.get(), 'get() works');
    doTest();

    test.strictEqual(missingFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  OrFilter: function (test) {
    test.expect(5);

    var termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      termFilter3 = ejs.TermFilter('t3', 'v3'),
      orFilter = ejs.OrFilter([termFilter1, termFilter2]),
      expected,
      doTest = function () {
        test.deepEqual(orFilter.get(), expected);
      };

    expected = {
      or: [termFilter1.get(), termFilter2.get()]
    };

    test.ok(orFilter, 'OrFilter exists');
    test.ok(orFilter.get(), 'get() works');
    doTest();

    orFilter.add(termFilter3);
    expected.or.push(termFilter3.get());
    doTest();

    test.strictEqual(orFilter.toString(), JSON.stringify(expected));

    test.done();
  }
};
