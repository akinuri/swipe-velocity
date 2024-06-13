let shape = new Circle(qs("#shape"));

let container = new Rectangle(innerWidth, innerHeight);

on(window, "resize", () => {
    container.width = innerWidth;
    container.height = innerHeight;
});

function onDragStart(event) {
    event.preventDefault();
    const isTouchEvent = event.type === "touchstart";
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    function onMove(event) {
        const moveX = isTouchEvent ? event.touches[0].clientX : event.clientX;
        const moveY = isTouchEvent ? event.touches[0].clientY : event.clientY;
        let x = moveX - offsetX;
        let y = moveY - offsetY;
        x = clamp(x, 0, container.width - shape.radius);
        y = clamp(y, 0, container.height - shape.radius);
        shape.el.style.left = `${x}px`;
        shape.el.style.top = `${y}px`;
    }
    function onDragEnd() {
        off(document, isTouchEvent ? "touchmove" : "mousemove", onMove);
        off(document, isTouchEvent ? "touchend" : "mouseup", onDragEnd);
    }
    on(document, isTouchEvent ? "touchmove" : "mousemove", onMove);
    on(document, isTouchEvent ? "touchend" : "mouseup", onDragEnd, { once: true });
};

on(shape.el, "mousedown", onDragStart, { passive: false });
on(shape.el, "touchstart", onDragStart, { passive: false });
