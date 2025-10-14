let stars = [];

function setup() {
    createCanvas(720, 720);
    const starsTotal = 50;

    for (let i = 0; i < starsTotal; i++) {
        let star = new Star();
        stars.push(star);
    }
}

function draw() {
    background(0);
    
    // loop through stars array in a for loop
    // for (let i = 0; i < stars.length; i++) {
    //     stars[i].draw();
    // }

    // loop through stars array in a for of loop
    // for (const star of stars) {
    //     star.draw();
    // }

    // loop through stars array with forEach with a callback function
    // stars.forEach(displayStar);

    // loop through stars array with forEach with an arrow (=>) function
    stars.forEach((star) => {
        star.draw();
    });
}

function getRandomColor() {
    let r = Math.floor(random(255));
    let g = Math.floor(random(255));
    let b = Math.floor(random(255))
    let a = Math.floor(random(75, 255));
    return color(r, g, b, a);
}

function displayStar(star) {
    star.draw();
}

class Star {
    constructor(x, y, radius, c) {
        if (typeof x !== 'number') {
            this.x = random(width);
        } else {
            this.x = x;
        }

        if (typeof y !== 'number') {
            this.y = random(height);
        } else {
            this.y = y;
        }

        if (typeof radius !== 'number') {
            this.radius = random(5, 75);
        } else {
            this.radius = radius;
        }

        if (!(c instanceof p5.Color)) {
            this.c = getRandomColor();
        } else {
            this.c = c;
        }

        this.initialTheta = random(TWO_PI);
    }

    draw() {
        const points = 5;
        let theta = this.initialTheta;

        fill(this.c);
        noStroke();
        beginShape();

        for (let i = 0; i < points * 2; i++) {
            let r = this.radius;

            if (i % 2 === 0) {
                r = r / 2;
            }

            let vx = this.x + (cos(theta) * r);
            let vy = this.y + (sin(theta) * r);
            vertex(vx, vy);

            theta += TWO_PI / (points * 2);
        }

        endShape(CLOSE);
    }
}
