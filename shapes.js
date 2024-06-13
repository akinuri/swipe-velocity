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
            x = clamp(x, 0, this.container.width - this.radius);
            y = clamp(y, 0, this.container.height - this.radius);
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
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}