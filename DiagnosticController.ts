class DiagnosticController
{
    public static Instance : DiagnosticController = null;
    private currentId = 0;
    private container : HTMLElement = null;

    constructor()
    {
        DiagnosticController.Instance = this;
        this.container = document.getElementById(Pages[Pages.Diagnostic]);
    }

    public DrawCurrent() : void
    {
        return;

        this.container.innerHTML = "";
        let nodes = <vis.DataSet<vis.Node>>(GraphData.GetData().Data.nodes);

        let node = nodes.get(this.currentId);
        this.AddTitle(node);

        let edges = (<vis.DataSet<vis.Edge>>(GraphData.GetData().Data.edges)).get();

        for (let i=0; i<edges.length; i++)
        {
            let edge = edges[i];

            if (edge.from === this.currentId)
            {
                let to = nodes.get(edge.to);
                this.AddLink(to);
            }
        }
    }

    private AddTitle(node : vis.Node) : void
    {
        this.container.innerHTML += "<b>" + node.label + "</b><br>";
    }

    private AddLink(node : vis.Node) : void
    {
        let treeData = GraphData.GetData().GetTreeData(<number>node.id);
        let isTreeEnd = treeData.refs.length === 0;

        if (isTreeEnd)
        {
            this.container.innerHTML += "*";
        }

        this.container.innerHTML += node.label + "<br>";
    }
}