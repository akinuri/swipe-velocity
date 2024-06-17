let stats = {
    pos : {
        x : qs("#posX"),
        y : qs("#posY"),
    },
    vel : {
        mag : qs("#velMag"),
        ang : qs("#velAng"),
        angIcon : qs("svg"),
    },
    update: function (shape, vel) {
        stats.pos.x.textContent = (shape.getCenterPos().x).toFixed(0);
        stats.pos.y.textContent = (shape.getCenterPos().y).toFixed(0);
        stats.vel.mag.textContent = vel.getMagnitude().toFixed(1);
        stats.vel.ang.textContent = vel.getAngle(-1).toFixed(1) + "°";
        stats.vel.angIcon.style.setProperty("--rotate", vel.getAngle(-1) + "deg");
    },
};
