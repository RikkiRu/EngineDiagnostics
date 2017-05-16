var Program = (function () {
    function Program() {
    }
    Program.prototype.Clear = function () {
        if (Program.network !== null) {
            Program.network.destroy();
            Program.network = null;
        }
    };
    Program.prototype.Begin = function () {
        this.Clear();
        var container = document.getElementById(Pages[Pages.Graph]);
        Program.network = new vis.Network(container, GraphData.GetData().Data, GraphOptions);
    };
    return Program;
}());
Program.network = null;
function Main() {
    new Program().Begin();
    new DiagnosticController();
}
var Pages;
(function (Pages) {
    Pages[Pages["None"] = 0] = "None";
    Pages[Pages["Graph"] = 1] = "Graph";
    Pages[Pages["Diagnostic"] = 2] = "Diagnostic";
    Pages[Pages["Refs"] = 3] = "Refs";
})(Pages || (Pages = {}));
function Navigate(page) {
    TogglePage(Pages.Graph, false);
    TogglePage(Pages.Diagnostic, false);
    TogglePage(Pages.Refs, false);
    if (Pages[page] == null) {
        throw new Error("Page not found: " + page);
    }
    TogglePage(Pages[page], true);
}
function TogglePage(page, isOn) {
    var e = document.getElementById(Pages[page]);
    if (e === null) {
        throw new Error("Page not found: " + Pages[page]);
    }
    if (page === Pages.Diagnostic)
        DiagnosticController.Instance.DrawCurrent();
    e.style.display = isOn ? "block" : "none";
}
//# sourceMappingURL=main.js.map