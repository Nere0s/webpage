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
  for (var ix = 0; ix < NPIXELS; ix++) {
      let y = y0
      let x = x_min + (x_max - x_min)*ix/NPIXELS
      console.log(x)
      y = spinup_logistic_map(y, x, SPINUP)

      for (var ii = 0; ii < ITERATIONS; ii++) {
          point(ix, y*NPIXELS)
          y = logistic_map(1-y, x)
      }
  }
}
