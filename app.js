let shape = new Circle(qs("#shape"));
let container = new Rectangle(innerWidth, innerHeight);
shape.container = container;

on(window, "resize", () => {
    container.width = innerWidth;
    container.height = innerHeight;
});

function onDragStart(event) {
    event.preventDefault();
    const isTouchEvent = event.type === "touchstart";
    const startX = isTouchEvent ? event.touches[0].clientX : event.clientX;
    const startY = isTouchEvent ? event.touches[0].clientY : event.clientY;
    const offsetX = startX - shape.el.getBoundingClientRect().left;
    const offsetY = startY - shape.el.getBoundingClientRect().top;
    let lastX = startX;
    let lastY = startY;
    let lastTime = performance.now();
    function onMove(event) {
        const moveX = isTouchEvent ? event.touches[0].clientX : event.clientX;
        const moveY = isTouchEvent ? event.touches[0].clientY : event.clientY;
        let x = moveX - offsetX;
        let y = moveY - offsetY;
        shape.move(x, y);
        stats.pos.x.textContent = (shape.getCenterPos().x).toFixed(0);
        stats.pos.y.textContent = (shape.getCenterPos().y).toFixed(0);

        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        const deltaX = moveX - lastX;
        const deltaY = moveY - lastY;
        
        const velX = deltaX / deltaTime;
        const velY = deltaY / deltaTime;
        
        let angle = calcRelAngleDegrees(lastX, -lastY, moveX, -moveY);
        stats.vel.mag.textContent = getMagnitude(velX, velY).toFixed(1);
        stats.vel.ang.textContent = angle.toFixed(1) + "°";
        stats.vel.angIcon.style.setProperty("--rotate", angle + "deg");
        
        lastX = moveX;
        lastY = moveY;
        lastTime = currentTime;
    }
    function onDragEnd() {
        off(document, isTouchEvent ? "touchmove" : "mousemove", onMove);
        off(document, isTouchEvent ? "touchend" : "mouseup", onDragEnd);
    }
    on(document, isTouchEvent ? "touchmove" : "mousemove", onMove);
    on(document, isTouchEvent ? "touchend" : "mouseup", onDragEnd, { once: true });
};

on(document, "touchstart", (e) => e.preventDefault(), { passive: false });

on(shape.el, "mousedown", onDragStart, { passive: false });
on(shape.el, "touchstart", onDragStart, { passive: false });
