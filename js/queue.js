
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}

/* ===========================================
   QUEUE VISUALIZER
=========================================== */

let queue = [];

const MAX_SIZE = 10;

let enqueueCount = 0;
let dequeueCount = 0;
let frontCount = 0;
let history = [];

/* ===========================================
   DOM ELEMENTS
=========================================== */

const queueContainer = document.getElementById("queueContainer");

const valueInput = document.getElementById("queueValue");

const enqueueBtn = document.getElementById("enqueueBtn");
const dequeueBtn = document.getElementById("dequeueBtn");
const frontBtn = document.getElementById("frontBtn");
const clearBtn = document.getElementById("clearBtn");
const randomBtn = document.getElementById("randomBtn");

/* ===========================================
   RENDER QUEUE
=========================================== */

function renderQueue(){

    queueContainer.innerHTML="";

    queue.forEach((value,index)=>{

        const wrapper=document.createElement("div");

        wrapper.className="queue-wrapper";

        const box=document.createElement("div");

        box.className="queue-box";

        box.textContent=value;

        wrapper.appendChild(box);

        queueContainer.appendChild(wrapper);

    });

    updateInfo();

updateHistory();

}

/* ===========================================
   UPDATE INFO
=========================================== */

function updateInfo(){

    document.getElementById("queueSize").textContent=
        queue.length;

    document.getElementById("queueFront").textContent=
        queue.length ? queue[0] : "-";

    document.getElementById("queueRear").textContent=
        queue.length ? queue[queue.length-1] : "-";

    document.getElementById("queueCapacity").textContent=
        queue.length+" / "+MAX_SIZE;

    document.getElementById("enqueueCount").textContent=
        enqueueCount;

    document.getElementById("dequeueCount").textContent=
        dequeueCount;

    document.getElementById("frontCount").textContent=
        frontCount;

}

renderQueue();

function disableButtons(state){

    enqueueBtn.disabled=state;

    dequeueBtn.disabled=state;

    frontBtn.disabled=state;

    clearBtn.disabled=state;

    randomBtn.disabled=state;

}

/* ===========================================
   HISTORY
=========================================== */

function updateHistory() {

    const historyBox = document.getElementById("queueHistory");

    if (history.length === 0) {

        historyBox.innerHTML = "No operations yet.";

        return;

    }

    historyBox.innerHTML = history.join("<br>");

}


/* ===========================================
   ENQUEUE
=========================================== */

function enqueue(){

    const value=valueInput.value.trim();

    if(value===""){

        showToast("Enter a value");

        return;

    }

    if(queue.length>=MAX_SIZE){

        showToast("Queue Overflow");

queueContainer.classList.add("shake");

setTimeout(()=>{

queueContainer.classList.remove("shake");

},400);

        return;

    }

    disableButtons(true);

    queue.push(Number(value));

history.unshift("Enqueue : " + value);

if(history.length>10){

    history.pop();

}

    enqueueCount++;

    showToast("Enqueued : " + value);

    renderQueue();

    setTimeout(()=>{

disableButtons(false);

},400);

const boxes=document.querySelectorAll(".queue-box");

if(boxes.length){

boxes[boxes.length-1].classList.add("enqueue-animation");

}

    valueInput.value="";

}

enqueueBtn.addEventListener("click",enqueue);

dequeueBtn.addEventListener("click", dequeue);

frontBtn.addEventListener("click", frontElement);


/* ===========================================
   DEQUEUE
=========================================== */

function dequeue(){

    if(queue.length===0){

        showToast("Queue Underflow");

        return;

    }

    disableButtons(true);

    const boxes=document.querySelectorAll(".queue-box");

    if(boxes.length){

        boxes[0].classList.add("dequeue-animation");

    }

    setTimeout(()=>{

        const removed=queue.shift();

        history.unshift("Dequeue : "+removed);

        if(history.length>10){

            history.pop();

        }

        dequeueCount++;

        renderQueue();

        disableButtons(false);

        showToast("Dequeued : "+removed);

    },400);

}

/* ===========================================
   FRONT
=========================================== */

function frontElement(){

    if(queue.length===0){

        showToast("Queue is Empty");

        return;

    }

    frontCount++;

    updateInfo();

    const boxes=document.querySelectorAll(".queue-box");

    if(boxes.length){

        boxes[0].classList.add("front-highlight");

        setTimeout(()=>{

            boxes[0].classList.remove("front-highlight");

        },1000);

    }

    showToast("Front : "+queue[0]);

}

/* ===========================================
   CLEAR
=========================================== */

function clearQueue() {

    queue = [];

    history.unshift("Clear Queue");

if(history.length>10){

    history.pop();

}

    renderQueue();

}

clearBtn.addEventListener("click", clearQueue);

/* ===========================================
   RANDOM QUEUE
=========================================== */

function randomQueue() {

    queue = [];

    const total = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < total; i++) {

        queue.push(Math.floor(Math.random() * 90) + 10);

    }

    history.unshift("Random Queue");

if(history.length>10){

    history.pop();

}

    renderQueue();

}

randomBtn.addEventListener("click", randomQueue);

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


valueInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        enqueue();

    }

});


