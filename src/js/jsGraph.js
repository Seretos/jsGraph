(function ($) {
    $.fn.jsGraph = function (options) {
        var settings = $.extend({}, {factory: new jsGraphFactory()}, options);
        var graph = $(this);
        var nodes = [];
        return {
            addNode: function (template, arguments) {
                graph.append(settings.factory.loadTemplate(template, arguments));
                var graphNode = settings.factory.createNode(arguments.id, graph);

                nodes.push(graphNode);
                return graphNode;
            },
            addEdge: function (template, source, target, arguments) {
                id = source.getId() + '_' + target.getId();
                arguments.id = id;

                graph.append(settings.factory.loadTemplate(template, arguments));
                edge = settings.factory.createEdge(id, source, target, graph);

                source.addOutEdge(edge);
                target.addInEdge(edge);
                edge.recalculate();
            },
            getNodes: function () {
                return nodes;
            },
            getElement: function () {
                return graph;
            }
        };
    };
})(jQuery);