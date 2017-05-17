var GraphData = (function () {
    function GraphData() {
        this.Data = {
            nodes: new vis.DataSet(),
            edges: new vis.DataSet(),
        };
        this.tree = [];
        var newData = new vis.DataSet();
        var newConnect = new vis.DataSet();
        var tstStr = document.getElementById("hiddenTree").innerHTML;
        var word = "";
        var lvl = 0;
        var idCurrent = 0;
        var stopTabs = false;
        for (var i = 0; i < tstStr.length; i++) {
            var char = tstStr[i];
            if (char === "\r")
                continue;
            if (char === "\n" || i === tstStr.length - 1) {
                var parentId = -1;
                // Searching last node with prev. level
                for (var k = this.tree.length - 1; k >= 0; k--) {
                    var kLvl = this.tree[k];
                    if (kLvl.lvl === lvl - 1) {
                        parentId = kLvl.id;
                        kLvl.refs.push(idCurrent);
                        break;
                    }
                }
                this.tree.push({ id: idCurrent, lvl: lvl, refs: [] });
                //let newNode : vis.Node = { id: idCurrent, label: idCurrent + ": " + word };
                var newNode = { id: idCurrent, label: word };
                newData.add(newNode);
                if (parentId !== -1) {
                    var connect = { from: parentId, to: idCurrent, label: "" };
                    newConnect.add(connect);
                }
                idCurrent++;
                lvl = 0;
                word = "";
                stopTabs = false;
            }
            else if (char === "~") {
                if (!stopTabs)
                    lvl++;
            }
            else {
                word += char;
                stopTabs = true;
            }
        }
        for (var k = 0; k < this.tree.length; k++) {
            var kLvl = this.tree[k];
            if (kLvl.id == 0) {
                var data = newData.get(kLvl.id);
                data.color = "rgb(0,255,107)";
                newData.update(data);
            }
            else if (kLvl.refs.length == 0) {
                var data = newData.get(kLvl.id);
                data.color = "rgb(255,168,7)";
                newData.update(data);
            }
        }
        this.Data.nodes = newData;
        this.Data.edges = newConnect;
        console.log("Total nodes: " + idCurrent);
        var maxChars = 10;
        var dataSet = this.Data.nodes;
        var nodes = dataSet.get();
        for (var i = 0; i < nodes.length; i++) {
            var d = nodes[i];
            var str = d.label;
            var lastSpace = 0;
            for (var j = 0; j < str.length - 1; j++) {
                if (str[j] === ' ' && j - lastSpace > maxChars) {
                    var p1 = str.substring(0, j);
                    var p2 = str.substring(j + 1, str.length);
                    d.label = p1 + "\n" + p2;
                    str = d.label;
                    lastSpace = j;
                }
            }
        }
        dataSet.update(nodes);
    }
    GraphData.GetData = function () {
        if (GraphData.createdData === null)
            GraphData.createdData = new GraphData();
        return GraphData.createdData;
    };
    GraphData.prototype.GetTreeData = function (id) {
        for (var i = 0; i < this.tree.length; i++) {
            if (this.tree[i].id === id)
                return this.tree[i];
        }
    };
    return GraphData;
}());
GraphData.createdData = null;
var treeData = (function () {
    function treeData() {
        this.id = -1;
        this.lvl = -1;
        this.refs = [];
    }
    return treeData;
}());
//# sourceMappingURL=GraphData.js.map