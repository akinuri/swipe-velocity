let shape = {
    el : qs("#shape"),
    width: qs("#shape").clientWidth,
    height: qs("#shape").clientHeight,
};

function onDragStart(event) {
    const offsetX = event.clientX - shape.el.getBoundingClientRect().left;
    const offsetY = event.clientY - shape.el.getBoundingClientRect().top;
    function onMouseMove(event) {
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        shape.el.style.left = `${x}px`;
        shape.el.style.top = `${y}px`;
    }
    on(document, "mousemove", onMouseMove);
    on(document, "mouseup", () => {
        off(document, "mousemove", onMouseMove);
    }, { once: true });
};

on(shape.el, "mousedown", onDragStart);
