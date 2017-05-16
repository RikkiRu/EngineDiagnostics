var DiagnosticController = (function () {
    function DiagnosticController() {
        this.currentId = 0;
        this.container = null;
        DiagnosticController.Instance = this;
        this.container = document.getElementById(Pages[Pages.Diagnostic]);
    }
    DiagnosticController.prototype.DrawCurrent = function () {
        return;
        this.container.innerHTML = "";
        var nodes = (GraphData.GetData().Data.nodes);
        var node = nodes.get(this.currentId);
        this.AddTitle(node);
        var edges = (GraphData.GetData().Data.edges).get();
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            if (edge.from === this.currentId) {
                var to = nodes.get(edge.to);
                this.AddLink(to);
            }
        }
    };
    DiagnosticController.prototype.AddTitle = function (node) {
        this.container.innerHTML += "<b>" + node.label + "</b><br>";
    };
    DiagnosticController.prototype.AddLink = function (node) {
        var treeData = GraphData.GetData().GetTreeData(node.id);
        var isTreeEnd = treeData.refs.length === 0;
        if (isTreeEnd) {
            this.container.innerHTML += "*";
        }
        this.container.innerHTML += node.label + "<br>";
    };
    return DiagnosticController;
}());
DiagnosticController.Instance = null;
//# sourceMappingURL=DiagnosticController.js.map