class Circle {
    el = null;
    radius = 0;
    x = 0;
    y = 0;
    container = null;
    constructor(el) {
        this.el = el;
        this.radius = el.clientWidth;
    }
    move(x, y) {
        if (this.container) {
            x = clamp(x, this.container.x, this.container.x + this.container.width - this.radius);
            y = clamp(y, this.container.y, this.container.y + this.container.height - this.radius);
        }
        this.x = x;
        this.y = y;
        shape.el.style.left = `${x}px`;
        shape.el.style.top = `${y}px`;
    }
    getCenterPos() {
        return {
            x: this.x + this.radius,
            y: this.y + this.radius,
        }
    }
}

class Rectangle {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}