QUnit.test("jsGraphEdge initialization", function (assert) {
    assert.throws(function () {
        $('<div>').jsGraphEdge({});
    }, 'check the invalid initialization of an edge without graph');

    assert.throws(function () {
        $('<div>').jsGraphEdge({graph: {}});
    }, 'check the invalid initialization of an edge without inNode');

    assert.throws(function () {
        $('<div>').jsGraphEdge({graph: {}, inNode: {}});
    }, 'check the invalid initialization of an edge without outNode');

    assert.ok($('<div>').jsGraphEdge({graph: {}, inNode: {}, outNode: {}}), 'check a valid initialization');
});

QUnit.test("jsGraphEdge recalculate", function (assert) {
    edgeDiv = $('<div>');
    edge = edgeDiv.jsGraphEdge({
        graph: {}, inNode: 'inNode', outNode: 'outNode', factory: {
            calculateNodeCenterCoordinates: function (node, graph) {
                if (node == 'inNode') {
                    return {left: 1, top: 1};
                } else if (node == 'outNode') {
                    return {left: 10, top: 10};
                }
            }
        }
    });
    edge.recalculate();
    assert.equal(edgeDiv.css('left'), '-1px', 'check the left position of the edge div');
    assert.equal(edgeDiv.css('top'), '5.5px', 'check the top position of the edge div');
    assert.equal(edgeDiv.css('width'), '13px', 'check the with of the edge div');
    assert.equal(edgeDiv.css('height'), '3px', 'check the height of the edge div');
    assert.equal(edgeDiv.css('-webkit-transform'), 'matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)', 'check the rotation of the edge div');
});

QUnit.test("jsGraphEdge recalculate inverted", function (assert) {
    edgeDiv = $('<div>');
    edge = edgeDiv.jsGraphEdge({
        graph: {}, inNode: 'inNode', outNode: 'outNode', factory: {
            calculateNodeCenterCoordinates: function (node, graph) {
                if (node == 'inNode') {
                    return {left: 10, top: 10};
                } else if (node == 'outNode') {
                    return {left: 1, top: 1};
                }
            }
        }
    });
    edge.recalculate();
    assert.equal(edgeDiv.css('left'), '-1px', 'check the left position of the edge div');
    assert.equal(edgeDiv.css('top'), '5.5px', 'check the top position of the edge div');
    assert.equal(edgeDiv.css('width'), '13px', 'check the with of the edge div');
    assert.equal(edgeDiv.css('height'), '3px', 'check the height of the edge div');
    assert.equal(edgeDiv.css('-webkit-transform'), 'matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)', 'check the rotation of the edge div');
});