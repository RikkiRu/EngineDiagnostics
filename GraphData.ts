class GraphData
{
    private static createdData : GraphData = null;
    
    public static GetData() : vis.Data
    {
        if (GraphData.createdData === null)
            GraphData.createdData = new GraphData();
            
        return GraphData.createdData.Data;
    }
    
    private Data: vis.Data =
    {
        nodes: new vis.DataSet<vis.Node>(),
        edges: new vis.DataSet(),
    }
     
    constructor() 
    {
        let newData = new vis.DataSet<vis.Node>();
        let newConnect = new vis.DataSet();
        let tree : treeData[] = [];
        
        let tstStr = document.getElementById("hiddenTree").innerHTML;
        
        let word = "";
        let lvl = 0;
        let idCurrent = 0;
        let stopTabs = false;
        
        for (let i=0; i<tstStr.length; i++)
        {
            let char = tstStr[i];
            if (char === "\r")
                continue;
            
            if (char === "\n" || i === tstStr.length - 1)
            {
                let parentId = -1;
                
                // Searching last node with prev. level
                for (let k = tree.length - 1; k >= 0; k--)
                {
                    let kLvl = tree[k];
                    
                    if (kLvl.lvl === lvl - 1)
                    {
                        parentId = kLvl.id;
                        kLvl.refs.push(idCurrent);
                        break;
                    }
                }
                
                tree.push({ id: idCurrent, lvl: lvl, refs: [] });
                
                let newNode : vis.Node = { id: idCurrent, label: idCurrent + ": " + word };
                newData.add(newNode);
                
                if (parentId !== -1)
                {
                    let connect = { from: parentId, to: idCurrent, label: "" };
                    newConnect.add(connect);
                }           
                
                idCurrent++;
                lvl = 0;
                word = "";
                stopTabs = false;
            }
            else if (char === "~")
            {
                if (!stopTabs)
                    lvl++;
            }
            else 
            {
                word += char;
                stopTabs = true;
            }
        }
        
        for (let k = 0; k < tree.length ; k++)
        {
            let kLvl = tree[k];
            
            if (kLvl.id == 0)
            {
                let data = <any>newData.get(kLvl.id);   
                data.color = "rgb(0,255,107)";
                newData.update(data);
            }
            else if (kLvl.refs.length == 0)
            {
                let data = <any>newData.get(kLvl.id);   
                data.color = "rgb(255,168,7)";
                newData.update(data);
            }
        }
        
        this.Data.nodes = newData;
        this.Data.edges = newConnect;
        
        console.log("Total nodes: " + idCurrent);
        
        let maxChars = 10;
        let dataSet = <vis.DataSet<vis.Node>>this.Data.nodes;
        let nodes = dataSet.get();     
        
        for (let i=0; i<nodes.length; i++)
        {       
            let d = nodes[i];
            let str = d.label;
            let lastSpace = 0;
            
            for (let j=0; j < str.length - 1; j++)
            {
                if (str[j] === ' ' && j - lastSpace > maxChars)
                {
                    let p1 = str.substring(0, j);
                    let p2 = str.substring(j + 1, str.length);
                    d.label = p1 + "\n" + p2;
                    str = d.label;
                    lastSpace = j;
                }
            }
        }
        
        dataSet.update(nodes);
    }    
}

class treeData 
{
    id = -1;
    lvl = -1;
    refs: number[] = [];
}