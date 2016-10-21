(function ($) {
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