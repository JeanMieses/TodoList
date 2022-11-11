const draggables = document.querySelectorAll(".draggable");
const lis = document.querySelectorAll("li");
let draggingElementIndex = null;

for (let draggable of draggables) {
  draggable.addEventListener("dragstart", dragStart);
}

for (let li of lis) {
  li.addEventListener("drop", dragDrop);
  li.addEventListener("dragover", dragOver);
}

function dragStart() {
  draggingElementIndex = +this.closest('li').getAttribute("data-index");
}

function dragDrop() {
  let dropPosition = +this.getAttribute("data-index");

  let itemOne = lis[draggingElementIndex].querySelector('.draggable');
  let itemTwo = lis[dropPosition].querySelector('.draggable');;

  lis[draggingElementIndex].appendChild(itemTwo);
  lis[dropPosition].appendChild(itemOne);
  
}

function dragOver(e) {
  e.preventDefault();
}
