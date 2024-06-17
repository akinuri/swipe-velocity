let stats = {
    pos : {
        x : qs("#posX"),
        y : qs("#posY"),
    },
    dragVel : {
        mag : qs("#dragVelMag"),
        ang : qs("#dragVelAng"),
        angIcon : qs("svg", qs("#dragVelAng").nextElementSibling),
    },
    update: function (shape, vel) {
        stats.pos.x.textContent = (shape.getCenterPos().x).toFixed(0);
        stats.pos.y.textContent = (shape.getCenterPos().y).toFixed(0);
        stats.dragVel.mag.textContent = vel.getMagnitude().toFixed(1);
        stats.dragVel.ang.textContent = vel.getAngle(-1).toFixed(1) + "°";
        stats.dragVel.angIcon.style.setProperty("--rotate", vel.getAngle(-1) + "deg");
    },
};
