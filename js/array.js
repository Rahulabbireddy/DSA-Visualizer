
if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

}
/* ======================================
   ARRAY VISUALIZER
====================================== */

let array = [10, 20, 30, 40, 50];

console.log("JS Loaded");

const container = document.getElementById("arrayContainer");
const consoleBox = document.getElementById("console");
const stepText = document.getElementById("stepText");
const codeBox = document.getElementById("codeBox");

const valueInput = document.getElementById("value");
const indexInput = document.getElementById("index");

const insertBtn = document.getElementById("insert");
const deleteBtn = document.getElementById("delete");
const searchBtn = document.getElementById("search");
const updateBtn = document.getElementById("update");
const reverseBtn = document.getElementById("reverse");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
const sortBtn = document.getElementById("sort");
const resetBtn = document.getElementById("reset");

/* ======================================
   Render Array
====================================== */

/* ======================================
   Render Array
====================================== */

function renderArray(highlight = -1, color = "") {

    container.innerHTML = "";

    array.forEach((value, index) => {

        const wrapper = document.createElement("div");
        wrapper.className = "array-wrapper";

        const box = document.createElement("div");
        box.className = "array-box";

        if (index === highlight && color !== "") {
            box.classList.add(color);
        }

        box.textContent = value;

        const idx = document.createElement("div");
        idx.className = "array-index";
        idx.textContent = index;

        wrapper.appendChild(box);
        wrapper.appendChild(idx);

        container.appendChild(wrapper);

    });

    updateArrayInfo();
    updateStatistics();

}
/* ======================================
   Console
====================================== */

function log(message){

const time=new Date().toLocaleTimeString();

consoleBox.innerHTML+=`<div>[${time}] ${message}</div>`;

consoleBox.scrollTop=consoleBox.scrollHeight;

}
/* ======================================
   Step Panel
====================================== */

function step(message){

stepText.innerHTML = message;

}

/* ======================================
   Code Panel
====================================== */

function code(text){

codeBox.textContent = text;

}

/* ======================================
   Initial Render
====================================== */

renderArray();

updateStatistics();

updateArrayInfo();

log("Array Visualizer Started.");

step("Ready to perform operations.");

code("Waiting for operation...");

/* ======================================
   INSERT
====================================== */

insertBtn.onclick=function(){

const value=Number(valueInput.value);

const index=Number(indexInput.value);

if(isNaN(value)){

alert("Enter a value");

return;

}

if(index<0 || index>array.length){

alert("Invalid Index");

return;

}

array.splice(index,0,value);

renderArray(index,"insert");

updateArrayInfo();

updateStatistics();

step("Inserted "+value+" at index "+index);

log("Inserted "+value);

code(

`for(i=n;i>${index};i--)

arr[i]=arr[i-1];

arr[${index}]=${value};`

);

valueInput.value="";

indexInput.value="";

};

/* ======================================
DELETE
====================================== */

deleteBtn.onclick=function(){

const index=Number(indexInput.value);

if(index<0 || index>=array.length){

alert("Invalid Index");

return;

}

const deleted=array[index];

array.splice(index,1);

renderArray();

updateArrayInfo();

updateStatistics();

step("Deleted "+deleted);

log("Deleted "+deleted);

code(

`for(i=${index};i<n;i++)

arr[i]=arr[i+1];`

);

indexInput.value="";

};

/* ======================================
SEARCH
====================================== */

searchBtn.onclick=function(){

const value=Number(valueInput.value);

const found=array.indexOf(value);

if(found==-1){

renderArray();

step("Element Not Found");

log("Search Failed");

alert("Element Not Found");

return;

}

renderArray(found,"found");

step("Element Found at Index "+found);

log("Found "+value);

code(

`for(i=0;i<n;i++){

if(arr[i]==value)

return i;

}`

);

};

/* ======================================
   UPDATE
====================================== */

updateBtn.onclick=function(){

const value=Number(valueInput.value);

const index=Number(indexInput.value);

if(isNaN(value)){

alert("Enter a value");

return;

}

if(index<0 || index>=array.length){

alert("Invalid Index");

return;

}

const old=array[index];

array[index]=value;

renderArray(index,"current");

updateArrayInfo();

updateStatistics();

step("Updated "+old+" to "+value);

log("Updated index "+index);

code(

`arr[${index}] = ${value};`

);

valueInput.value="";

indexInput.value="";

};

/* ======================================
REVERSE
====================================== */

reverseBtn.onclick=function(){

array.reverse();

renderArray();

updateArrayInfo();

step("Array Reversed");

log("Reverse Completed");

code(

`reverse(arr.begin(),arr.end());`

);

};

/* ======================================
ROTATE LEFT
====================================== */

leftBtn.onclick=function(){

if(array.length<=1) return;

const first=array.shift();

array.push(first);

renderArray();

updateArrayInfo();

step("Array Rotated Left");

log("Rotate Left");

code(

`temp=arr[0];

shift left;

arr[n-1]=temp;`

);

};

/* ======================================
ROTATE RIGHT
====================================== */

rightBtn.onclick=function(){

if(array.length<=1) return;

const last=array.pop();

array.unshift(last);

renderArray();

updateArrayInfo();

step("Array Rotated Right");

log("Rotate Right");

code(

`temp=arr[n-1];

shift right;

arr[0]=temp;`

);

};

/* ======================================
RESET
====================================== */

resetBtn.onclick=function(){

array=[10,20,30,40,50];

renderArray();

updateArrayInfo();

resetStatistics();

step("Visualizer Reset");

log("Reset Complete");

code("Waiting for operation...");

};

/* ======================================
   Delay Function
====================================== */

function sleep(ms = animationSpeed) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

/* ======================================
   Bubble Sort
====================================== */





/* ==========================================
   ARRAY VISUALIZER
   PART 4
   Bubble Sort Animation
========================================== */

let sorting = false;

async function bubbleSortAnimation() {

    if (sorting) return;

    if (array.length <= 1) {
        alert("Create an array first.");
        return;
    }

    sorting = true;

    disableArrayButtons(true);

    let bars = document.querySelectorAll(".array-box");

    for (let i = 0; i < array.length - 1; i++) {

        for (let j = 0; j < array.length - i - 1; j++) {

            bars = document.querySelectorAll(".array-box");

            bars[j].classList.add("compare");
            bars[j + 1].classList.add("compare");

            await sleep(500);

            if (array[j] > array[j + 1]) {

                bars[j].classList.remove("compare");
                bars[j + 1].classList.remove("compare");

                bars[j].classList.add("swap");
                bars[j + 1].classList.add("swap");

                await sleep(400);

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                renderArray();

updateArrayInfo();

resetStatistics();

                await sleep(500);

                bars = document.querySelectorAll(".array-box");

            }

            bars[j].classList.remove("compare");
            bars[j + 1].classList.remove("compare");

            bars[j].classList.remove("swap");
            bars[j + 1].classList.remove("swap");

        }

        bars = document.querySelectorAll(".array-box");

        bars[array.length - i - 1].classList.add("sorted");

    }

    bars = document.querySelectorAll(".array-box");

    bars[0].classList.add("sorted");

    sorting = false;

    disableArrayButtons(false);

}

/* ==========================================
   Utility Functions
========================================== */




/* ==========================================
   Disable Controls During Animation
========================================== */

function disableArrayButtons(state) {

    const buttons = document.querySelectorAll(".controls button");

    buttons.forEach(button => {

        button.disabled = state;

    });

}

/* ==========================================
   Shuffle Array
========================================== */

function shuffleArray() {

    if (sorting) return;

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    renderArray();

}

/* ==========================================
   Generate Random Array
========================================== */

function randomArray() {

    if (sorting) return;

    array = [];

    const size = 8 + Math.floor(Math.random() * 5);

    for (let i = 0; i < size; i++) {

        array.push(Math.floor(Math.random() * 90) + 10);

    }

    renderArray();

}

/* ==========================================
   Highlight Current Maximum
========================================== */

function highlightMaximum() {

    if (array.length === 0) return;

    renderArray();

    let maxIndex = 0;

    for (let i = 1; i < array.length; i++) {

        if (array[i] > array[maxIndex]) {

            maxIndex = i;

        }

    }

    const bars = document.querySelectorAll(".array-box");

    bars[maxIndex].classList.add("maximum");

}

/* ==========================================
   Selection Sort Animation
========================================== */

async function selectionSortAnimation() {

    if (sorting) return;

    if (array.length <= 1) {
        alert("Create an array first.");
        return;
    }

    sorting = true;
    disableArrayButtons(true);

    let bars;

    for (let i = 0; i < array.length - 1; i++) {

        let minIndex = i;

        bars = document.querySelectorAll(".array-box");
        bars[minIndex].classList.add("current");

        for (let j = i + 1; j < array.length; j++) {

            bars = document.querySelectorAll(".array-box");

            bars[j].classList.add("compare");

            await sleep(350);

             // ADD HERE
            comparisonCount++;
            stepCount++;
            updateStatistics();

            if (array[j] < array[minIndex]) {

                bars[minIndex].classList.remove("current");

                minIndex = j;

                bars[minIndex].classList.add("current");

            }

            bars[j].classList.remove("compare");

        }

        if (minIndex !== i) {

            [array[i], array[minIndex]] =
            [array[minIndex], array[i]];

            // ADD HERE
            swapCount++;
            updateStatistics();

            renderArray();

            await sleep(450);

        }

        bars = document.querySelectorAll(".array-box");

        bars[i].classList.remove("current");
        bars[i].classList.add("sorted");

    }

    bars = document.querySelectorAll(".array-box");
    bars[array.length - 1].classList.add("sorted");

    disableArrayButtons(false);
    sorting = false;

}

/* ==========================================
   Linear Search Animation
========================================== */

async function linearSearchAnimation(target) {

    if (sorting) return;

    if (array.length === 0) {
        alert("Create an array first.");
        return;
    }

    renderArray();

    const bars = document.querySelectorAll(".array-box");

    for (let i = 0; i < array.length; i++) {

        bars[i].classList.add("compare");

        await sleep(500);

        // ADD HERE
        comparisonCount++;
        stepCount++;
        updateStatistics();

        if (array[i] == target) {

            bars[i].classList.remove("compare");
            bars[i].classList.add("found");

            return;

        }

        bars[i].classList.remove("compare");

    }

    alert("Element not found.");

}

/* ==========================================
   Binary Search Animation
========================================== */

async function binarySearchAnimation(target) {

    if (sorting) return;

    if (array.length === 0) {
        alert("Create an array first.");
        return;
    }

    array.sort((a, b) => a - b);

    renderArray();

    await sleep(600);

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {

        let mid = Math.floor((left + right) / 2);

        const bars = document.querySelectorAll(".array-box");

        bars[mid].classList.add("compare");

        await sleep(700);

        // ADD HERE
        comparisonCount++;
        stepCount++;
        updateStatistics();

        if (array[mid] == target) {

            bars[mid].classList.remove("compare");
            bars[mid].classList.add("found");

            return;

        }

        if (array[mid] < target) {

            bars[mid].classList.remove("compare");

            left = mid + 1;

        }
        else {

            bars[mid].classList.remove("compare");

            right = mid - 1;

        }

    }

    alert("Element not found.");

}

/* ==========================================
   Array Information
========================================== */

function updateArrayInfo() {

    const sizeElement = document.getElementById("arraySize");
    const maxElement = document.getElementById("arrayMax");
    const minElement = document.getElementById("arrayMin");
    const sumElement = document.getElementById("arraySum");

    if (!sizeElement) return;

    sizeElement.textContent = array.length;

    if (array.length === 0) {

        maxElement.textContent = "-";
        minElement.textContent = "-";
        sumElement.textContent = "-";

        return;

    }

    maxElement.textContent = Math.max(...array);
    minElement.textContent = Math.min(...array);

    let sum = 0;

    for (let value of array)
        sum += value;

    sumElement.textContent = sum;

}

/* ==========================================
   Performance Statistics
========================================== */

let comparisonCount = 0;
let swapCount = 0;
let stepCount = 0;

function resetStatistics() {

    comparisonCount = 0;
    swapCount = 0;
    stepCount = 0;

    updateStatistics();

}

function updateStatistics() {

    const comparison = document.getElementById("comparisonCount");
    const swap = document.getElementById("swapCount");
    const step = document.getElementById("stepCount");

    if (comparison) comparison.textContent = comparisonCount;
    if (swap) swap.textContent = swapCount;
    if (step) step.textContent = stepCount;

}

/* ==========================================
   Animation Speed
========================================== */

let animationSpeed = 500;

function setAnimationSpeed(value) {

    animationSpeed = Number(value);

}

/* ======================================
   Bubble Sort Button
====================================== */

sortBtn.onclick = function () {

    bubbleSortAnimation();

};


