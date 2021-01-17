let tool = new drawingTool();
class handler {
  constructor() {
    // window load
    this.load();
    const circleDom = document.getElementById("circle");
    circleDom.addEventListener("click", this.circleHandler);
    const rectangle = document.getElementById("rect");
    rectangle.addEventListener("click", this.rectangleHandler);
    const pen = document.getElementById("pen");
    pen.addEventListener("click", this.penHandler);
    const clearAll = document.querySelector(".clearAll");
    // clear board
    clearAll.addEventListener("click", tool.clearBoard);
  }
  circleHandler() {
    tool.isDrawCircle = true;
    tool.isDraw = false;
    tool.isDrawRectangle = false;
    fontSelected(1);
    canvas.removeEventListener("mousemove", this.draw);
    tool.noteBox("circle shape selected!");
    tool.canvasEventHandler();
  }
  rectangleHandler() {
    tool.isDrawCircle = false;
    tool.isDrawRectangle = true;
    tool.isDraw = false;
    fontSelected(1);
    canvas.removeEventListener("mousemove", this.draw);
    tool.canvasEventHandler();
    tool.noteBox("rectangle shape selected!");
  }
  penHandler() {
    tool.isDrawCircle = false;
    tool.isDrawRectangle = false;
    tool.isDraw = true;
    tool.canvasEventHandler();
    tool.noteBox("pen selected!");
  }
  eraseHandler(size) {
    tool.draw = false;
    tool.eraserSize = size;
    tool.isDrawCircle = false;
    tool.isDrawRectangle = false;
    tool.isDraw = false;
    tool.styleSelect = "normal";
    tool.noteBox("eraser selected, select pen to write on board!");
    tool.canvasEventHandler();
  }
  draw = () => {
    tool.Draw(event);
  };
  load() {
    window.addEventListener("load", () => {
      canvas.addEventListener("mousedown", () => tool.startDrawing(event));
      canvas.addEventListener("mouseup", () => tool.stopDrawing);
      canvas.addEventListener("mouseover", () => (tool.draw = false));
      canvas.addEventListener("click", () => (tool.draw = !tool.draw));
      canvas.addEventListener("mousemove", this.draw);
      canvas.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    });
  }
}

let handlerTool = new handler();

function erase(size) {
  handlerTool.eraseHandler(size);
}
