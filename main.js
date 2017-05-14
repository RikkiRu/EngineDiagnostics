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
        var container = document.getElementById("mynetwork");
        Program.network = new vis.Network(container, GraphData.GetData(), GraphOptions);
    };
    return Program;
}());
Program.network = null;
function Main() {
    new Program().Begin();
}
//# sourceMappingURL=main.js.map