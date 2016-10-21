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
})(jQuery);(function ($) {
    $.fn.jsGraphEdge = function (options) {
        var settings = $.extend({}, {factory: new jsGraphFactory()}, options);

        if (!settings.graph) {
            throw 'no graph was setted for this edge';
        }

        if (!settings.inNode) {
            throw 'no inNode was setted for this edge';
        }

        if (!settings.outNode) {
            throw 'no outNode was setted for this edge';
        }

        var edge = $(this);
        return {
            recalculate: function () {
                inPos = settings.factory.calculateNodeCenterCoordinates(settings.inNode, settings.graph);
                outPos = settings.factory.calculateNodeCenterCoordinates(settings.outNode, settings.graph);

                x1 = inPos.left;
                y1 = inPos.top;
                x2 = outPos.left;
                y2 = outPos.top;
                if (inPos.left > outPos.left) {
                    x1 = outPos.left
                    x2 = inPos.left;
                }
                if (inPos.top > outPos.top) {
                    y1 = outPos.top;
                    y2 = inPos.top;
                }

                var dist = Math.ceil(Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)));
                var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                var xshift = dist - Math.abs(x2 - x1);
                var yshift = Math.abs(y1 - y2) / 2;
                edge.css('left', (x1 - xshift / 2));
                edge.css('top', Math.min(y1, y2) + yshift);
                edge.css('width', dist);
                edge.css('height', 3);
                if (inPos.left > outPos.left) {
                    angle = -angle;
                }
                if (inPos.top > outPos.top) {
                    angle = -angle;
                }
                edge.css('-webkit-transform', "rotate(" + angle + "deg)");
            }
        };
    };
})(jQuery);function jsGraphFactory() {

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
};(function ($) {
    $.fn.jsGraphNode = function (options) {
        var settings = $.extend({}, {factory: new jsGraphFactory()}, options);

        if (!settings.graph) {
            throw 'no graph was setted for this node';
        }

        var node = $(this);
        var inEdges = [];
        var outEdges = [];
        var clickedNode = null;

        function onMouseMove(event) {
            vertex = settings.factory.buildNodeCoordinates(event, node, settings.graph);
            clickedNode.css('left', vertex.left);
            clickedNode.css('top', vertex.top);
            $.each(inEdges, function (key, value) {
                value.recalculate();
            });
            $.each(outEdges, function (key, value) {
                value.recalculate();
            });
        }

        function onMouseUp() {
            clickedNode = null;
            settings.graph.unbind('mousemove');
            settings.graph.unbind('mouseup');
        }

        node.mousedown(function () {
            clickedNode = node;
            settings.graph.bind('mousemove', onMouseMove)
                .bind('mouseup', onMouseUp);
        });

        return {
            setPosition: function (x, y) {
                offset = settings.factory.getGraphOffset(settings.graph);
                size = settings.factory.getNodeSize(node);
                node.css('left', offset.left + x - (size.width / 2));
                node.css('top', offset.top + y - (size.height / 2));
            },
            getElement: function () {
                return node;
            },
            getId: function () {
                return node.attr('id');
            },
            addInEdge: function (edge) {
                inEdges.push(edge);
            },
            addOutEdge: function (edge) {
                outEdges.push(edge);
            },
            getInEdges: function () {
                return inEdges;
            },
            getOutEdges: function () {
                return outEdges;
            },
            getClickedNode: function () {
                return clickedNode;
            }
        };
    };
})(jQuery);