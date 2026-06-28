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

let swaps=0;

let delay=100;

let isPaused=false;

let stopSorting=false;

const arrayContainer=
document.getElementById("arrayContainer");

const algorithmSelect=
document.getElementById("algorithm");

const arrayInput=
document.getElementById("arrayInput");

const generateBtn=
document.getElementById("generateBtn");

const startBtn=
document.getElementById("startBtn");

const pauseBtn=
document.getElementById("pauseBtn");

const resumeBtn=
document.getElementById("resumeBtn");

const resetBtn=
document.getElementById("resetBtn");

const speedSlider=
document.getElementById("speedSlider");

const sizeSlider=
document.getElementById("sizeSlider");

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

        bar.innerHTML=

            "<span>"+value+"</span>";

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

    .filter(n=>!isNaN(n));

    if(values.length===0){

        showToast("Invalid Array");

        return;

    }

    array=[...values];

    renderArray();

    resetStats();

    showToast("Custom Array Loaded");

}

/* ===========================================
   RESET STATS
=========================================== */

function resetStats(){

    comparisons=0;

    swaps=0;

    document.getElementById(
        "comparisonCount"
    ).textContent=0;

    document.getElementById(
        "swapCount"
    ).textContent=0;

    document.getElementById(
        "sortStatus"
    ).textContent="Idle";

}

/* ===========================================
   TOAST
=========================================== */

function showToast(message){

    const toast=
    document.getElementById("toast");

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

/* ===========================================
   SPEED
=========================================== */

speedSlider.addEventListener(

"input",

function(){

document.getElementById(
"speedValue"
).innerHTML=this.value+"%";

delay=

105-this.value;

});

/* ===========================================
   SIZE
=========================================== */

sizeSlider.addEventListener(

"input",

function(){

document.getElementById(
"sizeValue"
).innerHTML=this.value;

generateArray(

Number(this.value)

);

});

/* ===========================================
   EVENTS
=========================================== */

generateBtn.addEventListener(

"click",

()=>{

if(arrayInput.value===""){

generateArray(

Number(sizeSlider.value)

);

}

else{

loadCustomArray();

}

}

);

resetBtn.addEventListener(

"click",

()=>{

stopSorting=true;

isPaused=false;

generateArray(

Number(sizeSlider.value)

);

document.getElementById(
"sortStatus"
).textContent="Idle";

updateStep("Waiting to Start...");

}

);

/* ===========================================
   INITIALIZE
=========================================== */

generateArray(20);

/* ===========================================
   SLEEP
=========================================== */

function sleep(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

async function waitIfPaused(){

    while(isPaused){

        await sleep(100);

    }

    if(stopSorting){

        throw new Error("Sorting Stopped");

    }

}

/* ===========================================
   UPDATE STATS
=========================================== */

function updateStats(){

    document.getElementById(
        "comparisonCount"
    ).textContent=comparisons;

    document.getElementById(
        "swapCount"
    ).textContent=swaps;

}

/* ===========================================
   BUBBLE SORT
=========================================== */

async function bubbleSort(){

    document.getElementById(
        "sortStatus"
    ).textContent="Running";

    document.getElementById(
        "currentAlgorithm"
    ).textContent="Bubble Sort";

    document.getElementById(
        "timeComplexity"
    ).textContent="O(n²)";

    document.getElementById(
        "spaceComplexity"
    ).textContent="O(1)";

    const bars=document.querySelectorAll(".array-bar");

    for(let i=0;i<array.length-1;i++){

        for(let j=0;j<array.length-i-1;j++){

            await waitIfPaused();

            bars[j].classList.add("compare");

            bars[j+1].classList.add("compare");

            comparisons++;

            updateStats();

            

updateStep(`Comparing ${array[j]} and ${array[j+1]}`);

await sleep(delay*5);

            if(array[j]>array[j+1]){

                swaps++;

                updateStats();

                [array[j],array[j+1]]=
                [array[j+1],array[j]];

                updateStep(`Swapped ${array[j]} and ${array[j+1]}`);

                
                renderArray();

            }

            bars[j].classList.remove("compare");

            bars[j+1].classList.remove("compare");

        }

    }

    renderArray();

    document.querySelectorAll(".array-bar")

    .forEach(bar=>{

        bar.classList.add("sorted");

    });

    document.getElementById(
        "sortStatus"
    ).textContent="Completed";

    updateStep("Sorting Completed");

    showToast("Bubble Sort Completed");

}

/* ===========================================
   START
=========================================== */

startBtn.addEventListener(

"click",

async()=>{

stopSorting=false;

resetStats();

try{

switch(algorithmSelect.value){

    case "bubble":

        await bubbleSort();

        break;

    case "selection":

        await selectionSort();

        break;

    case "insertion":

        await insertionSort();

        break;

    case "merge":

    await mergeSort();

    break;

case "quick":

    await quickSort();

    break;

case "heap":

    await heapSort();

    break;

default:

    showToast("Invalid Algorithm");

}
}

catch(e){}

}

);

pauseBtn.addEventListener(

"click",

()=>{

isPaused=true;

document.getElementById(
"sortStatus"
).textContent="Paused";

showToast("Paused");

}

);

resumeBtn.addEventListener(

"click",

()=>{

isPaused=false;

document.getElementById(
"sortStatus"
).textContent="Running";

showToast("Resumed");

}

);

/* ===========================================
   ALGORITHM DESCRIPTION
=========================================== */

algorithmSelect.addEventListener("change", function(){

    const desc =
        document.getElementById("algorithmDescription");

    switch(this.value){

        case "bubble":

            desc.innerHTML =
            "Bubble Sort repeatedly compares adjacent elements and swaps them until the array is sorted.";

            break;

        case "selection":

            desc.innerHTML =
            "Selection Sort repeatedly selects the minimum element and places it at the beginning.";

            break;

        case "insertion":

            desc.innerHTML =
            "Insertion Sort inserts each element into its correct position.";

            break;

        case "merge":

            desc.innerHTML =
            "Merge Sort uses divide-and-conquer to recursively sort arrays.";

            break;

        case "quick":

            desc.innerHTML =
            "Quick Sort selects a pivot and partitions the array.";

            break;

        case "heap":

            desc.innerHTML =
            "Heap Sort builds a heap and repeatedly extracts the maximum element.";

            break;

    }

});

/* ===========================================
   SELECTION SORT
=========================================== */

async function selectionSort(){

    document.getElementById("sortStatus").textContent="Running";
    document.getElementById("currentAlgorithm").textContent="Selection Sort";
    document.getElementById("timeComplexity").textContent="O(n²)";
    document.getElementById("spaceComplexity").textContent="O(1)";

    for(let i=0;i<array.length-1;i++){

        let min=i;

        for(let j=i+1;j<array.length;j++){

            await waitIfPaused();

            updateStep("Searching minimum element");

            comparisons++;
            
            updateStats();

            renderArray();

            const bars=document.querySelectorAll(".array-bar");

            bars[min].classList.add("compare");
            bars[j].classList.add("compare");

            await sleep(delay*5);

            if(array[j]<array[min]){

                min=j;

            }

            renderArray();

        }

        if(min!==i){

            swaps++;
            updateStats();

            [array[i],array[min]]=[array[min],array[i]];

            updateStep("Placed minimum element");

            renderArray();

        }

    }

    document.querySelectorAll(".array-bar").forEach(bar=>{

        bar.classList.add("sorted");

    });

    document.getElementById("sortStatus").textContent="Completed";

    updateStep("Sorting Completed");

    showToast("Selection Sort Completed");

}

/* ===========================================
   INSERTION SORT
=========================================== */

async function insertionSort(){

    document.getElementById("sortStatus").textContent="Running";
    document.getElementById("currentAlgorithm").textContent="Insertion Sort";
    document.getElementById("timeComplexity").textContent="O(n²)";
    document.getElementById("spaceComplexity").textContent="O(1)";

    for(let i=1;i<array.length;i++){

        let key=array[i];

        let j=i-1;

        while(j>=0 && array[j]>key){

            updateStep(`Moving ${array[j]}`);

            await waitIfPaused();

            comparisons++;
            swaps++;

            updateStats();

            array[j+1]=array[j];

            renderArray();

            await sleep(delay*5);

            j--;

        }

        array[j+1]=key;

        updateStep(`Inserted ${key}`);

        renderArray();

    }

    document.querySelectorAll(".array-bar").forEach(bar=>{

        bar.classList.add("sorted");

    });

    document.getElementById("sortStatus").textContent="Completed";

    updateStep("Sorting Completed");

    showToast("Insertion Sort Completed");

}

/* ===========================================
   MERGE SORT
=========================================== */

async function mergeSort(){

    document.getElementById("sortStatus").textContent="Running";
    document.getElementById("currentAlgorithm").textContent="Merge Sort";
    document.getElementById("timeComplexity").textContent="O(n log n)";
    document.getElementById("spaceComplexity").textContent="O(n)";

    await mergeSortRecursive(0,array.length-1);

    renderArray();

    document.querySelectorAll(".array-bar").forEach(bar=>{

        bar.classList.add("sorted");

    });

    document.getElementById("sortStatus").textContent="Completed";

    updateStep("Sorting Completed");

    showToast("Merge Sort Completed");

}

async function mergeSortRecursive(left,right){

    if(left>=right) return;

    const mid=Math.floor((left+right)/2);

    await mergeSortRecursive(left,mid);

    await mergeSortRecursive(mid+1,right);

    await merge(left,mid,right);

}

async function merge(left,mid,right){

    const temp=[];

    let i=left;
    let j=mid+1;

    while(i<=mid && j<=right){

        comparisons++;

        updateStats();

        await waitIfPaused();

        if(array[i]<=array[j]){

            temp.push(array[i++]);

        }else{

            temp.push(array[j++]);

        }

    }

    while(i<=mid){

        temp.push(array[i++]);

    }

    while(j<=right){

        temp.push(array[j++]);

    }

    for(let k=left;k<=right;k++){

        updateStep("Merging...");

        array[k]=temp[k-left];

        renderArray();

        await sleep(delay*4);

    }

}

/* ===========================================
   QUICK SORT
=========================================== */

async function quickSort(){

    document.getElementById("sortStatus").textContent="Running";
    document.getElementById("currentAlgorithm").textContent="Quick Sort";
    document.getElementById("timeComplexity").textContent="O(n log n)";
    document.getElementById("spaceComplexity").textContent="O(log n)";

    await quickSortRecursive(0,array.length-1);

    renderArray();

    document.querySelectorAll(".array-bar").forEach(bar=>{

        bar.classList.add("sorted");

    });

    document.getElementById("sortStatus").textContent="Completed";

    updateStep("Sorting Completed");

    showToast("Quick Sort Completed");

}

async function quickSortRecursive(low,high){

    if(low<high){

        const pi=await partition(low,high);

        await quickSortRecursive(low,pi-1);

        await quickSortRecursive(pi+1,high);

    }

}

async function partition(low,high){

    const pivot=array[high];

    let i=low-1;

    for(let j=low;j<high;j++){

        comparisons++;

        updateStats();

        await waitIfPaused();

        updateStep(`Pivot = ${pivot}`);

        if(array[j]<pivot){

            i++;

            swaps++;

            [array[i],array[j]]=[array[j],array[i]];

            renderArray();

            await sleep(delay*4);

        }

    }

    swaps++;

    [array[i+1],array[high]]=[array[high],array[i+1]];

    renderArray();

    await sleep(delay*4);

    return i+1;

}

/* ===========================================
   HEAP SORT
=========================================== */

async function heapSort(){

    document.getElementById("sortStatus").textContent="Running";
    document.getElementById("currentAlgorithm").textContent="Heap Sort";
    document.getElementById("timeComplexity").textContent="O(n log n)";
    document.getElementById("spaceComplexity").textContent="O(1)";

    const n=array.length;

    for(let i=Math.floor(n/2)-1;i>=0;i--){

        await heapify(n,i);

    }

    for(let i=n-1;i>0;i--){

        swaps++;

        [array[0],array[i]]=[array[i],array[0]];

        renderArray();

        await sleep(delay*4);

        await heapify(i,0);

    }

    renderArray();

    document.querySelectorAll(".array-bar").forEach(bar=>{

        bar.classList.add("sorted");

    });

    document.getElementById("sortStatus").textContent="Completed";

    updateStep("Sorting Completed");

    showToast("Heap Sort Completed");

}

async function heapify(n,i){

    updateStep("Heapifying...");

    let largest=i;

    const left=2*i+1;

    const right=2*i+2;

    if(left<n){

        comparisons++;

        if(array[left]>array[largest]){

            largest=left;

        }

    }

    if(right<n){

        comparisons++;

        if(array[right]>array[largest]){

            largest=right;

        }

    }

    updateStats();

    if(largest!==i){

        swaps++;

        [array[i],array[largest]]=[array[largest],array[i]];

        renderArray();

        await sleep(delay*4);

        await heapify(n,largest);

    }

}

/* ===========================================
   CURRENT STEP
=========================================== */

function updateStep(message){

    document.getElementById(
        "currentStep"
    ).innerHTML = message;

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
