QUnit.test("jsGraph initialization", function (assert) {
    assert.ok($('<div>').jsGraph(), 'initialize the js graph');
});

QUnit.test("jsGraph addNode", function (assert) {
    graph = $('<div>').jsGraph({
        factory: {
            loadTemplate: function (template, arguments) {
                assert.equal(template, '#template', 'check if the correct template is setted');
                assert.deepEqual(arguments, {
                    id: 'testNode',
                    name: 'test Node'
                }, 'check if the correct arguments setted in the template');
                return $('<div>test</div>');
            },
            createNode: function (id, graph) {
                assert.equal(id, 'testNode', 'check if the correct id is setted');
                return 'success';
            }
        }
    });

    assert.deepEqual(graph.getNodes(), [], 'compare the initial nodes (empty array)');
    assert.equal(graph.addNode('#template', {id: 'testNode', name: 'test Node'}), 'success', 'add a node');
    assert.deepEqual(graph.getNodes(), ['success'], 'check the node was added');
    assert.equal(graph.getElement().html(), '<div>test</div>', 'check if the generated html content was added to the graph');
});

QUnit.test("jsGraph addEdge", function (assert) {
    mockSource = null;
    mockTarget = null;
    graph = $('<div>').jsGraph({
        factory: {
            loadTemplate: function (template, arguments) {
                return 'template';
            }, createNode: function (id, graph) {
                return {
                    getId: function () {
                        return id;
                    }, addOutEdge: function (e) {
                        assert.equal(id, 'node1', 'check if the correct node is used for out edge');
                        assert.equal(e.getId(), 'node1_node2', 'check if the correct edge was setted as out edge');
                    }, addInEdge: function (e) {
                        assert.equal(id, 'node2', 'check if the correct node is used for in edge');
                        assert.equal(e.getId(), 'node1_node2', 'check if the correct edge was setted as in edge');
                    }
                };
            }, createEdge: function (id, source, target) {
                mockSource = source;
                mockTarget = target;
                assert.equal(id, 'node1_node2', 'check if the correct edge id was generated');
                return {
                    getId: function () {
                        return id
                    },
                    recalculate: function () {

                    }
                };
            }
        }
    });
    node1 = graph.addNode('#template', {'id': 'node1', name: 'Node 1'});
    node2 = graph.addNode('#template', {'id': 'node2', name: 'Node 2'});

    edge = graph.addEdge('#line', node1, node2, {line: 'line1'});

    assert.deepEqual(mockSource, node1, 'check if the correct node was setted as source');
    assert.deepEqual(mockTarget, node2, 'check if the correct node was setted as target');
    assert.equal(graph.getElement().html(), 'templatetemplatetemplate', 'check the generated html content');
});