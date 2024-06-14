class Circle {
    el = null;
    radius = 0;
    pos = new Point();
    container = null;
    dragPosLog = new Stack(2, true);
    constructor(el) {
        this.el = el;
        this.radius = el.clientWidth;
    }
    move(x, y) {
        if (this.container) {
            x = clamp(
                x,
                this.container.pos.x,
                this.container.pos.x + this.container.width - this.radius,
            );
            y = clamp(
                y,
                this.container.pos.y,
                this.container.pos.y + this.container.height - this.radius,
            );
        }
        this.pos.x = x;
        this.pos.y = y;
        shape.el.style.left = x + "px";
        shape.el.style.top = y + "px";
    }
    getCenterPos() {
        return {
            x: this.pos.x + this.radius,
            y: this.pos.y + this.radius,
        }
    }
    logDragPos(x, y, time) {
        time = time || performance.now();
        this.dragPosLog.push(
            {x, y, time}
        );
    }
    calcDragVel() {
        let vel = {
            mag : 0,
            dir : 0,
        };
        let prev = this.dragPosLog.peek(1);
        let current = this.dragPosLog.peek(0);
        if (prev && current) {
            const deltaTime = (current.time - prev.time) / 1000;
            const deltaX = current.x - prev.x;
            const deltaY = current.y - prev.y;
            const velX = deltaX / deltaTime;
            const velY = deltaY / deltaTime;
            vel.mag = getMagnitude(velX, velY);
            vel.dir = calcRelAngleDegrees(prev.x, -prev.y, current.x, -current.y);
        }
        return vel;
    }
}

class Rectangle {
    pos = new Point();
    width = 0;
    height = 0;
    constructor(x, y, width, height) {
        this.pos.x = x;
        this.pos.y = y;
        this.width = width;
        this.height = height;
    }
}