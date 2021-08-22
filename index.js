const canvas = document.querySelector('canvas');
// context
// 2d, 2 dimensional
const c = canvas.getContext('2d');
// no need to bring in (window.)
canvas.width = innerWidth;
canvas.height = innerHeight;

// Create a player
class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        // equal the current x coordinate + x coordinate after it gets speed
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, 'blue');
const projectiles = [];

// mouse clicking on the screen event
addEventListener('click', (e) => {
    const angle = Math.atan2(
        e.clientY - canvas.height / 2,
        e.clientX - canvas.width / 2
    );

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    projectiles.push(
        new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            5,
            'red',
            velocity
        )

        // // if e.clinetX & Y is equal to x and y, the projectile is created at the center of the canvas.
        // new Projectile(
        //     canvas.width / 2,
        //     canvas.height / 2,
        //     5,
        //     'red',
        //     // a JS object
        //     { x: 1, y: 1 }
        // )
    );
});

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    // to prevent our player to be cleared, we draw it right after clearing the canvas
    player.draw();

    projectiles.forEach(projectile => {
        projectile.update();
    });
}

animate();