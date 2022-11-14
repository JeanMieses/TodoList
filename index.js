const draggables = document.querySelectorAll(".draggable");
const lis = document.querySelectorAll("li");
const container = document.querySelector("#container");
const userInput = document.querySelector("#userInput");
const completeBtn = document.querySelector(".completeBtn");
const allBtn = document.querySelector(".allBtn");
const activeBtn = document.querySelector(".activeBtn");
const todosLeftText = document.querySelector(".left");
const removeElement = document.querySelector(".remove");

let draggingElementIndex = null;
let dataIndex = lis.length;
let todosLeft = lis.length;
todosLeftText.innerText = todosLeft;

//getting userInput
userInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = e.target[0].value;

  if (!input) alert("You need to typea todo!");
  createElement(input);
  e.target[0].value = "";
  todosLeft++;
  todosLeftText.innerText = todosLeft;
});

//event listeners for drag events
container.addEventListener("dragstart", dragStart);
container.addEventListener("drop", dragDrop);
container.addEventListener("dragover", dragOver);
container.addEventListener("click", removeElementF);

//functions that execute for dragging events
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

function dragEnter(e) {
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
function createElement(userInput) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const input = document.createElement("input");
  const button = document.createElement("x");

  input.name = "todos";
  input.type = "radio";
  p.draggable = true;
  p.classList.add("draggable");
  li.setAttribute("data-index", dataIndex++);
  button.classList.add("remove");
  button.append("X");
  p.append(userInput);
  li.append(input);
  li.append(p);
  li.append(button);
  container.append(li);
}

function removeElementF(e) {
  if (e.target.classList.contains("remove")) {
    e.target.parentNode.remove();
    todosLeft--;
    todosLeftText.innerText = todosLeft;
  }
}
