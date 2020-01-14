
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let txt_speed = document.getElementById("speed") // maybe 4
let txt_snow_amount = document.getElementById("snow_amount") // maybe 10

let y_array = []
let x_array = []

let snowflake_amount = 10
let speed = 4

let interval

function drawSnowflake(x, y) {
    ctx.beginPath()
    ctx.fillStyle = "#ffffff"

    let radius = 1
    let startAngle = 0
    let endAngle = Math.PI * 2
    let anticlockwise = false

    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)

    ctx.fill()
}

function addCoordinates() {
    let temp_y_array = []
    let temp_x_array = []
    for (let i = 0; i < snowflake_amount; i++) {
        let random = Math.random();
        temp_y_array.push(Number(Number(random * 10).toFixed(0)))
        temp_x_array.push(Number(Number(random * 1000).toFixed(0)))
    }
    x_array.push(temp_x_array)
    y_array.push(temp_y_array)
}

function drawSnowflakes() {
    clearCanvas()
    addCoordinates()
    for (let i = 0; i < x_array.length; i++) {
        let x_coordinates = x_array[i]
        let y_coordinates = y_array[i]
        for (let j = 0; j < x_coordinates.length; j++) {
            let x = x_coordinates[j]
            let y = y_coordinates[j]
            drawSnowflake(x, y)
            increaseCoordinateY(i, j)
        }
    }
    meltSnow()
}

function increaseCoordinateY(i, j) {
    let random = Math.random() * speed
    let y = y_array[i][j] + random
    if (y < (canvas.height - 5)) {
        y_array[i][j] = y
    }
}

function meltSnow() {
    let melted = y_array.length
    if (melted > 110) {
        y_array.splice(0, 10)
        x_array.splice(0, 10)
    }
}

function start() {
    interval = setInterval(drawSnowflakes, 200)
}

function stop() {
    clearInterval(interval)
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

txt_speed.onchange = function () {
    speed = Number(txt_speed.value)
}

txt_snow_amount.onchange = function () {
    snowflake_amount = Number(txt_snow_amount.value)
}
