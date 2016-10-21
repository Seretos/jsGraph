(function ($) {
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
})(jQuery);