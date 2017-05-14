class Program
{
    private static network : vis.Network = null;
    
    private Clear() : void
    {
        if (Program.network !== null) 
        {
            Program.network.destroy();
            Program.network = null;
        }
    }
    
    public Begin(): void
    {
        this.Clear();
        let container = document.getElementById(Pages[Pages.Graph]);
        Program.network = new vis.Network(container, GraphData.GetData(), GraphOptions);
    }
}

function Main()
{
    new Program().Begin();
}

enum Pages
{
    None,
    Graph,
    Diagnostic,
    Refs
}

function Navigate(page : string)
{
    TogglePage(Pages.Graph, false);
    TogglePage(Pages.Diagnostic, false);
    TogglePage(Pages.Refs, false);
    
    if (Pages[page] == null)
    {
        throw new Error("Page not found: " + page);
    }
    
    TogglePage(Pages[page], true);
}

function TogglePage(page : Pages, isOn : boolean)
{
    let e = document.getElementById(Pages[page]);
    
    if (e === null)
    {
        throw new Error("Page not found: " + Pages[page]);
    }
    
    e.style.display = isOn ? "block" : "none";
}