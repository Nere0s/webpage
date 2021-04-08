let SPINUP = 1000
let ITERATIONS = 1000
let NPIXELS = 500

let y0 = .1
let x_min = 3.
let x_max = 4.
let y_min = 0.
let y_max = 1.

function logistic_map(y, mu) {
    return mu*y*(1.-y)
}

function spinup_logistic_map(y, mu, spinup) {
    for (var ii = 0; ii < spinup; ii++) {
        y = logistic_map(y, mu)
    }

    return y
}

function setup() {
  createCanvas(NPIXELS, NPIXELS)
  strokeWeight(1)
  stroke(0, 0, 0, 20)
  noLoop()
}

function draw() {
  background(220)

  x_min = parseFloat(document.getElementById("x_min").value);
  x_max = parseFloat(document.getElementById("x_max").value);

  y_min = parseFloat(document.getElementById("y_min").value);
  y_max = parseFloat(document.getElementById("y_max").value);

  for (var ix = 0; ix < NPIXELS; ix++) {
      let y = y0
      let x = x_min + (x_max - x_min)*ix/NPIXELS

      y = spinup_logistic_map(y, x, SPINUP)

      for (var ii = 0; ii < ITERATIONS; ii++) {
          let py = (y-y_min)/(y_max-y_min)
          py = 1-py
          py = NPIXELS

          point(ix, py)
          y = logistic_map(y, x)
      }
  }
}
