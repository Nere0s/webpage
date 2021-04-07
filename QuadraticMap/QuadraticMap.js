let SPINUP = 100000
let ITERATIONS = 100000
let NPIXELS = 500

let parameters = 'EKMJGTPZJFMU'
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

function point_to_pixel(x, y, min, max, npix) {
    let px
    let py

    px = floor((x - min) / (max - min) * npix)
    py = floor((y - min) / (max - min) * npix)

    return [px, py]
}

function setup() {
  createCanvas(NPIXELS, NPIXELS);
  background(220);
  [a, b] = string_to_params(parameters)

  for (var ii = 0; ii < SPINUP; ii++) {
      [x, y] = quadratic_map(x, y, a, b)
  }

  stroke(0, 255/4)

  let _x
  let _y
  for (var ii = 0; ii < ITERATIONS; ii++) {
      [_x, _y] = point_to_pixel(x, y, -1, 1, NPIXELS)
      point(_x, _y)

      let newp = quadratic_map(x, y, a, b)
      x = newp[0]
      y = newp[1]
  }

}

function draw() {

}
