let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holding = false;

    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.rotation = Math.random() * 30 - 15;

    this.init();
  }

  init() {
    this.paper.style.transform =
      `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;

    // Mouse
    this.paper.addEventListener("mousedown", this.onStart.bind(this));
    document.addEventListener("mousemove", this.onMove.bind(this));
    document.addEventListener("mouseup", this.onEnd.bind(this));

    // Touch
    this.paper.addEventListener("touchstart", this.onStart.bind(this), { passive: false });
    document.addEventListener("touchmove", this.onMove.bind(this), { passive: false });
    document.addEventListener("touchend", this.onEnd.bind(this));
  }

  getPoint(e) {
    return e.touches ? e.touches[0] : e;
  }

  onStart(e) {
    e.preventDefault();

    this.holding = true;
    this.paper.style.zIndex = highestZ++;

    const point = this.getPoint(e);
    this.startX = point.clientX - this.currentX;
    this.startY = point.clientY - this.currentY;
  }

  onMove(e) {
    if (!this.holding) return;

    e.preventDefault();
    const point = this.getPoint(e);

    this.currentX = point.clientX - this.startX;
    this.currentY = point.clientY - this.startY;

    this.paper.style.transform =
      `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  onEnd() {
    this.holding = false;
  }
}

// Init all papers
document.querySelectorAll(".paper").forEach(p => new Paper(p));

// Disable right-click
document.addEventListener("contextmenu", e => e.preventDefault());
