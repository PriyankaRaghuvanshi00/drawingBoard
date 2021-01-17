const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

class drawingTool {
  stokeColor;
  font;
  styleSelect;
  eraserSize;
  drawing = [];
  drawingIndex = -1;
  constructor() {
    this.isDrawCircle = false;
    this.isDraw = false;
    this.isDrawRectangle = false;
    this.draw = false;
    this.coordinates = {
      prevX: 0,
      prevY: 0,
      x: 0,
      y: 0,
    };
  }

  // getting position of mouse
  getPosition(event) {
    this.coordinates.x = event.clientX - canvas.offsetLeft;
    this.coordinates.y = event.clientY - canvas.offsetTop;
  }

  // clear position
  clearPosition() {
    this.coordinates.x = 0;
    this.coordinates.y = 0;
    this.coordinates.prevX = 0;
    this.coordinates.prevY = 0;
  }

  // clear board
  clearBoard() {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }

  // to start drawing
  startDrawing = (event) => {
    this.draw = true;
    this.getPosition(event);
  };

  // stop draw
  stopDrawing = () => {
    this.draw = false;
    // this.clearPosition();
  };

  storeDate() {
    var currentStatus = context.getImageData(
      this.coordinates.x,
      this.coordinates.y,
      900,
      400
    );
    ++this.drawingIndex;
    this.drawing.push(currentStatus);
  }
 
  // drawing
  Draw(event) {
    if (this.draw) {
      context.beginPath();
      context.strokeStyle = this.stokeColor || "black";
      context.lineWidth = this.font || "2px";
      context.lineCap = "round";
      context.lineJoin = "round";
      if (this.styleSelect === "stamp") {
        context.shadowBlur = 5 || 0;
        context.shadowColor = "white";
      } else if (this.styleSelect === "Sstamp") {
        context.shadowBlur = 10;
        context.shadowColor = "white";
      } else if (this.styleSelect === "blur") {
        context.shadowBlur = 20;
        context.shadowColor = this.stokeColor;
      } else if (this.styleSelect === "grad") {
        this.getPosition(event);
        var radgrad = context.createRadialGradient(
          this.coordinates.x,
          this.coordinates.y,
          10,
          this.coordinates.x,
          this.coordinates.y,
          20
        );
        radgrad.addColorStop(1, "white");
        radgrad.addColorStop(0.5, this.stokeColor || "rgba(0,0,0,0.5)");
        radgrad.addColorStop(1, "rgba(0,0,0,0)");
        context.fillStyle = radgrad;
        context.fillRect(
          this.coordinates.x - 20,
          this.coordinates.y - 20,
          40,
          40
        );
      } else if (this.styleSelect === "normal") {
        context.shadowBlur = 0;
      }
      context.moveTo(this.coordinates.x, this.coordinates.y);
      this.getPosition(event);
      context.lineTo(this.coordinates.x, this.coordinates.y);
      context.stroke();

      if (this.styleSelect === "brush" || this.styleSelect === "sliced") {
        context.lineWidth = 10;
        context.lineCap = "butt";
        context.beginPath();
        context.moveTo(this.coordinates.prevX, this.coordinates.prevY);
        this.getPosition(event);
        context.lineTo(this.coordinates.x, this.coordinates.y);
        context.stroke();
        if (this.styleSelect === "sliced") {
          context.globalAlpha = 0.7;
        }
        context.moveTo(this.coordinates.prevX - 5, this.coordinates.prevY - 5);
        this.getPosition(event);
        context.lineTo(this.coordinates.x - 5, this.coordinates.y - 5);
        context.stroke();

        if (this.styleSelect === "sliced") {
          context.globalAlpha = 0.5;
          context.moveTo(
            this.coordinates.prevX - 10,
            this.coordinates.prevY - 10
          );
          this.getPosition(event);
          context.lineTo(this.coordinates.x - 10, this.coordinates.y - 10);
          context.stroke();
        }
        this.coordinates.prevX = this.coordinates.x;
        this.coordinates.prevY = this.coordinates.y;
      }
      // undo operation
      this.storeDate();
    }
  }

  // make shape
  canvasEventHandler() {
    canvas.style.cursor = "crosshair";
    let isDownCircle = false;
    let isDownRectangle = false;
    context.canvas.addEventListener("mousedown", () => {
      context.fillStyle = this.stokeColor;
      // draw circle
      if (this.isDrawCircle) {
        isDownCircle = true;
        this.getPosition(event);
        this.coordinates.prevX = this.coordinates.x;
        context.beginPath();
        (context.strokeWidth = 1),
          (context.selectable = false),
          context.arc(
            this.coordinates.x,
            this.coordinates.y,
            3,
            0,
            2 * Math.PI
          );
        context.closePath();
        context.fill();
      } else if (this.isDrawRectangle) {
        isDownRectangle = true;
        this.getPosition(event);
        this.coordinates.prevX = this.coordinates.x;
        this.coordinates.prevY = this.coordinates.y;
        context.fillRect(this.coordinates.x - 1, this.coordinates.y - 1, 2, 2);
      } else if (this.isDraw) {
        this.startDrawing(event);
      }
    });
    canvas.addEventListener("mousemove", () => {
      if (this.isDrawCircle) {
        if (!isDownCircle) return;
        this.getPosition(event);
        context.beginPath();
        let radius = Math.abs(this.coordinates.prevX - this.coordinates.x);
        context.arc(
          this.coordinates.x - radius,
          this.coordinates.y,
          radius,
          0,
          2 * Math.PI
        );
        context.fillStyle = this.stokeColor;
        context.closePath();
        context.fill();
      } else if (this.isDrawRectangle) {
        if (!isDownRectangle) return;
        this.getPosition(event);
        context.fillRect(
          this.coordinates.x - 1,
          this.coordinates.y - 1,
          this.coordinates.prevX - this.coordinates.x,
          this.coordinates.prevY - this.coordinates.y
        );
      } else if (this.isDraw) {
        this.Draw(event);
      } else {
        canvas.style.cursor = "grab";
        this.getPosition(event);
        context.clearRect(
          this.coordinates.x,
          this.coordinates.y,
          this.eraserSize,
          this.eraserSize
        );
      }
    });
    context.canvas.addEventListener("mouseup", () => {
      isDownCircle = false;
      isDownRectangle = false;
    });
  }
  noteBox(note) {
    noteHandler.style.display = "block";
    noteHandler.innerHTML = `${note.toUpperCase()}`;
    setTimeout(() => {
      noteHandler.style.display = "none";
    }, 3000);
  }
}
