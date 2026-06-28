/* ===========================================
   THEME
=========================================== */

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

}

/* ===========================================
   AVL NODE
=========================================== */

class AVLNode {

    constructor(value) {

        this.value = Number(value);

        this.left = null;

        this.right = null;

        this.height = 1;

    }

}

/* ===========================================
   VARIABLES
=========================================== */

let root = null;

let rotationCount = 0;

const avlTree =
    document.getElementById("avlTree");

const valueInput =
    document.getElementById("avlValue");

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
   HEIGHT
=========================================== */

function getHeight(node) {

    return node ? node.height : 0;

}

function updateHeight(node) {

    node.height =
        1 +
        Math.max(
            getHeight(node.left),
            getHeight(node.right)
        );

}

/* ===========================================
   BALANCE FACTOR
=========================================== */

function getBalance(node) {

    if (!node)
        return 0;

    return getHeight(node.left) -
           getHeight(node.right);

}

/* ===========================================
   UPDATE INFO
=========================================== */

function updateInfo() {

    document.getElementById("nodeCount").textContent =
        countNodes(root);

    document.getElementById("treeHeight").textContent =
        getHeight(root);

    document.getElementById("leafCount").textContent =
        leafNodes(root);

    document.getElementById("rootValue").textContent =
        root ? root.value : "-";

    document.getElementById("rotationCount").textContent =
        rotationCount;

    document.getElementById("balanceStatus").textContent =
        root && Math.abs(getBalance(root)) <= 1
            ? "Balanced"
            : "Unbalanced";

}

/* ===========================================
   HELPERS
=========================================== */

function countNodes(node) {

    if (!node)
        return 0;

    return 1 +
        countNodes(node.left) +
        countNodes(node.right);

}

function leafNodes(node) {

    if (!node)
        return 0;

    if (!node.left && !node.right)
        return 1;

    return leafNodes(node.left) +
           leafNodes(node.right);

}

/* ===========================================
   TOAST
=========================================== */

function showToast(message) {

    let toast =
        document.getElementById("toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

/* ===========================================
   INITIALIZE
=========================================== */

updateInfo();

showToast("AVL Visualizer Ready");

/* ===========================================
   LEFT ROTATION
=========================================== */

function leftRotate(x) {

    const y = x.right;

    const t2 = y.left;

    y.left = x;

    x.right = t2;

    updateHeight(x);

    updateHeight(y);

    rotationCount++;

    updateInfo();

    return y;

}

/* ===========================================
   RIGHT ROTATION
=========================================== */

function rightRotate(y) {

    const x = y.left;

    const t2 = x.right;

    x.right = y;

    y.left = t2;

    updateHeight(y);

    updateHeight(x);

    rotationCount++;

    updateInfo();

    return x;

}

/* ===========================================
   INSERT
=========================================== */

function insertAVL() {

    const value = valueInput.value.trim();

    if (value === "") {

        showToast("Enter Value");

        return;

    }

    saveTree();

    root = insertNode(root, Number(value));

    renderAVL();

    valueInput.value = "";

    showToast("Inserted : " + value);

}

function insertNode(node, value) {

    if (node === null)
        return new AVLNode(value);

    if (value < node.value) {

        node.left = insertNode(node.left, value);

    }

    else if (value > node.value) {

        node.right = insertNode(node.right, value);

    }

    else {

        return node;

    }

    updateHeight(node);

    const balance = getBalance(node);

    /* LL */

    if (balance > 1 && value < node.left.value)
        return rightRotate(node);

    /* RR */

    if (balance < -1 && value > node.right.value)
        return leftRotate(node);

    /* LR */

    if (balance > 1 && value > node.left.value) {

        node.left = leftRotate(node.left);

        return rightRotate(node);

    }

    /* RL */

    if (balance < -1 && value < node.right.value) {

        node.right = rightRotate(node.right);

        return leftRotate(node);

    }

    return node;

}

/* ===========================================
   RENDER AVL
=========================================== */

function renderAVL() {

    avlTree.innerHTML = "";

    if (!root) {

        updateInfo();

        return;

    }

    renderTree(root);

    updateInfo();

}

/* ===========================================
   TREE RENDERER
=========================================== */

function renderTree(root) {

    let queue = [root];

    while (queue.length) {

        const levelSize = queue.length;

        const levelDiv =
            document.createElement("div");

        levelDiv.className = "heap-level";

        for (let i = 0; i < levelSize; i++) {

            const node = queue.shift();

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "heap-node-wrapper";

            const circle =
                document.createElement("div");

            circle.className =
                "heap-node";

            circle.textContent =
                node.value;

            wrapper.appendChild(circle);

            levelDiv.appendChild(wrapper);

            if (node.left)
                queue.push(node.left);

            if (node.right)
                queue.push(node.right);

        }

        avlTree.appendChild(levelDiv);

    }

}

/* ===========================================
   EVENTS
=========================================== */

insertBtn.addEventListener(
    "click",
    insertAVL
);

document.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

        insertAVL();

    }

});

/* ===========================================
   MINIMUM NODE
=========================================== */

function minValueNode(node){

    let current = node;

    while(current.left){

        current = current.left;

    }

    return current;

}
/* ===========================================
   DELETE
=========================================== */

function deleteAVL(){

    const value = Number(valueInput.value);

    if(isNaN(value)){

        showToast("Enter Value");

        return;

    }

    saveTree();

    root = deleteNode(root,value);

   renderAVL();

valueInput.value = "";

showToast("Deleted : " + value);

}

function deleteNode(node,value){

    if(node===null)
        return node;

    if(value < node.value){

        node.left = deleteNode(node.left,value);

    }

    else if(value > node.value){

        node.right = deleteNode(node.right,value);

    }

    else{

        if(node.left===null)
            return node.right;

        if(node.right===null)
            return node.left;

        const temp = minValueNode(node.right);

        node.value = temp.value;

        node.right = deleteNode(node.right,temp.value);

    }

    updateHeight(node);

    const balance = getBalance(node);

    /* LL */

    if(balance>1 && getBalance(node.left)>=0)
        return rightRotate(node);

    /* LR */

    if(balance>1 && getBalance(node.left)<0){

        node.left = leftRotate(node.left);

        return rightRotate(node);

    }

    /* RR */

    if(balance<-1 && getBalance(node.right)<=0)
        return leftRotate(node);

    /* RL */

    if(balance<-1 && getBalance(node.right)>0){

        node.right = rightRotate(node.right);

        return leftRotate(node);

    }

    return node;

}

/* ===========================================
   SEARCH
=========================================== */

async function searchAVL(){

    const value = Number(valueInput.value);

    if(isNaN(value)){

        showToast("Enter Value");

        return;

    }

    const nodes =
        document.querySelectorAll(".heap-node");

    for(const node of nodes){

        node.classList.add("search-highlight");

        await new Promise(r=>setTimeout(r,300));

        if(Number(node.textContent)===value){

           valueInput.value = "";

showToast("Node Found");

            return;

        }

        node.classList.remove("search-highlight");

    }

    valueInput.value = "";

    showToast("Node Not Found");

}

/* ===========================================
   RANDOM AVL
=========================================== */

function randomAVL(){

    root = null;

    rotationCount = 0;

    const values = new Set();

    while(values.size<8){

        values.add(
            Math.floor(Math.random()*90)+10
        );

    }

    values.forEach(value=>{


        root = insertNode(root,value);

    });

    renderAVL();

    showToast("Random AVL Created");

}

/* ===========================================
   CLEAR
=========================================== */

function clearAVL(){

    root = null;

    rotationCount = 0;

    traversalOutput.innerHTML =
        "No Traversal Yet";

    renderAVL();

    showToast("Tree Cleared");

}

deleteBtn.addEventListener(
    "click",
    deleteAVL
);

searchBtn.addEventListener(
    "click",
    searchAVL
);

randomBtn.addEventListener(
    "click",
    randomAVL
);

clearBtn.addEventListener(
    "click",
    clearAVL
);

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

/* ===========================================
   DEMO
=========================================== */

async function demoAVL(){

    clearAVL();

    await new Promise(r=>setTimeout(r,500));

    const nums=[50,30,70,20,40,60,80];

    for(const n of nums){

        valueInput.value=n;

        insertAVL();

        await new Promise(r=>setTimeout(r,700));

    }

}

/* ===========================================
   UNDO
=========================================== */

let previousRoot=null;

function saveTree(){

    previousRoot=JSON.stringify(root);

}

function undoAVL(){

    if(previousRoot===null)
        return;

    root=JSON.parse(previousRoot);

    renderAVL();

    showToast("Undo Completed");

}

/* ===========================================
   EXPORT
=========================================== */

function exportAVL(){

    console.log(JSON.stringify(root));

    showToast("AVL Exported");

}

/* ===========================================
   IMPORT
=========================================== */

function importAVL(json){

    root=JSON.parse(json);

    renderAVL();

    showToast("AVL Imported");

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

renderAVL();