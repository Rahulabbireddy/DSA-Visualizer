/* ===========================================
   THEME
=========================================== */

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}

/* ===========================================
   VARIABLES
=========================================== */

let array=[];

let comparisons=0;

let delay=100;

let isPaused=false;

let stopSearch=false;

const arrayContainer=document.getElementById("arrayContainer");

const algorithmSelect=document.getElementById("algorithm");

const arrayInput=document.getElementById("arrayInput");

const searchValueInput=document.getElementById("searchValue");

const generateBtn=document.getElementById("generateBtn");

const startBtn=document.getElementById("startBtn");

const pauseBtn=document.getElementById("pauseBtn");

const resumeBtn=document.getElementById("resumeBtn");

const resetBtn=document.getElementById("resetBtn");

const speedSlider=document.getElementById("speedSlider");

const sizeSlider=document.getElementById("sizeSlider");


/* ===========================================
   RANDOM ARRAY
=========================================== */

function generateArray(size=20){

    array=[];

    for(let i=0;i<size;i++){

        array.push(

            Math.floor(Math.random()*90)+10

        );

    }

    array.sort((a,b)=>a-b);

    renderArray();

    resetStats();

    updateStep("Random Array Generated");

    showToast("Random Array Generated");

}

/* ===========================================
   RENDER ARRAY
=========================================== */

function renderArray(){

    arrayContainer.innerHTML="";

    array.forEach(value=>{

        const bar=document.createElement("div");

        bar.className="array-bar";

        bar.style.height=(value*3)+"px";

        bar.innerHTML=`<span>${value}</span>`;

        arrayContainer.appendChild(bar);

    });

}

/* ===========================================
   CUSTOM ARRAY
=========================================== */

function loadCustomArray(){

    const values=arrayInput.value

    .split(",")

    .map(Number)

    .filter(n=>!isNaN(n))

    .sort((a,b)=>a-b);

    if(values.length===0){

        showToast("Invalid Array");

        return;

    }

    array=[...values];

    renderArray();

    resetStats();

    updateStep("Custom Array Loaded");

}

/* ===========================================
   RESET STATS
=========================================== */

function resetStats(){

    comparisons=0;

    document.getElementById("comparisonCount").textContent=0;

    document.getElementById("currentIndex").textContent="-";

    document.getElementById("searchResult").textContent="-";

    document.getElementById("searchStatus").textContent="Idle";

}

/* ===========================================
   TOAST
=========================================== */

function showToast(message){

    const toast=document.getElementById("toast");

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

/* ===========================================
   CURRENT STEP
=========================================== */

function updateStep(message){

    document.getElementById("currentStep").innerHTML=message;

}

/* ===========================================
   WAIT
=========================================== */

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

async function waitIfPaused(){

    while(isPaused){

        await sleep(100);

    }

    if(stopSearch){

        throw new Error("Stopped");

    }

}

speedSlider.addEventListener("input",function(){

    document.getElementById("speedValue").innerHTML=this.value+"%";

    delay=105-this.value;

});

sizeSlider.addEventListener("input",function(){

    document.getElementById("sizeValue").innerHTML=this.value;

    generateArray(Number(this.value));

});

generateBtn.addEventListener("click",()=>{

    if(arrayInput.value===""){

        generateArray(Number(sizeSlider.value));

    }else{

        loadCustomArray();

    }

});

resetBtn.addEventListener("click",()=>{

    stopSearch=true;

    isPaused=false;

    generateArray(Number(sizeSlider.value));

    updateStep("Waiting for Search...");

});

generateArray(20);

/* ===========================================
   LINEAR SEARCH
=========================================== */

async function linearSearch(){

    const target = Number(searchValueInput.value);

    if(isNaN(target)){

        showToast("Enter Search Value");

        return;

    }

    document.getElementById("searchStatus").textContent="Running";

    document.getElementById("timeComplexity").textContent="O(n)";

    document.getElementById("spaceComplexity").textContent="O(1)";

    const bars=document.querySelectorAll(".array-bar");

    for(let i=0;i<array.length;i++){

        await waitIfPaused();

        comparisons++;

        document.getElementById("comparisonCount").textContent=comparisons;

        document.getElementById("currentIndex").textContent=i;

        updateStep(`Checking index ${i}`);

        bars[i].classList.add("compare");

        await sleep(delay*5);

        if(array[i]===target){

            bars[i].classList.remove("compare");

            bars[i].classList.add("sorted");

            document.getElementById("searchResult").textContent="Found";

            document.getElementById("searchStatus").textContent="Completed";

            updateStep(`Found ${target} at index ${i}`);

            showToast("Element Found");

            return;

        }

        bars[i].classList.remove("compare");

    }

    document.getElementById("searchResult").textContent="Not Found";

    document.getElementById("searchStatus").textContent="Completed";

    updateStep("Element Not Found");

    showToast("Element Not Found");

}

/* ===========================================
   BINARY SEARCH
=========================================== */

async function binarySearch(){

    const target = Number(searchValueInput.value);

    if(isNaN(target)){

        showToast("Enter Search Value");

        return;

    }

    document.getElementById("searchStatus").textContent="Running";

    document.getElementById("timeComplexity").textContent="O(log n)";

    document.getElementById("spaceComplexity").textContent="O(1)";

    let left=0;

    let right=array.length-1;

    const bars=document.querySelectorAll(".array-bar");

    while(left<=right){

        await waitIfPaused();

        const mid=Math.floor((left+right)/2);

        comparisons++;

        document.getElementById("comparisonCount").textContent=comparisons;

        document.getElementById("currentIndex").textContent=mid;

        updateStep(`Checking middle index ${mid}`);

        bars[mid].classList.add("compare");

        await sleep(delay*5);

        if(array[mid]===target){

            bars[mid].classList.remove("compare");

            bars[mid].classList.add("sorted");

            document.getElementById("searchResult").textContent="Found";

            document.getElementById("searchStatus").textContent="Completed";

            updateStep(`Found ${target} at index ${mid}`);

            showToast("Element Found");

            return;

        }

        bars[mid].classList.remove("compare");

        if(array[mid]<target){

            left=mid+1;

        }else{

            right=mid-1;

        }

    }

    document.getElementById("searchResult").textContent="Not Found";

    document.getElementById("searchStatus").textContent="Completed";

    updateStep("Element Not Found");

    showToast("Element Not Found");

}

/* ===========================================
   START SEARCH
=========================================== */

startBtn.addEventListener("click",async()=>{

    stopSearch=false;

    resetStats();

    try{

       switch(algorithmSelect.value){

    case "linear":

        await linearSearch();

        break;

    case "binary":

        await binarySearch();

        break;

    case "jump":

        await jumpSearch();

        break;

    case "interpolation":

        await interpolationSearch();

        break;

}

    }

    catch(e){}

});

pauseBtn.addEventListener("click",()=>{

    isPaused=true;

    document.getElementById("searchStatus").textContent="Paused";

    showToast("Paused");

});

resumeBtn.addEventListener("click",()=>{

    isPaused=false;

    document.getElementById("searchStatus").textContent="Running";

    showToast("Resumed");

});

algorithmSelect.addEventListener("change",function(){

    const desc=document.getElementById("algorithmDescription");

    switch(this.value){

        case "linear":

            desc.innerHTML="Linear Search checks every element one by one.";

            break;

        case "binary":

            desc.innerHTML="Binary Search repeatedly divides the sorted array into halves.";

            break;

        case "jump":

            desc.innerHTML="Jump Search searches by jumping fixed steps before performing a linear scan.";

            break;

        case "interpolation":

            desc.innerHTML="Interpolation Search estimates the likely position of the target value.";

            break;

    }

});

/* ===========================================
   JUMP SEARCH
=========================================== */

async function jumpSearch(){

    const target = Number(searchValueInput.value);

    if(isNaN(target)){

        showToast("Enter Search Value");

        return;

    }

    document.getElementById("searchStatus").textContent="Running";
    document.getElementById("timeComplexity").textContent="O(√n)";
    document.getElementById("spaceComplexity").textContent="O(1)";

    const bars=document.querySelectorAll(".array-bar");

    const step=Math.floor(Math.sqrt(array.length));

    let prev=0;
    let curr=step;

    while(prev<array.length &&
          array[Math.min(curr,array.length)-1] < target){

        await waitIfPaused();

        comparisons++;

        document.getElementById("comparisonCount").textContent=comparisons;

        bars[Math.min(curr,array.length)-1].classList.add("compare");

        updateStep(`Jumping to index ${Math.min(curr,array.length)-1}`);

        await sleep(delay*5);

        bars[Math.min(curr,array.length)-1].classList.remove("compare");

        prev=curr;
        curr+=step;

        if(prev>=array.length){

            document.getElementById("searchResult").textContent="Not Found";
            showToast("Element Not Found");
            return;

        }

    }

    while(prev<Math.min(curr,array.length)){

        await waitIfPaused();

        comparisons++;

        document.getElementById("comparisonCount").textContent=comparisons;

        bars[prev].classList.add("compare");

        updateStep(`Checking index ${prev}`);

        await sleep(delay*5);

        if(array[prev]===target){

            bars[prev].classList.remove("compare");
            bars[prev].classList.add("sorted");

            document.getElementById("searchResult").textContent="Found";
            document.getElementById("searchStatus").textContent="Completed";

            showToast("Element Found");

            return;

        }

        bars[prev].classList.remove("compare");

        prev++;

    }

    document.getElementById("searchResult").textContent="Not Found";

    document.getElementById("searchStatus").textContent="Completed";

    showToast("Element Not Found");

}

/* ===========================================
   INTERPOLATION SEARCH
=========================================== */

async function interpolationSearch(){

    const target=Number(searchValueInput.value);

    if(isNaN(target)){

        showToast("Enter Search Value");

        return;

    }

    document.getElementById("searchStatus").textContent="Running";
    document.getElementById("timeComplexity").textContent="O(log log n)";
    document.getElementById("spaceComplexity").textContent="O(1)";

    const bars=document.querySelectorAll(".array-bar");

    let low=0;
    let high=array.length-1;

    while(low<=high &&
          target>=array[low] &&
          target<=array[high]){

        await waitIfPaused();

        if(array[high]===array[low]){

            break;

        }

        const pos=

        low+

        Math.floor(

        ((target-array[low])*

        (high-low))

        /(array[high]-array[low])

        );

        comparisons++;

        document.getElementById("comparisonCount").textContent=comparisons;

        document.getElementById("currentIndex").textContent=pos;

        bars[pos].classList.add("compare");

        updateStep(`Estimated index ${pos}`);

        await sleep(delay*5);

        if(array[pos]===target){

            bars[pos].classList.remove("compare");

            bars[pos].classList.add("sorted");

            document.getElementById("searchResult").textContent="Found";

            document.getElementById("searchStatus").textContent="Completed";

            showToast("Element Found");

            return;

        }

        bars[pos].classList.remove("compare");

        if(array[pos]<target){

            low=pos+1;

        }else{

            high=pos-1;

        }

    }

    document.getElementById("searchResult").textContent="Not Found";

    document.getElementById("searchStatus").textContent="Completed";

    showToast("Element Not Found");

}

/* ===========================================
   KEYBOARD SHORTCUTS
=========================================== */

document.addEventListener("keydown",e=>{

    switch(e.key.toLowerCase()){

        case "g":

            generateBtn.click();

            break;

        case "s":

            startBtn.click();

            break;

        case "p":

            pauseBtn.click();

            break;

        case "r":

            resumeBtn.click();

            break;

        case "c":

            resetBtn.click();

            break;

    }

});

updateStep("Waiting for Search...");

