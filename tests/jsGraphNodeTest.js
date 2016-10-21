QUnit.test("jsGraphNode invalid initialization", function (assert) {
    assert.throws($('<div>').jsGraphNode, 'check the invalid initialization of an node');
});


QUnit.test("jsGraphNode initialization", function (assert) {
    assert.ok($('<div>').jsGraphNode({graph: {}}), 'check the initialization of an node');
});

QUnit.test("jsGraphNode mouseup", function (assert) {
    nodeDiv = $('<div>');
    node = nodeDiv.jsGraphNode({graph: {}});

    assert.ok(nodeDiv.trigger('mouseup'), 'do nothing on mouseup without mouse down');
});

QUnit.test("jsGraphNode mousedown", function (assert) {
    nodeDiv = $('<div>');
    node = nodeDiv.jsGraphNode({
        graph: {
            bind: function (event, func) {
                assert.equal(event, 'mousemove', 'check that the mousemove event is setted to the graph');
                return {
                    bind: function (event, func) {
                        assert.equal(event, 'mouseup', 'check that the mouseup event is setted to the graph');
                    }
                }
            }
        }
    });

    assert.ok(nodeDiv.trigger('mousedown'), 'add the mousemove event if mouse is klicked');
});

QUnit.test("jsGraphNode mousemove", function (assert) {
    graphDiv = $('<div>');
    nodeDiv = $('<div id="test">');
    node = nodeDiv.jsGraphNode({
        graph: graphDiv, factory: {
            buildNodeCoordinates: function (event, node) {
                assert.equal(node.attr('id'), nodeDiv.attr('id'), 'check if setted the correct node');
                return {left: 2, top: 4};
            }
        }
    });

    var inEdgeCalled = false;
    var outEdgeCalled = false;
    node.addInEdge({
        recalculate: function () {
            inEdgeCalled = true;
        }
    });
    node.addOutEdge({
        recalculate: function () {
            outEdgeCalled = true;
        }
    });

    assert.ok(nodeDiv.trigger('mousedown'), 'trigger mousedown to add mousemove');
    assert.ok(graphDiv.trigger('mousemove'), 'trigger mousemove');
    assert.equal(nodeDiv.css('left'), '2px', 'validate if the left position is setted to the node');
    assert.equal(nodeDiv.css('top'), '4px', 'validate if the top position is setted to the node');
    assert.ok(inEdgeCalled, 'check that the recalculate function for the in edge was called')
    assert.ok(outEdgeCalled, 'check that the recalculate function for the out edge was called')
});

QUnit.test("jsGraphNode mouseup after mousedown", function (assert) {
    graphDiv = $('<div>');
    nodeDiv = $('<div id="testNode">');
    node = nodeDiv.jsGraphNode({
        graph: graphDiv, factory: {
            buildNodeCoordinates: function (event, node) {
                assert.equal(node.attr('id'), nodeDiv.attr('id'), 'check if setted the correct node');
                return {left: 2, top: 4};
            }
        }
    });

    assert.equal(node.getClickedNode(), null, 'check that no node is selected for movement');
    assert.ok(nodeDiv.trigger('mousedown'), 'trigger mousedown to add mousemove');
    assert.equal(node.getClickedNode().attr('id'), 'testNode', 'check that the correct node is selected for movement');
    assert.ok(graphDiv.trigger('mouseup'), 'trigger mouseup event');
    assert.equal(node.getClickedNode(), null, 'check that the selected node is reseted');
});

QUnit.test("jsGraphNode setPosition", function (assert) {
    nodeDiv = $('<div>');
    node = nodeDiv.jsGraphNode({
        graph: {}, factory: {
            getGraphOffset: function (graph) {
                return {left: 4, top: 5};
            },
            getNodeSize: function (node) {
                return {width: 10, height: 7};
            }
        }
    });
    node.setPosition(6, 4);
    assert.equal(nodeDiv.css('left'), '5px', 'check that the css left position is setted');
    assert.equal(nodeDiv.css('top'), '5.5px', 'check that the css top position is setted');
});

QUnit.test("jsGraphNode getElement", function (assert) {
    nodeDiv = $('<div id="testNode">');
    node = nodeDiv.jsGraphNode({graph: {}});
    assert.equal(node.getElement().attr('id'), 'testNode', 'check that getElements return the correct html element');
});

QUnit.test("jsGraphNode getId", function (assert) {
    nodeDiv = $('<div id="testNode">');
    node = nodeDiv.jsGraphNode({graph: {}});
    assert.equal(node.getId(), 'testNode', 'check that getId return the correct id');
});

QUnit.test("jsGraphNode getInEdges", function (assert) {
    nodeDiv = $('<div id="testNode">');
    node = nodeDiv.jsGraphNode({graph: {}});
    assert.deepEqual(node.getInEdges(), [], 'check that no in edges are setted');
    node.addInEdge('edge1');
    assert.deepEqual(node.getInEdges(), ['edge1'], 'check that the in edge was setted');
});

QUnit.test("jsGraphNode getOutEdges", function (assert) {
    nodeDiv = $('<div id="testNode">');
    node = nodeDiv.jsGraphNode({graph: {}});
    assert.deepEqual(node.getOutEdges(), [], 'check that no out edges are setted');
    node.addOutEdge('edge1');
    assert.deepEqual(node.getOutEdges(), ['edge1'], 'check that the out edge was setted');
});