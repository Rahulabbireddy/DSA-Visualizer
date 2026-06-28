
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}

/* ===========================================
   GRAPH VISUALIZER
=========================================== */

const graph = {};

let bfsCount = 0;
let dfsCount = 0;

const history = [];

const graphCanvas = document.getElementById("graphCanvas");

const vertexInput = document.getElementById("vertexInput");
const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");

const addVertexBtn = document.getElementById("addVertexBtn");
const removeVertexBtn = document.getElementById("removeVertexBtn");
const addEdgeBtn = document.getElementById("addEdgeBtn");
const removeEdgeBtn = document.getElementById("removeEdgeBtn");
const bfsBtn = document.getElementById("bfsBtn");
const dfsBtn = document.getElementById("dfsBtn");
const clearBtn = document.getElementById("clearBtn");
const randomBtn = document.getElementById("randomBtn");

/* ===========================================
   RENDER GRAPH
=========================================== */

function renderGraph(){

    graphCanvas.innerHTML="";

    const vertices=Object.keys(graph);

    if(vertices.length===0){

        updateStats();

        return;

    }

    const radius=180;

    const centerX=250;

    const centerY=220;

    vertices.forEach((vertex,index)=>{

        const angle=(2*Math.PI*index)/vertices.length;

        const x=centerX+radius*Math.cos(angle);

        const y=centerY+radius*Math.sin(angle);

        const node=document.createElement("div");

        node.className="graph-node";

        node.id="node-"+vertex;

        node.innerHTML=vertex;

        node.style.left=x+"px";

        node.style.top=y+"px";

       enableDrag(node);


graphCanvas.appendChild(node);

    });

    drawEdges(vertices);

    updateStats();

}
function drawEdges(vertices){

    let svg=document.querySelector(".graph-svg");

    if(svg){

        svg.remove();

    }

    svg=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.classList.add("graph-svg");

    svg.setAttribute("width","100%");

    svg.setAttribute("height","100%");

    svg.style.position="absolute";
    svg.style.left="0";
    svg.style.top="0";

    vertices.forEach(from=>{

        graph[from].forEach(to=>{

            if(from<to){

                const n1=document.getElementById("node-"+from);

                const n2=document.getElementById("node-"+to);

                if(!n1 || !n2) return;

                const x1=n1.offsetLeft+30;
                const y1=n1.offsetTop+30;

                const x2=n2.offsetLeft+30;
                const y2=n2.offsetTop+30;

                const line=document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "line"
                );

                line.setAttribute("x1",x1);
                line.setAttribute("y1",y1);

                line.setAttribute("x2",x2);
                line.setAttribute("y2",y2);

                line.classList.add("graph-edge");

                svg.appendChild(line);

            }

        });

    });

    graphCanvas.prepend(svg);

}
/* ===========================================
   DRAG GRAPH NODE
=========================================== */


/* ===========================================
   UPDATE STATS
=========================================== */

function updateStats(){

    document.getElementById("vertexCount").textContent =
        Object.keys(graph).length;

    let edges=0;

    Object.values(graph).forEach(list=>{

        edges+=list.length;

    });

    document.getElementById("edgeCount").textContent =
        edges/2;

    document.getElementById("bfsCount").textContent =
        bfsCount;

    document.getElementById("dfsCount").textContent =
        dfsCount;

}

/* ===========================================
   ADD VERTEX
=========================================== */

function addVertex(){

    const vertex=vertexInput.value.trim();

    if(vertex===""){

        showToast("Enter Vertex");

        return;

    }

    if(graph[vertex]){

        showToast("Vertex Already Exists");

        return;

    }

    graph[vertex]=[];

    history.unshift("Vertex Added : "+vertex);

    updateHistory();

    renderGraph();

    vertexInput.value="";

    showToast("Vertex Added");

}

addVertexBtn.addEventListener("click",addVertex);

/* ===========================================
   HISTORY
=========================================== */

function updateHistory(){

    const list=document.getElementById("historyList");

    list.innerHTML="";

    history.slice(0,10).forEach(item=>{

        const li=document.createElement("li");

        li.innerHTML=item;

        list.appendChild(li);

    });

}

/* ===========================================
   TOAST
=========================================== */

function showToast(message){

    let toast=document.getElementById("toast");

    if(!toast){

        toast=document.createElement("div");

        toast.id="toast";

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

renderGraph();

/* ===========================================
   ADD EDGE
=========================================== */

function addEdge(){

    const from=fromInput.value.trim();

    const to=toInput.value.trim();

    if(from==="" || to===""){

        showToast("Enter Both Vertices");

        return;

    }

    if(!graph[from] || !graph[to]){

        showToast("Vertex Not Found");

        return;

    }

    if(graph[from].includes(to)){

        showToast("Edge Already Exists");

        return;

    }

    graph[from].push(to);

    graph[to].push(from);

    history.unshift("Edge : "+from+" ↔ "+to);

    updateHistory();

    renderGraph();

    fromInput.value="";

toInput.value="";

    showToast("Edge Added");

}

addEdgeBtn.addEventListener("click",addEdge);

/* ===========================================
   REMOVE VERTEX
=========================================== */

function removeVertex(){

    const vertex=vertexInput.value.trim();

    if(!graph[vertex]){

        showToast("Vertex Not Found");

        return;

    }

    delete graph[vertex];

    for(let key in graph){

        graph[key]=graph[key].filter(v=>v!==vertex);

    }

    history.unshift("Vertex Removed : "+vertex);

    updateHistory();

    renderGraph();

    vertexInput.value="";

    showToast("Vertex Removed");

}

removeVertexBtn.addEventListener("click",removeVertex);

/* ===========================================
   REMOVE EDGE
=========================================== */

function removeEdge(){

    const from=fromInput.value.trim();

    const to=toInput.value.trim();

    if(!graph[from] || !graph[to]){

        showToast("Vertex Not Found");

        return;

    }

    graph[from]=graph[from].filter(v=>v!==to);

    graph[to]=graph[to].filter(v=>v!==from);

    history.unshift("Edge Removed : "+from+" ↔ "+to);

    updateHistory();

    renderGraph();

    fromInput.value="";

toInput.value="";

    showToast("Edge Removed");

}

removeEdgeBtn.addEventListener("click",removeEdge);

/* ===========================================
   CLEAR GRAPH
=========================================== */
function clearGraph(){

    for(let key in graph){

        delete graph[key];

    }

    history.length=0;

    updateHistory();

    clearTraversal();

    renderGraph();

    showToast("Graph Cleared");

}

/* ===========================================
   RANDOM GRAPH
=========================================== */

function randomGraph(){

    clearGraph();

    const vertices=["A","B","C","D","E","F"];

    vertices.forEach(v=>{

        graph[v]=[];

    });

    const edges=[
        ["A","B"],
        ["A","C"],
        ["B","D"],
        ["C","D"],
        ["C","E"],
        ["D","F"],
        ["E","F"]
    ];

    edges.forEach(edge=>{

        const [u,v]=edge;

        graph[u].push(v);

        graph[v].push(u);

    });

    history.unshift("Random Graph Generated");

    updateHistory();

    renderGraph();

    showToast("Random Graph Created");

}

randomBtn.addEventListener("click",randomGraph);


/* ===========================================
   BFS
=========================================== */

async function bfs(){

    const start=vertexInput.value.trim();

    if(!graph[start]){

        showToast("Start Vertex Not Found");

        return;

    }

    resetGraph();

    bfsCount++;

    updateStats();

  const visited={};

const queue=[start];

const order=[];


    visited[start]=true;

    history.unshift("BFS : "+start);

    updateHistory();

    while(queue.length){


        document.getElementById("queueBox").innerHTML =
queue.join(" → ") || "Empty";

        const current=queue.shift();

        document.getElementById("queueBox").innerHTML =
queue.length ? queue.join(" → ") : "Empty";

        order.push(current);

document.getElementById("traversalOrder").innerHTML =
    order.join(" → ");

        const node=document.getElementById("node-"+current);

        node.classList.add("visit-node");

        await new Promise(resolve=>setTimeout(resolve,700));

        for(const next of graph[current]){

            if(!visited[next]){

                visited[next]=true;

                queue.push(next);

            }

        }

    }

    showToast("BFS Completed");

}

bfsBtn.addEventListener("click",bfs);

function resetGraph(){

    document.getElementById("queueBox").innerHTML="Empty";

document.getElementById("stackBox").innerHTML="Empty";

    document.querySelectorAll(".graph-node").forEach(node=>{

        node.classList.remove("visit-node");

    });

}

/* ===========================================
   CLEAR TRAVERSAL
=========================================== */


function clearTraversal(){

    document.getElementById("traversalOrder").innerHTML="-";

    document.getElementById("queueBox").innerHTML="Empty";

    document.getElementById("stackBox").innerHTML="Empty";

}

/* ===========================================
   DFS
=========================================== */

async function dfs(){

    const start = vertexInput.value.trim();

    if(!graph[start]){

        showToast("Start Vertex Not Found");

        return;

    }

    resetGraph();

    dfsCount++;

    updateStats();

    history.unshift("DFS : " + start);

    updateHistory();

   const visited = {};

const order = [];

await dfsVisit(start, visited, order);
    showToast("DFS Completed");

}

async function dfsVisit(vertex, visited, order){

    visited[vertex]=true;

    order.push(vertex);

    document.getElementById("stackBox").innerHTML =
order.join(" → ");

    document.getElementById("stackBox").innerHTML =
order.join(" → ");

    document.getElementById("traversalOrder").innerHTML =
        order.join(" → ");

    const node=document.getElementById("node-"+vertex);

    node.classList.add("visit-node");

    await new Promise(resolve=>setTimeout(resolve,700));

    for(const next of graph[vertex]){

        if(!visited[next]){

            await dfsVisit(next, visited, order);

        }

    }

}
dfsBtn.addEventListener("click", dfs);

/* ===========================================
   DRAG NODE
=========================================== */

function enableDrag(node){

    let isDragging=false;

    let offsetX=0;

    let offsetY=0;

    node.addEventListener("mousedown",e=>{

        isDragging=true;

        offsetX=e.offsetX;

        offsetY=e.offsetY;

    });

    document.addEventListener("mousemove",e=>{

        if(!isDragging) return;

        const rect=graphCanvas.getBoundingClientRect();

        node.style.left=(e.clientX-rect.left-offsetX)+"px";

        node.style.top=(e.clientY-rect.top-offsetY)+"px";

        drawEdges(Object.keys(graph));

    });

    document.addEventListener("mouseup",()=>{

        isDragging=false;

    });

}