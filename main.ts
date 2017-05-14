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
        let container = document.getElementById("mynetwork");
        Program.network = new vis.Network(container, GraphData.GetData(), GraphOptions);
    }
}

function Main()
{
    new Program().Begin();
}