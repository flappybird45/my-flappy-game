const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 480;

// बर्डचा डेटा
const bird = {
    x: 50,
    y: 150,
    width: 30,
    height: 30,
    gravity: 0.6,
    lift: -10,
    velocity: 0
};

// पाइप्स सेटअप
const pipes = [];
const pipeWidth = 40;
const pipeGap = 120;
let pipeX = canvas.width;

function addPipe() {
    let topHeight = Math.random() * (canvas.height / 2);
    pipes.push({ x: pipeX, top: topHeight, bottom: topHeight + pipeGap });
}

setInterval(addPipe, 2000);

// गेम अपडेट फंक्शन
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // बर्ड मुव्हमेंट
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // बर्ड ड्रॉ
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // पाइप्स ड्रॉ
    ctx.fillStyle = "green";
    for (let i = 0; i < pipes.length; i++) {
        ctx.fillRect(pipes[i].x, 0, pipeWidth, pipes[i].top);
        ctx.fillRect(pipes[i].x, pipes[i].bottom, pipeWidth, canvas.height - pipes[i].bottom);
        pipes[i].x -= 2;

        // कोलायडिंग चेक
        if (
            bird.x < pipes[i].x + pipeWidth &&
            bird.x + bird.width > pipes[i].x &&
            (bird.y < pipes[i].top || bird.y + bird.height > pipes[i].bottom)
        ) {
            alert("Game Over!");
            document.location.reload();
        }
    }

    requestAnimationFrame(update);
}

// बर्ड जंप करायला स्पेसबार वापर
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        bird.velocity = bird.lift;
    }
});

update();