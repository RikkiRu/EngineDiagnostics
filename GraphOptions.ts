let GraphOptions : vis.Options =
    {
        layout:
        {
            improvedLayout:false,
            
            hierarchical:
            {
                enabled: true,
                direction: "UD",
                nodeSpacing: 200,
                levelSeparation: 400,
            },
        },

        interaction:
        {
            dragNodes: true
        },

        physics:
        {
            enabled: false
        },

        nodes:
        {
            shape: "box"
        },

        edges:
        {
            smooth: true,
            arrows:
            {
                from: false,
                to: true
            },
            font:
            {
                align: 'top'
            }
        }
    }