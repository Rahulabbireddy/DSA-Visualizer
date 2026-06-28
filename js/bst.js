/* ===========================================
   THEME
=========================================== */

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}

/* ===========================================
   BST NODE
=========================================== */

class BSTNode{

    constructor(value){

        this.value = Number(value);

        this.left = null;

        this.right = null;

    }

}

/* ===========================================
   VARIABLES
=========================================== */

let root = null;

let operationCount = 0;

const bstTree =
    document.getElementById("bstTree");

const valueInput =
    document.getElementById("bstValue");

const insertBtn =
    document.getElementById("insertBtn");

const deleteBtn =
    document.getElementById("deleteBtn");

const searchBtn =
    document.getElementById("searchBtn");

const randomBtn =
    document.getElementById("randomBtn");

const clearBtn =
    document.getElementById("clearBtn");

const inorderBtn =
    document.getElementById("inorderBtn");

const preorderBtn =
    document.getElementById("preorderBtn");

const postorderBtn =
    document.getElementById("postorderBtn");

const levelorderBtn =
    document.getElementById("levelorderBtn");

const traversalOutput =
    document.getElementById("traversalOutput");

    /* ===========================================
   RENDER BST
=========================================== */
/* ===========================================
   RENDER BST
=========================================== */

function renderBST() {

    bstTree.innerHTML = "";

    if (!root) {

        updateInfo();

        return;

    }

    const treeWrapper = document.createElement("div");

    treeWrapper.className = "tree-wrapper";

    bstTree.appendChild(treeWrapper);

    calculateTreeLayout(root);

    drawTree(root, treeWrapper);

    updateInfo();

}

/* ===========================================
   TREE LAYOUT
=========================================== */

const NODE_SIZE = 55;

const LEVEL_HEIGHT = 90;

const HORIZONTAL_GAP = 50;

/* ===========================================
   CALCULATE POSITIONS
=========================================== */

let currentX = 0;

function calculateTreeLayout(

    node,

    level=0,

    minX=0,

    maxX=1

){

    if(node===null)
        return;

    node.x=(minX+maxX)/2;

    node.y=level;

    calculateTreeLayout(

        node.left,

        level+1,

        minX,

        node.x

    );

    calculateTreeLayout(

        node.right,

        level+1,

        node.x,

        maxX

    );

}

/* ===========================================
   DRAW TREE
=========================================== */

function drawTree(node,parent){

    if(node===null)
        return;

    const circle=document.createElement("div");

    circle.className="tree-node";

    circle.dataset.value=node.value;

    circle.innerHTML=node.value;

    circle.style.left=

        (node.x*100)+"%";

    circle.style.top=

        (node.y*100)+"px";

    parent.appendChild(circle);

    if(node.left){

        drawSVGLine(node,node.left,parent);

        drawTree(node.left,parent);

    }

    if(node.right){

        drawSVGLine(node,node.right,parent);

        drawTree(node.right,parent);

    }

}

/* ===========================================
   DRAW CONNECTION
=========================================== */
function drawSVGLine(parentNode,childNode,parent){

    const line=document.createElement("div");

    line.className="tree-line";

    const x1=nodePixelX(parentNode);

    const y1=nodePixelY(parentNode);

    const x2=nodePixelX(childNode);

    const y2=nodePixelY(childNode);

    const length=Math.sqrt(

        (x2-x1)*(x2-x1)+

        (y2-y1)*(y2-y1)

    );

    const angle=Math.atan2(

        y2-y1,

        x2-x1

    )*180/Math.PI;

    line.style.left=x1+"px";

    line.style.top=y1+"px";

    line.style.width=length+"px";

    line.style.transform=

        `rotate(${angle}deg)`;

    parent.appendChild(line);

}

function nodePixelX(node){

    return node.x*

    bstTree.clientWidth;

}

function nodePixelY(node){

    return node.y*100+28;

}

/* ===========================================
   RENDER TREE
=========================================== */



/* ===========================================
   INSERT
=========================================== */

function insertBST(){

    const value = valueInput.value.trim();

    if(value===""){

        showToast("Enter Value");

        return;

    }

    saveTree();

    root = insertNode(root, Number(value));

    operationCount++;

    renderBST();

    const nodes =
        document.querySelectorAll(".tree-node");

    if(nodes.length){

        nodes[nodes.length-1]
            .classList.add("insert-animation");

        setTimeout(()=>{

            nodes[nodes.length-1]
                .classList.remove("insert-animation");

        },800);

    }

    valueInput.value="";

    showToast("Inserted : "+value);

}

function insertNode(root,value){

    if(root===null){

        return new BSTNode(value);

    }

    if(value<root.value){

        root.left =
            insertNode(
                root.left,
                value
            );

    }

    else if(value>root.value){

        root.right =
            insertNode(
                root.right,
                value
            );

    }

    return root;

}

/* ===========================================
   UPDATE INFO
=========================================== */

function updateInfo(){

    document.getElementById("nodeCount").textContent =
        countNodes(root);

    document.getElementById("treeHeight").textContent =
        treeHeight(root);

    document.getElementById("leafCount").textContent =
        leafNodes(root);

    document.getElementById("rootValue").textContent =
        root ? root.value : "-";

    document.getElementById("operationCount").textContent =
        operationCount;

}

/* ===========================================
   HELPERS
=========================================== */

function countNodes(node){

    if(node===null)
        return 0;

    return 1 +
        countNodes(node.left) +
        countNodes(node.right);

}

function treeHeight(node){

    if(node===null)
        return 0;

    return Math.max(

        treeHeight(node.left),

        treeHeight(node.right)

    )+1;

}

function leafNodes(node){

    if(node===null)
        return 0;

    if(node.left===null &&
       node.right===null){

        return 1;

    }

    return leafNodes(node.left) +
           leafNodes(node.right);

}

/* ===========================================
   TOAST
=========================================== */

function showToast(message){

    let toast =
        document.getElementById("toast");

    if(!toast){

        toast =
            document.createElement("div");

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

/* ===========================================
   EVENTS
=========================================== */

insertBtn.addEventListener(
    "click",
    insertBST
);

deleteBtn.addEventListener(
    "click",
    deleteBST
);

searchBtn.addEventListener(
    "click",
    searchBST
);

randomBtn.addEventListener(
    "click",
    randomBST
);

clearBtn.addEventListener(
    "click",
    clearBST
);


renderBST();

window.addEventListener("load",()=>{

    renderBST();

    showToast("BST Visualizer Ready");

});



/* ===========================================
   DELETE
=========================================== */

function deleteBST(){

    const value = Number(valueInput.value);

    if(isNaN(value)){

        showToast("Enter Value");

        return;

    }

    saveTree();

    root = deleteNode(root, value);

    operationCount++;

    renderBST();

    showToast("Deleted : " + value);

}

function deleteNode(node, value){

    if(node===null)
        return null;

    if(value < node.value){

        node.left = deleteNode(node.left, value);

    }

    else if(value > node.value){

        node.right = deleteNode(node.right, value);

    }

    else{

        if(node.left===null)
            return node.right;

        if(node.right===null)
            return node.left;

        let successor = node.right;

        while(successor.left){

            successor = successor.left;

        }

        node.value = successor.value;

        node.right =
            deleteNode(node.right, successor.value);

    }

    return node;

}

/* ===========================================
   SEARCH
=========================================== */

async function searchBST(){

    const value = Number(valueInput.value);

    if(isNaN(value)){

        showToast("Enter Value");

        return;

    }

    const nodes =
document.querySelectorAll(".tree-node");

    for(const node of nodes){

        node.classList.add("search-highlight");

        await new Promise(r=>setTimeout(r,300));

        if(Number(node.textContent)===value){

            showToast("Node Found");

            return;

        }

        node.classList.remove("search-highlight");

    }

    showToast("Node Not Found");

}

/* ===========================================
   RANDOM TREE
=========================================== */

function randomBST(){

    root = null;

    operationCount = 0;

   const values = new Set();

while (values.size < 8) {

    values.add(
        Math.floor(Math.random() * 90) + 10
    );

}

values.forEach(value => {

    root = insertNode(root, value);

});

    renderBST();

    showToast("Random Tree Created");

}

/* ===========================================
   CLEAR
=========================================== */

function clearBST(){

    root = null;

    operationCount = 0;

    renderBST();

    showToast("Tree Cleared");

    traversalOutput.innerHTML =
    "No Traversal Yet";

}

/* ===========================================
   KEYBOARD
=========================================== */

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        insertBST();

    }

});

/* ===========================================
   INORDER
=========================================== */

function inorderTraversal(){

    const result=[];

    inorder(root,result);

    traversalOutput.innerHTML=result.join(" → ");

    showToast("Inorder Completed");

}

function inorder(node,result){

    if(node===null)
        return;

    inorder(node.left,result);

    result.push(node.value);

    inorder(node.right,result);

}

/* ===========================================
   PREORDER
=========================================== */

function preorderTraversal(){

    const result=[];

    preorder(root,result);

    traversalOutput.innerHTML=result.join(" → ");

    showToast("Preorder Completed");

}

function preorder(node,result){

    if(node===null)
        return;

    result.push(node.value);

    preorder(node.left,result);

    preorder(node.right,result);

}

/* ===========================================
   POSTORDER
=========================================== */

function postorderTraversal(){

    const result=[];

    postorder(root,result);

    traversalOutput.innerHTML=result.join(" → ");

    showToast("Postorder Completed");

}

function postorder(node,result){

    if(node===null)
        return;

    postorder(node.left,result);

    postorder(node.right,result);

    result.push(node.value);

}


/* ===========================================
   LEVEL ORDER
=========================================== */

function levelOrderTraversal(){

    if(root===null){

        traversalOutput.innerHTML="Tree Empty";

        showToast("Tree Empty");

        return;

    }

    const queue=[root];

    const result=[];

    while(queue.length){

        const node=queue.shift();

        result.push(node.value);

        if(node.left)
            queue.push(node.left);

        if(node.right)
            queue.push(node.right);

    }

    traversalOutput.innerHTML=result.join(" → ");

    showToast("Level Order Completed");

}

inorderBtn.addEventListener(
    "click",
    inorderTraversal
);

preorderBtn.addEventListener(
    "click",
    preorderTraversal
);

postorderBtn.addEventListener(
    "click",
    postorderTraversal
);

levelorderBtn.addEventListener(
    "click",
    levelOrderTraversal
);

/* ===========================================
   DEMO
=========================================== */

async function demoBST(){

    clearBST();

    await new Promise(r=>setTimeout(r,500));

    const nums=[50,30,70,20,40,60,80];

    for(const n of nums){

        valueInput.value=n;

        insertBST();

        await new Promise(r=>setTimeout(r,700));

    }

}

/* ===========================================
   UNDO
=========================================== */

let previousRoot=null;

function saveTree(){

    previousRoot=
        JSON.stringify(root);

}

function undoBST(){

    if(previousRoot===null)
        return;

    root=
        JSON.parse(previousRoot);

    renderBST();

    showToast("Undo");

}

/* ===========================================
   EXPORT
=========================================== */

function exportBST(){

    const data=
        JSON.stringify(root);

    console.log(data);

    showToast("BST Exported");

}

/* ===========================================
   IMPORT
=========================================== */

function importBST(json){

    root=JSON.parse(json);

    renderBST();

    showToast("BST Imported");

}

