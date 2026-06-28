if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}

/* ===========================================
   STACK VISUALIZER
=========================================== */

let stack = [];
const MAX_SIZE = 10;

let pushCount = 0;
let popCount = 0;
let peekCount = 0;
let history = [];
let previousStack = [];

/* ===========================================
   DOM ELEMENTS
=========================================== */

const stackContainer = document.getElementById("stackContainer");
const valueInput = document.getElementById("stackValue");

const pushBtn = document.getElementById("pushBtn");
const popBtn = document.getElementById("popBtn");
const peekBtn = document.getElementById("peekBtn");
const clearBtn = document.getElementById("clearBtn");
const randomBtn = document.getElementById("randomBtn");

/* ===========================================
   RENDER STACK
=========================================== */

function renderStack() {

    stackContainer.innerHTML = "";

    for (let i = stack.length - 1; i >= 0; i--) {

        const box = document.createElement("div");

        box.className = "stack-box";

        box.textContent = stack[i];

        stackContainer.appendChild(box);

    }

    updateInfo();

updateHistory();

}

function saveState(){

    previousStack=[...stack];

}

function undo(){

    stack=[...previousStack];

    renderStack();

    showToast("Undo Successful");

}
/* ===========================================
   UPDATE INFORMATION
=========================================== */

function updateInfo() {

    document.getElementById("stackSize").textContent = stack.length;

    document.getElementById("stackTop").textContent =
        stack.length ? stack[stack.length - 1] : "-";

    document.getElementById("stackStatus").textContent =
        stack.length ? "Not Empty" : "Empty";

    document.getElementById("stackCapacity").textContent =
        stack.length + " / " + MAX_SIZE;

    document.getElementById("pushCount").textContent = pushCount;

    document.getElementById("popCount").textContent = popCount;

    document.getElementById("peekCount").textContent = peekCount;

}

function disableButtons(state){

    pushBtn.disabled=state;

    popBtn.disabled=state;

    peekBtn.disabled=state;

    clearBtn.disabled=state;

    randomBtn.disabled=state;

}

/* ===========================================
   HISTORY
=========================================== */

function updateHistory() {

    const historyBox = document.getElementById("stackHistory");

    if (history.length === 0) {

        historyBox.innerHTML = "No operations yet.";

        return;

    }

    historyBox.innerHTML = history.join("<br>");

}

/* ===========================================
   INITIALIZE
=========================================== */

renderStack();

/* ===========================================
   PUSH
=========================================== */

function pushElement() {

    const value = valueInput.value.trim();

    if (value === "") {

        showToast("Please enter a value");

        return;

    }

    if (stack.length >= MAX_SIZE) {

        showToast("Stack Overflow");

        stackContainer.classList.add("shake");

        setTimeout(() => {

            stackContainer.classList.remove("shake");

        }, 400);

        return;

    }

    disableButtons(true);

    saveState();

    stack.push(Number(value));

    pushCount++;

    history.unshift("Push : " + value);

    if (history.length > 10) {

        history.pop();

    }

    renderStack();

    const boxes = document.querySelectorAll(".stack-box");

    if (boxes.length > 0) {

        boxes[0].classList.add("push-animation");

    }

    valueInput.value = "";

    showToast("Pushed : " + value);

    setTimeout(() => {

        disableButtons(false);

    }, 400);

}

/* ===========================================
   POP
=========================================== */

function popElement() {

    if (stack.length === 0) {

        showToast("Stack Underflow");

        return;

    }

    disableButtons(true);

    const boxes = document.querySelectorAll(".stack-box");

    if (boxes.length > 0) {

        boxes[0].classList.add("pop-animation");

    }

    setTimeout(() => {

        const removed = stack.pop();

        history.unshift("Pop : " + removed);

        if (history.length > 10) {

            history.pop();

        }

        popCount++;

        renderStack();

        showToast("Popped : " + removed);

        disableButtons(false);

    }, 400);

}
/* ===========================================
   PEEK
=========================================== */

function peekElement(){

    if(stack.length===0){

        showToast("Stack is Empty");

        return;

    }

    peekCount++;

    updateInfo();

    const boxes=document.querySelectorAll(".stack-box");

    if(boxes.length){

        boxes[0].classList.add("highlight");

        setTimeout(()=>{

            boxes[0].classList.remove("highlight");

        },1000);

    }

    showToast("Top Element : "+stack[stack.length-1]);

}
/* ===========================================
   CLEAR STACK
=========================================== */

function clearStack() {

    if (stack.length === 0) {

        alert("Stack is already empty");

        return;

    }

    saveState();

    stack = [];

    history.unshift("Clear Stack");

if(history.length>10){

history.pop();

}

    renderStack();

}

/* ===========================================
   RANDOM STACK
=========================================== */

function randomStack() {

    stack = [];

    const total = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < total; i++) {

        stack.push(Math.floor(Math.random() * 90) + 10);

    }

    history.unshift("Random Stack");

if(history.length>10){

history.pop();

}

    renderStack();

}


/* ===========================================
   BUTTON EVENTS
=========================================== */

pushBtn.addEventListener("click", pushElement);

popBtn.addEventListener("click", popElement);

peekBtn.addEventListener("click", peekElement);

clearBtn.addEventListener("click", clearStack);

randomBtn.addEventListener("click", randomStack);


/* ===========================================
   TOAST NOTIFICATION
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

/* ===========================================
   ENTER KEY
=========================================== */

document.addEventListener("keydown", function(e){

    if(e.key==="Enter"){

        pushElement();

    }

    if(e.ctrlKey && e.key==="z"){

        undo();

    }

});

function exportStack(){

    const data=JSON.stringify(stack);

    navigator.clipboard.writeText(data);

    showToast("Stack copied to Clipboard");

}

function importStack(){

    const json=prompt("Paste Stack JSON");

    if(!json) return;

    try{

        stack=JSON.parse(json);

        renderStack();

        showToast("Stack Imported");

    }

    catch{

        showToast("Invalid JSON");

    }

}

async function demo(){

    clearStack();

    await new Promise(r=>setTimeout(r,500));

    for(let i=1;i<=5;i++){

        valueInput.value=i*10;

        pushElement();

        await new Promise(r=>setTimeout(r,600));

    }

    popElement();

}

async function autoDemo() {

    clearStack();

    await new Promise(r => setTimeout(r, 500));

    for (let i = 1; i <= 5; i++) {

        valueInput.value = i * 10;

        pushElement();

        await new Promise(r => setTimeout(r, 700));

    }

    await new Promise(r => setTimeout(r, 700));

    popElement();

}

window.addEventListener("load", () => {

    renderStack();

    showToast("Stack Visualizer Ready");

});