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

exports.cluster = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(2);

    test.ok(ejs.ClusterHealth, 'ClusterHealth');
    test.ok(ejs.ClusterState, 'ClusterState');
    
    test.done();
  },
  ClusterHealth: function (test) {
    test.expect(56);

    var cluster = ejs.ClusterHealth(),
      expected,
      mockClient,
      expectedPath = '',
      expectedData = '',
      expectedMethod = '',
      doTest = function (method, path, data, cb) {
        if (expectedPath !== '') {
          test.strictEqual(path, expectedPath);
          expectedPath = '';
        }
        
        if (expectedData !== '') {
          test.deepEqual(data, expectedData);
          expectedData = '';
        }
        
        if (expectedMethod !== '') {
          test.strictEqual(method, expectedMethod);
          expectedMethod = '';
        }
        
        test.deepEqual(cluster._self(), expected);
      };

    // setup fake client to call doTest
    ejs.client = mockClient = {
      get: function (path, data, cb) {
        doTest('get', path, data, cb);
      },
      post: function (path, data, cb) {
        doTest('post', path, data, cb);
      },
      put: function (path, data, cb) {
        doTest('put', path, data, cb);
      },
      del: function (path, data, cb) {
        doTest('delete', path, data, cb);
      },
      head: function (path, data, cb) {
        doTest('head', path, data, cb);
      }
    };
    
    expected = {};
    
    test.ok(cluster, 'ClusterHealth exists');
    test.ok(cluster._self(), '_self() works');
    doTest();
    
    cluster.indices('i1');
    expected.indices = ['i1'];
    test.deepEqual(cluster.indices(), ['i1']);
    doTest();
    
    cluster.indices('i2');
    expected.indices.push('i2');
    test.deepEqual(cluster.indices(), ['i1', 'i2']);
    doTest();
    
    cluster.indices(['i3', 'i4']);
    expected.indices = ['i3', 'i4'];
    test.deepEqual(cluster.indices(), ['i3', 'i4']);
    doTest();
    
    cluster.local(true);
    expected.local = true;
    test.strictEqual(cluster.local(), true);
    doTest();
    
    cluster.masterTimeout(10000);
    expected.master_timeout = 10000;
    test.strictEqual(cluster.masterTimeout(), 10000);
    doTest();
    
    cluster.timeout(10000);
    expected.timeout = 10000;
    test.strictEqual(cluster.timeout(), 10000);
    doTest();
    
    cluster.waitForStatus('green');
    expected.wait_for_status = 'green';
    test.strictEqual(cluster.waitForStatus(), 'green');
    doTest();
    
    cluster.waitForStatus('INVALID');
    test.strictEqual(cluster.waitForStatus(), 'green');
    doTest();
    
    cluster.waitForStatus('YELLOW');
    expected.wait_for_status = 'yellow';
    test.strictEqual(cluster.waitForStatus(), 'yellow');
    doTest();
    
    cluster.waitForStatus('Red');
    expected.wait_for_status = 'red';
    test.strictEqual(cluster.waitForStatus(), 'red');
    doTest();
    
    cluster.waitForRelocatingShards(1);
    expected.wait_for_relocating_shards = 1;
    test.strictEqual(cluster.waitForRelocatingShards(), 1);
    doTest();
    
    cluster.waitForActiveShards(5);
    expected.wait_for_active_shards = 5;
    test.strictEqual(cluster.waitForActiveShards(), 5);
    doTest();
    
    cluster.waitForNodes('>2');
    expected.wait_for_nodes = '>2';
    test.strictEqual(cluster.waitForNodes(), '>2');
    doTest();
    
    cluster.level('cluster');
    expected.level = 'cluster';
    test.strictEqual(cluster.level(), 'cluster');
    doTest();
    
    cluster.level('INVALID');
    test.strictEqual(cluster.level(), 'cluster');
    doTest();
    
    cluster.level('INDICES');
    expected.level = 'indices';
    test.strictEqual(cluster.level(), 'indices');
    doTest();
    
    cluster.level('Shards');
    expected.level = 'shards';
    test.strictEqual(cluster.level(), 'shards');
    doTest();
    
    test.strictEqual(cluster._type(), 'cluster health');
    test.strictEqual(cluster.toString(), JSON.stringify(expected));
   
    cluster = ejs.ClusterHealth();
    expected = {};
    expectedMethod = 'get';
    expectedData = {};
    expectedPath = '/_cluster/health';
    cluster.doHealth();
    
    cluster = cluster.indices(['test1', 'test2']);
    expected.indices = ['test1', 'test2'];
    expectedData = {};
    expectedPath = '/_cluster/health/test1,test2';
    cluster.doHealth();
    
    cluster.indices([]).waitForStatus('yellow').timeout('50s');
    expected.indices = [];
    expected.wait_for_status = 'yellow';
    expected.timeout = '50s';
    expectedData = {wait_for_status: 'yellow', timeout: '50s'};
    expectedPath = '/_cluster/health';
    cluster.doHealth();

    cluster = ejs.ClusterHealth().level('shards');
    expected = {level: 'shards'};
    expectedData = {level: 'shards'};
    expectedPath = '/_cluster/health';
    cluster.doHealth();
    
    cluster.indices('twitter');
    expected.indices = ['twitter'];
    expectedData = {level: 'shards'};
    expectedPath = '/_cluster/health/twitter';
    cluster.doHealth(); 
    
    test.throws(function () {
      cluster.indices(3);
    }, Error, 'Indices must be string or array');
    
    test.done();
  },
  ClusterState: function (test) {
    test.expect(38);

    var cluster = ejs.ClusterState(),
      expected,
      mockClient,
      expectedPath = '',
      expectedData = '',
      expectedMethod = '',
      doTest = function (method, path, data, cb) {
        if (expectedPath !== '') {
          test.strictEqual(path, expectedPath);
          expectedPath = '';
        }
        
        if (expectedData !== '') {
          test.deepEqual(data, expectedData);
          expectedData = '';
        }
        
        if (expectedMethod !== '') {
          test.strictEqual(method, expectedMethod);
          expectedMethod = '';
        }
        
        test.deepEqual(cluster._self(), expected);
      };

    // setup fake client to call doTest
    ejs.client = mockClient = {
      get: function (path, data, cb) {
        doTest('get', path, data, cb);
      },
      post: function (path, data, cb) {
        doTest('post', path, data, cb);
      },
      put: function (path, data, cb) {
        doTest('put', path, data, cb);
      },
      del: function (path, data, cb) {
        doTest('delete', path, data, cb);
      },
      head: function (path, data, cb) {
        doTest('head', path, data, cb);
      }
    };
    
    expected = {};
    
    test.ok(cluster, 'ClusterState exists');
    test.ok(cluster._self(), '_self() works');
    doTest();
    
    cluster.local(true);
    expected.local = true;
    test.strictEqual(cluster.local(), true);
    doTest();
    
    cluster.masterTimeout(10000);
    expected.master_timeout = 10000;
    test.strictEqual(cluster.masterTimeout(), 10000);
    doTest();
    
    cluster.filterNodes(false);
    expected.filter_nodes = false;
    test.strictEqual(cluster.filterNodes(), false);
    doTest();
    
    cluster.filterRoutingTable(true);
    expected.filter_routing_table = true;
    test.strictEqual(cluster.filterRoutingTable(), true);
    doTest();
    
    cluster.filterMetadata(false);
    expected.filter_metadata = false;
    test.strictEqual(cluster.filterMetadata(), false);
    doTest();
    
    cluster.filterBlocks(false);
    expected.filter_blocks = false;
    test.strictEqual(cluster.filterBlocks(), false);
    doTest();
    
    cluster.filterIndices('i1');
    expected.filter_indices = ['i1'];
    test.deepEqual(cluster.filterIndices(), ['i1']);
    doTest();
    
    cluster.filterIndices('i2');
    expected.filter_indices = ['i1', 'i2'];
    test.deepEqual(cluster.filterIndices(), ['i1', 'i2']);
    doTest();
    
    cluster.filterIndices(['i3', 'i4']);
    expected.filter_indices = ['i3', 'i4'];
    test.deepEqual(cluster.filterIndices(), ['i3', 'i4']);
    doTest();
    
    cluster.filterIndexTemplates('it1');
    expected.filter_index_templates = ['it1'];
    test.deepEqual(cluster.filterIndexTemplates(), ['it1']);
    doTest();
    
    cluster.filterIndexTemplates('it2');
    expected.filter_index_templates = ['it1', 'it2'];
    test.deepEqual(cluster.filterIndexTemplates(), ['it1', 'it2']);
    doTest();
    
    cluster.filterIndexTemplates(['it3', 'it4']);
    expected.filter_index_templates = ['it3', 'it4'];
    test.deepEqual(cluster.filterIndexTemplates(), ['it3', 'it4']);
    doTest();
    
    test.strictEqual(cluster._type(), 'cluster state');
    test.strictEqual(cluster.toString(), JSON.stringify(expected));
    
    cluster = ejs.ClusterState();
    expected = {};
    expectedMethod = 'get';
    expectedData = {};
    expectedPath = '/_cluster/state';
    cluster.doState();
    
    cluster = ejs.ClusterState()
      .filterRoutingTable(true)
      .filterMetadata(true)
      .local(true);
    expected = {
      filter_routing_table: true,
      filter_metadata: true,
      local: true
    };
    expectedMethod = 'get';
    expectedData = {
      filter_routing_table: true,
      filter_metadata: true,
      local: true
    };
    expectedPath = '/_cluster/state';
    cluster.doState();
    
    cluster.filterIndices(['i1', 'i2']);
    expected.filter_indices = ['i1', 'i2'];
    expectedData.filter_indices = 'i1,i2';
    cluster.doState();
    
    test.done();
  }
};
