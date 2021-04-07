let SPINUP = 100000
let ITERATIONS = 100000
let NPIXELS = 500
let FRAMESPER = 10

let animate = false
let colored = false
let colorcycle

let parameters
let x = 0.1
let y = 0.1
let a
let b
let pixid = 0

function check_parameters(str) {
    let regex = new RegExp('^[A-Ya-y]{12}$')
    return regex.test(str)
}

function char_to_param(char, min=-1.2, max=1.2) {
    let range = max - min
    let step = range / 24.

    let idx = char.toLowerCase().charCodeAt(0) - 97

    return min + idx * step
}

function string_to_params(str) {
    a = []
    b = []

    for (var ii = 0; ii < 6; ii++) {
        a.push(char_to_param(str.charAt(ii)))
    }
    for (var ii = 0; ii < 6; ii++) {
        b.push(char_to_param(str.charAt(ii+6)))
    }

    return [a, b]
}

function quadratic_map(x, y, a, b) {
    let new_x
    let new_y

    new_x = a[0] + a[1]*x + a[2]*x*x + a[3]*x*y + a[4]*y + a[5]*y*y
    new_y = b[0] + b[1]*x + b[2]*x*x + b[3]*x*y + b[4]*y + b[5]*y*y;

    return [new_x, new_y]
}

function spinup_quadratic_map(x, y, a, b, iterations) {
    let xy

    for (var ii = 0; ii < iterations; ii++) {
        xy = quadratic_map(x, y, a, b)
        x = xy[0]
        y = xy[1]
    }

    return [x, y]
}

function point_to_pixel(x, y, x_min, x_max, y_min, y_max, npix) {
    let px
    let py

    px = floor((x - x_min) / (x_max - x_min) * npix)
    py = floor((y - y_min) / (y_max - y_min) * npix)

    py = NPIXELS - py

    return [px, py]
}

function setup() {
    createCanvas(NPIXELS, NPIXELS);
    background(220)
    frameRate(100)
    strokeWeight(1)
    colorMode(HSB, 255)
    noLoop()
    generate()
}

function draw() {
    let x_min = document.getElementById("x_min").value;
    let x_max = document.getElementById("x_max").value;
    let y_min = document.getElementById("y_min").value;
    let y_max = document.getElementById("y_max").value;

    FRAMESPER = document.getElementById("iperframe").value;

    let xy
    for (var ii = 0; ii < ITERATIONS; ii++) {
        if (colored) {
            stroke(pixid%255, 255, 255, 255*document.getElementById("palpha").value)
        } else {
            stroke(0, 0, 0, 255*document.getElementById("palpha").value)
        }

        xy = quadratic_map(x, y, a, b)
        x = xy[0]
        y = xy[1]

        xy = point_to_pixel(x, y, x_min, x_max, y_min, y_max, NPIXELS)
        _x = xy[0]
        _y = xy[1]
        point(_x, _y)
        pixid += 255/colorcycle
        if (animate && ii >= FRAMESPER) {
            break
        }
    }
}

function generate() {
    background(220)

    animate = document.getElementById("animated").checked;
    colored = document.getElementById("colored").checked;
    colorcycle = document.getElementById("colorcycle").value;
    parameters = document.getElementById("parameters").value;
    if (!check_parameters(parameters)) {
        console.log('invalid parameters', parameters)
    }

    let ab = string_to_params(parameters)
    a = ab[0]
    b = ab[1]

    x = 0.1
    y = 0.1
    let xy
    xy = spinup_quadratic_map(x, y, a, b, SPINUP)
    x = xy[0]
    y = xy[0]

    if (animate) {
        loop()
    } else {
        noLoop()
        redraw()
    }
}
