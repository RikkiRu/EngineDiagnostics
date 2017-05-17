var DiagnosticController = (function () {
    function DiagnosticController() {
        this.currentId = 0;
        this.container = null;
        DiagnosticController.Instance = this;
        this.container = document.getElementById(Pages[Pages.Diagnostic]);
    }
    DiagnosticController.prototype.DrawCurrent = function () {
        this.container.innerHTML = "<br>";
        var nodes = (GraphData.GetData().Data.nodes);
        var node = nodes.get(this.currentId);
        this.AddTitle(node);
        var edges = (GraphData.GetData().Data.edges).get();
        var refs = [];
        var ends = [];
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            if (edge.from === this.currentId) {
                var to = nodes.get(edge.to);
                var treeData_1 = GraphData.GetData().GetTreeData(to.id);
                var isTreeEnd = treeData_1.refs.length === 0;
                if (isTreeEnd)
                    ends.push(to);
                else
                    refs.push(to);
            }
        }
        if (refs.length > 0) {
            this.container.innerHTML += "<div class=\"dDescr\">Уточните информацию о неисправности:</div> <br>";
            for (var i = 0; i < refs.length; i++) {
                this.AddLink(refs[i], false);
            }
        }
        if (ends.length > 0) {
            this.container.innerHTML += "<div class=\"dDescr\">Возможные неисправности для выбранных на данный момент условий:</div><br>";
            for (var i = 0; i < ends.length; i++) {
                this.AddLink(ends[i], true);
            }
        }
        var needBackButton = false;
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            if (edge.to === this.currentId) {
                needBackButton = true;
                break;
            }
        }
        if (needBackButton)
            this.container.innerHTML += "<button onclick='DiagnosticController.Instance.NavigateBack()'>Назад</button>";
    };
    DiagnosticController.prototype.AddTitle = function (node) {
        this.container.innerHTML += "<div class=\"dTitle\"><b>" + node.label + "</b></div><br>";
    };
    DiagnosticController.prototype.AddLink = function (node, isTreeEnd) {
        var c = "dItemRef";
        var click = "onclick=\" DiagnosticController.Instance.Navigate( " + node.id + " )  \"";
        if (isTreeEnd) {
            c = "dItemEnd";
            click = "";
        }
        this.container.innerHTML += "<div class=\"" + c + "\" " + click + ">" + node.label + "</div><br>" + "<br>";
    };
    DiagnosticController.prototype.Navigate = function (id) {
        this.currentId = id;
        this.DrawCurrent();
    };
    DiagnosticController.prototype.NavigateBack = function () {
        var edges = (GraphData.GetData().Data.edges).get();
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            if (edge.to === this.currentId) {
                this.Navigate(edge.from);
                return;
            }
        }
        throw new Error("Navigate back failed");
    };
    return DiagnosticController;
}());
DiagnosticController.Instance = null;
//# sourceMappingURL=DiagnosticController.js.map