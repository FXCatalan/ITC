const factInput = document.getElementById("factInput")
const sumInput = document.getElementById("sumInput")
const avgInput = document.getElementById("avgInput")

const factConfirm = document.getElementById("factConfirm")
const sumConfirm = document.getElementById("sumConfirm")
const avgConfirm = document.getElementById("avgConfirm")

const factInfo = document.getElementById("factInfo")
const sumInfo = document.getElementById("sumInfo")
const avgInfo = document.getElementById("avgInfo")


// Functions

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

// Event Listeners

factConfirm.addEventListener("click", () => {
    let terms = +factInput.value
    let prev = terms
    let factorial = 1

    while (prev > 0) {
        factorial*= prev
        prev--
    }

    factInfo.innerHTML = "<p>Factorial of natural numbers up to "+ terms +" is: "+ factorial +"</p>"
})

sumConfirm.addEventListener("click", () => {
    let terms = +sumInput.value
    let prev = terms
    let sum = 0

    do {
        sum += prev
        prev--
    } while (prev > 0)
    sumInfo.innerHTML = "<p>Sum of natural numbers up to "+ terms +" is: "+ sum +"</p>"
})

avgConfirm.addEventListener("click", () => {
    let terms = +avgInput.value
    let prev = terms
    let sum = 0
    let avg = 0

    for (i=terms; i>0; i--) {
        sum += prev
        prev--
    }


    avg = (sum == 0 && terms == 0) ? 0: sum/terms
    avgInfo.innerHTML = "<p>Average of natural numbers up to "+ terms +" is: "+ avg +"</p>"
})