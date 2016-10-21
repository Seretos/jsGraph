QUnit.test("jsGraph integration test", function (assert) {
    var graph = $('#integrationTestGraph').jsGraph();

    var node1 = graph.addNode('#template', {id: 'node1', name: 'Node 1'});
    var node2 = graph.addNode('#template', {id: 'node2', name: 'Node 2'});
    var node3 = graph.addNode('#template', {id: 'node3', name: 'Node 3'});
    var node4 = graph.addNode('#template', {id: 'node4', name: 'Node 4'});
    var node5 = graph.addNode('#template', {id: 'node5', name: 'Node 5'});

    node1.setPosition(400, 400);
    node2.setPosition(50, 50);
    node3.setPosition(750, 50);
    node4.setPosition(50, 750);
    node5.setPosition(750, 750);

    edge1 = graph.addEdge('#line', node1, node2, {line: 'line1'});
    edge2 = graph.addEdge('#line', node1, node3, {line: 'line2'});
    edge3 = graph.addEdge('#line', node1, node4, {line: 'line3'});
    edge4 = graph.addEdge('#line', node1, node5, {line: 'line4'});

    assert.equal(node1.getClickedNode(), null, 'check that no node is selected for movement');
    $('#integrationTestGraph').find('#node1').trigger('mousedown');
    assert.equal(node1.getClickedNode().attr('id'), 'node1', 'check if node 1 is selected');
    $('#integrationTestGraph').trigger('mousemove');
    $('#integrationTestGraph').trigger('mouseup')
    assert.equal(node1.getClickedNode(), null, 'check that no node is selected for movement');
});