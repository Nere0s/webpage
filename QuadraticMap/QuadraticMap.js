let SPINUP = 100000
let ITERATIONS = 100000
let NPIXELS = 500

let parameters = 'SJAIYDNARXSV'
let x = 0.1
let y = 0.1
let a
let b

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
  stroke(0, 255/4)
  draw_quadratic_map()
}

function draw_quadratic_map() {
    background(220)

    parameters = document.getElementById("parameters").value;
    console.log('trying to draw with parameters', parameters)

    if (!check_parameters(parameters)) {
        console.log('invalid parameters!')
    }

    x = 0
    y = 0

    params = string_to_params(parameters)
    a = params[0]
    b = params[1]

    for (var ii = 0; ii < SPINUP; ii++) {
        let xy = quadratic_map(x, y, a, b)
        x = xy[0]
        y = xy[1]
    }

    let _x
    let _y

    let x_min = document.getElementById("x_min").value;
    let x_max = document.getElementById("x_max").value;
    let y_min = document.getElementById("y_min").value;
    let y_max = document.getElementById("y_max").value;

    for (var ii = 0; ii < ITERATIONS; ii++) {
        let xy = point_to_pixel(x, y, x_min, x_max, y_min, y_max, NPIXELS)
        _x = xy[0]
        _y = xy[1]
        point(_x, _y)

        let newp = quadratic_map(x, y, a, b)
        x = newp[0]
        y = newp[1]
    }
}
