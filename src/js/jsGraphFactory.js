function jsGraphFactory() {

}

jsGraphFactory.prototype.loadTemplate = function (templateSelector, variables) {
    var tmp = $('<div/>');
    tmp.loadTemplate(templateSelector, variables);

    return tmp.html();
};

jsGraphFactory.prototype.createNode = function (id, graph) {
    return $("#" + id).jsGraphNode({graph: graph, factory: this});
};

jsGraphFactory.prototype.createEdge = function (id, source, target, graph) {
    return $('#' + id).jsGraphEdge({inNode: source, outNode: target, graph: graph});
};

jsGraphFactory.prototype.buildNodeCoordinates = function (event, node, graph) {
    return {
        left: event.pageX - graph.offset().left - (node.outerWidth() / 2),
        top: event.pageY - graph.offset().top - (node.outerHeight() / 2)
    };
};

jsGraphFactory.prototype.calculateNodeCenterCoordinates = function (node, graph) {
    return {
        left: node.getElement().offset().left - graph.offset().left + (node.getElement().outerWidth() / 2)
        ,
        top: node.getElement().offset().top - graph.offset().top + (node.getElement().outerHeight() / 2)
    };
};

jsGraphFactory.prototype.getGraphOffset = function (graph) {
    return {
        left: graph.offset().left,
        top: graph.offset().top
    };
};

jsGraphFactory.prototype.getNodeSize = function (node) {
    return {
        width: node.outerWidth(),
        height: node.outerHeight()
    };
};