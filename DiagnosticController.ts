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
        this.container.innerHTML = "<br>";
        let nodes = <vis.DataSet<vis.Node>>(GraphData.GetData().Data.nodes);

        let node = nodes.get(this.currentId);
        this.AddTitle(node);

        let edges = (<vis.DataSet<vis.Edge>>(GraphData.GetData().Data.edges)).get();

        let refs : vis.Node[] = [];
        let ends : vis.Node[] = [];

        for (let i=0; i<edges.length; i++)
        {
            let edge = edges[i];

            if (edge.from === this.currentId)
            {
                let to = nodes.get(edge.to);

                let treeData = GraphData.GetData().GetTreeData(<number>to.id);
                let isTreeEnd = treeData.refs.length === 0;

                if  (isTreeEnd)
                    ends.push(to);
                else
                    refs.push(to);
            }
        }

        if (refs.length > 0)
        {
            this.container.innerHTML += "<div class=\"dDescr\">Уточните информацию о неисправности:</div> <br>";

            for (let i=0; i<refs.length; i++)
            {
                this.AddLink(refs[i], false);
            }
        }

        if (ends.length > 0)
        {
            this.container.innerHTML += "<div class=\"dDescr\">Возможные неисправности для выбранных на данный момент условий:</div><br>";

            for (let i=0; i<ends.length; i++)
            {
                this.AddLink(ends[i], true);
            }
        }

        let needBackButton = false;

        for (let i=0; i<edges.length; i++)
        {
            let edge = edges[i];

            if (edge.to === this.currentId)
            {
                needBackButton = true;
                break;
            }
        }

        if (needBackButton)
            this.container.innerHTML += "<button onclick='DiagnosticController.Instance.NavigateBack()'>Назад</button>";
    }

    private AddTitle(node : vis.Node) : void
    {
        this.container.innerHTML += "<div class=\"dTitle\"><b>" + node.label + "</b></div><br>";
    }

    private AddLink(node : vis.Node, isTreeEnd : boolean) : void
    {
        let c = "dItemRef";
        let click = "onclick=\" DiagnosticController.Instance.Navigate( " + node.id + " )  \"";

        if (isTreeEnd)
        {
            c = "dItemEnd";
            click = "";
        }

        this.container.innerHTML += "<div class=\"" + c + "\" " + click + ">" + node.label + "</div><br>"  + "<br>";
    }

    private Navigate(id : number) : void
    {
        this.currentId = id;
        this.DrawCurrent();
    }

    private NavigateBack() : void
    {
        let edges = (<vis.DataSet<vis.Edge>>(GraphData.GetData().Data.edges)).get();

        for (let i=0; i<edges.length; i++)
        {
            let edge = edges[i];

            if (edge.to === this.currentId)
            {
                this.Navigate(<number>edge.from);
                return;
            }
        }

        throw new Error("Navigate back failed");
    }
}