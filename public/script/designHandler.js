const noteHandler=document.querySelector(".note");

//set selectedColor
function selectedColor() {
const color=document.getElementById('color');
  tool.stokeColor = color.value||"black";
  tool.draw = true;
}
// set background color
function selectedBg(bgColor) {
  tool.clearBoard();
noteBox(`background color selected!`)
  canvas.style.backgroundColor = bgColor.style.backgroundColor||"black";
}
//font decide
function fontSelected(size) {
  tool.font = size;
  noteBox("font selected!")
}
// style selected
 function styleSelected(style){
  noteBox(`${style} style selected ,For More Effect Use Color Other Then Black & increase font size!`);
  tool.styleSelect=style.trim(); 
}


function noteBox(note)
{
  tool.noteBox(note)
}

// dark mode
//to turn on the dark mode on event listener
const darkOn = document.getElementById("switch");
let isSwitchOn = false;
darkOn.addEventListener("click", () => {
  darkMode(event);
});

function darkMode(event) {
  tool.noteBox('Switch Triggered');
  darkOn.classList.toggle("fa-toggle-on");
  isSwitchOn = !isSwitchOn;
  if (isSwitchOn) {
    document.body.style.backgroundColor = "black";
    canvas.style.borderColor = "black";
    stokeColor = "white";
    tool.clearBoard();
  } else {
    document.body.style.backgroundColor = "white";
    canvas.style.borderColor = "white";
    stokeColor = "black";
    tool.clearBoard();
  }
}

// const undoOperation=document.getElementById("undo");
// undoOperation.addEventListener("click",()=>{
//   tool.noteBox("undo switch triggered!")
//   tool.removeDate()})

