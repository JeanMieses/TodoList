const draggables = document.querySelectorAll(".draggable");
const lis = document.querySelectorAll("li");
const container = document.querySelector("#container");
const userInput = document.querySelector("#userInput");
const todosLeftText = document.querySelector(".left");
const removeElement = document.querySelector(".remove");
const completeBtn = document.querySelector(".completeBtn");
const activeBtn = document.querySelector(".activeBtn");
const allBtn = document.querySelector(".allBtn");

let draggingElementIndex = null;
let dataIndex = lis.length;
let todosLeft = lis.length;
todosLeftText.innerText = todosLeft;

//getting userInput
userInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = e.target[0].value;

  if (!input) {
    alert("You need to typea todo!");
  } else {
    createElement(input);
  }
  e.target[0].value = "";
  todosLeft++;
  todosLeftText.innerText = todosLeft;
});

//event listeners for drag events
container.addEventListener("dragstart", dragStart);
container.addEventListener("drop", dragDrop);
container.addEventListener("dragover", dragOver);
container.addEventListener("click", removeElementF);
container.addEventListener("click", markComplete);
completeBtn.addEventListener("click", showCompletedTodos);
activeBtn.addEventListener("click", activeTodos);
allBtn.addEventListener("click", showAllTodos);

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

function removeElementF(e) {
  if (e.target.classList.contains("remove")) {
    e.target.parentNode.parentNode.remove();
    todosLeft--;
    todosLeftText.innerText = todosLeft;
  }
}

function markComplete(e) {
  if (e.target.nodeName === "DIV") {
    e.target.classList.toggle("complete");
    e.target.parentNode.classList.toggle("done");
  }
}

function showCompletedTodos() {
  this.style.color='hsl(220, 98%, 61%)';
  activeBtn.style.color='hsl(234, 11%, 52%)';
  allBtn.style.color='hsl(234, 11%, 52%)';
  for (let li of container.children) {
    if (!li.classList.contains("done")) {
      li.classList.add("hide");
    }
    if (li.classList.contains("done")) {
      li.classList.remove("hide");
    }
  }
}

function activeTodos() {
  this.style.color='hsl(220, 98%, 61%)';
  completeBtn.style.color='hsl(234, 11%, 52%)';
  allBtn.style.color='hsl(234, 11%, 52%)';
  for (let li of container.children) {
    if (li.classList.contains("done")) {
      li.classList.add("hide");
    }

    if (!li.classList.contains("done")) {
      li.classList.remove("hide");
    }
  }
}

function showAllTodos() {
  this.style.color='hsl(220, 98%, 61%)';
  activeBtn.style.color='hsl(234, 11%, 52%)';
  completeBtn.style.color='hsl(234, 11%, 52%)';
  for (let li of container.children) {
    li.classList.remove("hide");
  }
}

//create a DOM element
function createElement(userInput) {
  const li = document.createElement("li");
  const p = document.createElement("p");
  const div = document.createElement("div");
  const button = document.createElement("button");
  div.classList.add("check");
  p.draggable = true;
  p.classList.add("draggable");
  li.setAttribute("data-index", dataIndex++);
  button.classList.add("remove");
  button.append("x");
  p.append(userInput);
  p.append(button);
  li.append(div);
  li.append(p);
  container.append(li);
}
