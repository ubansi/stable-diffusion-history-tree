function drawHistoryTree(graphData) {
    var container = document.getElementById('history-tree-graph');

    if (!container) {
        console.error("Error: Graph container element '#history-tree-graph' still not found when drawHistoryTree is called!");
        return;
    }

    if (typeof vis === 'undefined') {
        console.error("Error: vis-network library (vis object) not found when drawHistoryTree is called!");
        return;
    }

    var nodes = new vis.DataSet(graphData.nodes);
    var edges = new vis.DataSet(graphData.edges);
    var data = { nodes: nodes, edges: edges };

    var options = {
        layout: {
            hierarchical: {
                direction: 'UD', 
                sortMethod: 'directed' 
            }
        },
        interaction: {
            navigationButtons: true, 
            keyboard: true 
        }
    };
    console.log("vis.Network options set");

    var network = new vis.Network(container, data, options); 
    console.log("vis.Network initialized!");

    // ノードクリックイベントの例
    network.on("click", function (params) {
        if (params.nodes.length > 0) {
            var nodeId = params.nodes[0];
            console.log('Node clicked: ' + nodeId);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {

    var observerTarget = document.body;
    if (!observerTarget) {
         console.error("Error: document.body not found inside DOMContentLoaded!");
         return; 
    }


    var observer = new MutationObserver(function(mutations, obs) {
        var graphContainer = document.getElementById('history-tree-graph');

        if (graphContainer) {

            obs.disconnect();

            try {
                var dummyGraphData = {
                    nodes: [{id: 1, label: 'Commit A'}, {id: 2, label: 'Commit B'}, {id: 3, label: 'Commit C'}], // id を 1, 2, 3 に変更
                    edges: [{from: 1, to: 2}, {from: 1, to: 3}] 
                };
                 console.log("Calling drawHistoryTree with dummy data (triggered by observer).");
                drawHistoryTree(dummyGraphData);
                console.log("--- Initial drawHistoryTree call finished (triggered by observer) ---");
            } catch (e) {
                console.error("Error during initial drawHistoryTree call (triggered by observer):", e);
            }
        }
    });

    observer.observe(observerTarget, {
        childList: true, 
        subtree: true 
    });


});

