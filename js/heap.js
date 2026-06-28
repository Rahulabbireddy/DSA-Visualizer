
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}

/* ===========================================
   HEAP VISUALIZER
=========================================== */

let heap = [];

let swapCount = 0;

const heapTree = document.getElementById("heapTree");
const heapArray = document.getElementById("heapArray");

const valueInput = document.getElementById("heapValue");

const insertBtn = document.getElementById("insertBtn");
const deleteBtn = document.getElementById("deleteBtn");
const heapifyBtn = document.getElementById("heapifyBtn");
const randomBtn = document.getElementById("randomBtn");
const clearBtn = document.getElementById("clearBtn");
const searchBtn=document.getElementById("searchBtn");


/* ===========================================
   RENDER HEAP
=========================================== */

function renderHeap(){

    renderArray();

    renderTree();

    updateInfo();

}

/* ===========================================
   RENDER
=========================================== */
function renderTree(){

    heapTree.innerHTML="";

    if(heap.length===0) return;

    let index=0;
    let level=0;

    while(index<heap.length){

        const levelDiv=document.createElement("div");

        levelDiv.className="heap-level";

        const totalNodes=Math.pow(2,level);

        for(let i=0;i<totalNodes && index<heap.length;i++){

            const wrapper=document.createElement("div");

            wrapper.className="heap-node-wrapper";

            const node=document.createElement("div");

            node.className="heap-node";

            node.textContent=heap[index];

            node.classList.add("insert-animation");

            wrapper.appendChild(node);

            levelDiv.appendChild(wrapper);

            index++;

        }

        heapTree.appendChild(levelDiv);

        level++;

    }

}
/* ===========================================
   RENDER
=========================================== */


/* ===========================================
   ARRAY VIEW
=========================================== */

function renderArray(){

    heapArray.innerHTML="";

    heap.forEach(value=>{

        const box=document.createElement("div");

        box.className="heap-box";

        box.textContent=value;

        heapArray.appendChild(box);

    });

}

/* ===========================================
   TREE VIEW
=========================================== */



/* ===========================================
   INFO
=========================================== */

function updateInfo(){

    document.getElementById("nodeCount").textContent=heap.length;

    document.getElementById("heapHeight").textContent=
        heap.length===0 ? 0 :
        Math.floor(Math.log2(heap.length))+1;

    document.getElementById("swapCount").textContent=
        swapCount;

}

/* ===========================================
   INSERT
=========================================== */

function insertHeap(){

    const value=valueInput.value.trim();

    if(value===""){

        showToast("Enter Value");

        return;

    }

    heap.push(Number(value));

showToast("Inserted : "+value);

heapifyUp(heap.length-1);

renderHeap();

    valueInput.value="";

}

/* ===========================================
   HEAPIFY UP
=========================================== */

function heapifyUp(index){

    while(index>0){

        let parent=Math.floor((index-1)/2);

        if(heap[parent]<=heap[index]){

            break;

        }

        [heap[parent],heap[index]]=
        [heap[index],heap[parent]];

        swapCount++;

        renderHeap();

        index=parent;

    }

}

insertBtn.addEventListener("click",insertHeap);

renderHeap();

/* ===========================================
   DELETE ROOT
=========================================== */

function deleteRoot(){

    if(heap.length===0){

        showToast("Heap Empty");

        return;

    }

    heap[0]=heap[heap.length-1];

    heap.pop();

    heapifyDown(0);

    renderHeap();

}

deleteBtn.addEventListener("click",deleteRoot);



/* ===========================================
   HEAPIFY DOWN
=========================================== */

function heapifyDown(index){

    while(true){

        let left=2*index+1;
        let right=2*index+2;

        let smallest=index;

        if(left<heap.length &&
            heap[left]<heap[smallest]){

            smallest=left;

        }

        if(right<heap.length &&
            heap[right]<heap[smallest]){

            smallest=right;

        }

        if(smallest===index){

            break;

        }

        [heap[index],heap[smallest]]=
        [heap[smallest],heap[index]];

        swapCount++;

        renderHeap();

        index=smallest;

    }

}

/* ===========================================
   BUILD HEAP
=========================================== */

function buildHeap(){

    for(let i=Math.floor(heap.length/2)-1;i>=0;i--){

        heapifyDown(i);

    }

    renderHeap();

    showToast("Heapified");

}

/* ===========================================
   RANDOM HEAP
=========================================== */

function randomHeap(){

    heap=[];

    swapCount=0;

    for(let i=0;i<7;i++){

        heap.push(Math.floor(Math.random()*90)+10);

    }

    for(let i=Math.floor(heap.length/2)-1;i>=0;i--){

        heapifyDown(i);

    }

    renderHeap();

}

randomBtn.addEventListener("click",randomHeap);

/* ===========================================
   CLEAR
=========================================== */

function clearHeap(){

    heap=[];

    swapCount=0;

    renderHeap();

}

clearBtn.addEventListener("click",clearHeap);

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

function searchHeap(){

    const value=Number(valueInput.value);

    const nodes=document.querySelectorAll(".heap-node");

    for(let i=0;i<heap.length;i++){

        if(heap[i]===value){

            nodes[i].classList.add("search-highlight");

            showToast("Found");

            setTimeout(()=>{

                nodes[i].classList.remove("search-highlight");

            },1500);

            return;

        }

    }

    showToast("Not Found");

}

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        insertHeap();

    }

});

async function demo(){

    clearHeap();

    await new Promise(r=>setTimeout(r,500));

    const nums=[50,30,70,20,10];

    for(const n of nums){

        valueInput.value=n;

        insertHeap();

        await new Promise(r=>setTimeout(r,700));

    }

    await new Promise(r=>setTimeout(r,700));

    deleteRoot();

}


heapifyBtn.addEventListener("click", buildHeap);

searchBtn.addEventListener("click",searchHeap);

window.addEventListener("load",()=>{

    renderHeap();

    showToast("Heap Visualizer Ready");

});