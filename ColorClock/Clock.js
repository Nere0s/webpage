var intervalID = window.setInterval(update, 100)

function set_background(color) {
   document.body.style.background = color;
}

function zero_pad_number(d, n) {
    s = d.toString();

    while (s.length < n) {
        s = "0".concat(s)
    }

    return s
}

function get_day_fraction(d) {
    let h = d.getHours()
    let m = d.getMinutes()
    let s = d.getSeconds()

    let f = 0.
    f += h / 24.
    f += m / (24.*60.)
    f += s / (24.*60.*60.)

    return f
}

function set_background_to_time(d) {
    let f = get_day_fraction(d)
    f += .5
    set_background(`hsl(${f*360}, 100%, 64%)`)
}

function set_clock_text(d) {
    let h = d.getHours()
    let m = d.getMinutes()
    let s = d.getSeconds()

    h = zero_pad_number(h, 2)
    m = zero_pad_number(m, 2)
    s = zero_pad_number(s, 2)

    document.getElementById("clock").textContent=`${h}:${m}:${s}`;
}

function set_fraction_text(d) {
    let f = get_day_fraction(d)
    f = Math.round(f*10000)/100
    document.getElementById("fracClock").textContent=`${f}%`;
}

function update() {
    let d = new Date()

    set_background_to_time(d)
    set_clock_text(d)
    set_fraction_text(d)
}

function toggle_show() {
    var x = document.getElementById("interface")
    var b = document.getElementById("button")

    if (x.style.display === "none") {
        x.style.display = "block"
        b.textContent = 'hide'
    } else {
        x.style.display = "none"
        b.textContent = 'show'
    }
}
