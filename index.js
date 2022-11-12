const draggables = document.querySelectorAll(".draggable");
const lis = document.querySelectorAll("li");
const container = document.querySelector("#container");
const userInput = document.querySelector("#userInput");
let draggingElementIndex = null;
let dataIndex = lis.length;

//getting userInput
userInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = e.target[0].value;
  createElement(input);
  e.target[0].value = "";
});

//events listeners for drag events
container.addEventListener("dragstart", dragStart);
container.addEventListener("drop", dragDrop);
container.addEventListener("dragover", dragOver);

//functions that execute for a given event
function dragStart(e) {
  if (e.target.nodeName === "P") {
    draggingElementIndex = +e.target.closest("li").getAttribute("data-index");
  }
}

function dragDrop(e) {
  if (e.target.nodeName === "P") {
    let dropPosition = +e.target.closest("li").getAttribute("data-index");
    switchElements(draggingElementIndex, dropPosition);
  }
}

function dragOver(e) {
  e.preventDefault();
}

//switch element when drapping over another
function switchElements(from, to) {
  let itemOne = container.children[from].querySelector(".draggable");
  let itemTwo = container.children[to].querySelector(".draggable");

  container.children[from].append(itemTwo);
  container.children[to].append(itemOne);
}

//create a DOM element
function createElement(input) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.draggable = true;
  p.classList.add("draggable");
  li.setAttribute("data-index", dataIndex++);
  p.append(input);
  li.append(p);
  container.append(li);
}
