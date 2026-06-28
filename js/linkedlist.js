
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}

/* ===========================================
   LINKED LIST VISUALIZER
=========================================== */

class Node {

    constructor(value) {

        this.value = value;

        this.next = null;

    }

}

let head = null;

let insertCount = 0;
let deleteCount = 0;
let searchCount = 0;

let history = [];

/* ===========================================
   DOM
=========================================== */

const container = document.getElementById("linkedListContainer");

const valueInput = document.getElementById("nodeValue");

const positionInput = document.getElementById("nodePosition");

const insertBeginBtn = document.getElementById("insertBegin");
const insertEndBtn = document.getElementById("insertEnd");
const insertPosBtn = document.getElementById("insertPos");

const deleteBeginBtn = document.getElementById("deleteBegin");
const deleteEndBtn = document.getElementById("deleteEnd");
const deletePosBtn = document.getElementById("deletePos");

const searchBtn = document.getElementById("searchBtn");
const reverseBtn = document.getElementById("reverseBtn");
const clearBtn = document.getElementById("clearBtn");


/* ===========================================
   RENDER LINKED LIST
=========================================== */

function renderList() {

    container.innerHTML = "";

    let current = head;

    while (current != null) {

        const node = document.createElement("div");

node.className = "list-node";

node.classList.add("insert-animation");   // <-- ADD THIS LINE

node.textContent = current.value;

container.appendChild(node);

        if (current.next != null) {

            const arrow = document.createElement("div");

            arrow.className = "arrow";

            arrow.innerHTML = "➜";

            container.appendChild(arrow);

        }

        current = current.next;

    }

    updateInfo();

    updateHistory();

}

/* ===========================================
   UPDATE INFO
=========================================== */

function updateInfo() {

    let count = 0;

    let current = head;

    let tail = null;

    while (current != null) {

        count++;

        tail = current;

        current = current.next;

    }

    document.getElementById("totalNodes").textContent = count;

    document.getElementById("headNode").textContent =
        head ? head.value : "NULL";

    document.getElementById("tailNode").textContent =
        tail ? tail.value : "NULL";

    document.getElementById("insertCount").textContent =
        insertCount;

    document.getElementById("deleteCount").textContent =
        deleteCount;

    document.getElementById("searchCount").textContent =
        searchCount;

}

function disableButtons(state){

    insertBeginBtn.disabled=state;

    insertEndBtn.disabled=state;

    insertPosBtn.disabled=state;

    deleteBeginBtn.disabled=state;

    deleteEndBtn.disabled=state;

    deletePosBtn.disabled=state;

    searchBtn.disabled=state;

    reverseBtn.disabled=state;

    clearBtn.disabled=state;

}

/* ===========================================
   HISTORY
=========================================== */

function updateHistory() {

    const box = document.getElementById("historyBox");

    if (history.length === 0) {

        box.innerHTML = "No operations yet.";

        return;

    }

    box.innerHTML = history.join("<br>");

}

renderList();

/* ===========================================
   INSERT AT END
=========================================== */

function insertEnd() {

    const value = valueInput.value.trim();

    if (value === "") {

        showToast("Please enter a value");

        return;

    }

    const newNode = new Node(Number(value));

    if (head === null) {

        head = newNode;

    } else {

        let current = head;

        while (current.next !== null) {

            current = current.next;

        }

        current.next = newNode;

    }

    insertCount++;

    history.unshift("Insert End : " + value);

    if (history.length > 10) {

        history.pop();

    }

    renderList();

    valueInput.value = "";

}

insertEndBtn.addEventListener("click", insertEnd);

insertEndBtn.addEventListener("click", insertEnd);

/* ===========================================
   INSERT AT BEGINNING
=========================================== */

function insertBegin() {

    const value = valueInput.value.trim();

    if (value === "") {

        showToast("Please enter a value");

        return;

    }

    const newNode = new Node(Number(value));

    newNode.next = head;

    head = newNode;

    insertCount++;

    history.unshift("Insert Begin : " + value);

    if (history.length > 10) {

        history.pop();

    }

    renderList();

    valueInput.value = "";

}

insertBeginBtn.addEventListener("click", insertBegin);

function insertPosition(){

    const value=Number(valueInput.value);
    const pos=Number(positionInput.value);

    if(pos<0){
        showToast("Invalid Position");
        return;
    }

    const newNode=new Node(value);

    if(pos===0){
        newNode.next=head;
        head=newNode;
    }
    else{

        let current=head;
        let index=0;

        while(current!=null && index<pos-1){

            current=current.next;
            index++;

        }

        if(current==null){
            showToast("Position Out of Range");
            return;
        }

        newNode.next=current.next;
        current.next=newNode;

    }

    insertCount++;

    history.unshift("Insert Position : "+value);

    renderList();

}

insertPosBtn.addEventListener("click",insertPosition);

function deleteBegin(){

    if(head==null){

        showToast("List Empty");

        return;

    }

    const firstNode=document.querySelector(".list-node");

    if(firstNode){

        firstNode.classList.add("delete-animation");

    }

    setTimeout(()=>{

        head=head.next;

        deleteCount++;

        history.unshift("Delete Begin");

        renderList();

    },400);

}
deleteBeginBtn.addEventListener("click",deleteBegin);

function deleteEnd(){

    if(head==null){

        showToast("List Empty");

        return;

    }

    if(head.next==null){

        head=null;

    }
    else{

        let current=head;

        while(current.next.next!=null){

            current=current.next;

        }

        current.next=null;

    }

    deleteCount++;

    history.unshift("Delete End");

    renderList();

}

deleteEndBtn.addEventListener("click",deleteEnd);

function deletePosition(){

    const pos=Number(positionInput.value);

    if(head==null){

        showToast("List Empty");

        return;

    }

    if(pos===0){

        head=head.next;

    }
    else{

        let current=head;

        let index=0;

        while(current.next!=null && index<pos-1){

            current=current.next;

            index++;

        }

        if(current.next==null){

            showToast("Invalid Position");

            return;

        }

        current.next=current.next.next;

    }

    deleteCount++;

    history.unshift("Delete Position");

    renderList();

}

deletePosBtn.addEventListener("click",deletePosition);

async function searchNode(){

    const value=Number(valueInput.value);

    const nodes=document.querySelectorAll(".list-node");

    let current=head;

    let index=0;

    searchCount++;

    updateInfo();

    while(current){

        nodes[index].classList.add("current");

        await new Promise(resolve=>setTimeout(resolve,500));

        if(current.value===value){

            nodes[index].classList.remove("current");

            nodes[index].classList.add("found");

            showToast("Found : "+value);

            return;

        }

        nodes[index].classList.remove("current");

        current=current.next;

        index++;

    }

    showToast("Not Found");

}

searchBtn.addEventListener("click",searchNode);

async function reverseList(){

    const nodes=document.querySelectorAll(".list-node");

    disableButtons(true);

    nodes.forEach(node=>{

        node.classList.add("reverse-node");

    });

    await new Promise(resolve=>setTimeout(resolve,600));

    let prev=null;

    let current=head;

    while(current){

        let next=current.next;

        current.next=prev;

        prev=current;

        current=next;

    }

    head=prev;

    history.unshift("Reverse");

    if(history.length>10){

        history.pop();

    }

    renderList();

    disableButtons(false);

    showToast("Linked List Reversed");

}

reverseBtn.addEventListener("click",reverseList);

function clearList(){

    head=null;

    history=[];

    insertCount=0;

    deleteCount=0;

    searchCount=0;

    renderList();

}

clearBtn.addEventListener("click",clearList);

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

document.addEventListener("keydown",function(e){

    if(e.key==="Enter"){

        insertEnd();

    }

});

async function demo(){

    clearList();

    await new Promise(r=>setTimeout(r,500));

    for(let i=1;i<=5;i++){

        valueInput.value=i*10;

        insertEnd();

        await new Promise(r=>setTimeout(r,700));

    }

    valueInput.value=30;

    await searchNode();

    await new Promise(r=>setTimeout(r,800));

    await reverseList();

}

window.addEventListener("load",()=>{

    renderList();

    showToast("Linked List Visualizer Ready");

});