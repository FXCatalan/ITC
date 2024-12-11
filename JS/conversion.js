const celcInput = document.getElementById("celcInput")
const fahreInput = document.getElementById("fahreInput")

const meterInput = document.getElementById("meterInput")
const feetInput = document.getElementById("feetInput")

// Functions

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function convertCelcius(celcius) {
    return (celcius * (9/5) + 32).toString()
}

function convertFahre(fahre) {
    return ((fahre - 32) * 5 / 9).toString()
}

function convertMeters(meters) {
    return (meters * 3.28084).toString()
}

function convertFeet(feet) {
    return (feet / 3.28084).toString()
}

// Events 

celcInput.addEventListener('input', () => {
    let conversion = convertCelcius(celcInput.value)
    let decimalIndex = conversion.indexOf('.')
    let index = decimalIndex < 0 && conversion.length || decimalIndex
    
    conversion = conversion.slice(0, index) + conversion.slice(index, index + 4) //+ " F"
    fahreInput.value = conversion
})

fahreInput.addEventListener('input', () => {
    let conversion = convertFahre(fahreInput.value)
    let decimalIndex = conversion.indexOf('.')
    let index = decimalIndex < 0 && conversion.length || decimalIndex

    conversion = conversion.slice(0, index) + conversion.slice(index, index + 4) //+ " C"
    celcInput.value = conversion 
})

meterInput.addEventListener('input', () => {
    let conversion = convertMeters(meterInput.value)
    let decimalIndex = conversion.indexOf('.')
    let index = decimalIndex < 0 && conversion.length || decimalIndex

    conversion = conversion.slice(0, index) + conversion.slice(index, index + 4) //+ " ft"
    feetInput.value = conversion 
})

feetInput.addEventListener('input', () => {
    let conversion = convertFeet(feetInput.value)
    let decimalIndex = conversion.indexOf('.')
    let index = decimalIndex < 0 && conversion.length || decimalIndex

    conversion = conversion.slice(0, index) + conversion.slice(index, index + 4) //+ " m"
    meterInput.value = conversion 
})