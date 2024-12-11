const incomeInput = document.getElementById("input")
const computeButton = document.getElementById("compute")
const taxInfoDiv = document.getElementById("taxInfo")

const taxRanges = [250000, 400000, 800000, 2000000, 8000000]

// Functions

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function getBaseTax(income) {
    if (income <= 250000) {
        return 0;
    } else if (income > 250000 && income <= 400000) {
        return 0;
    } else if (income > 400000 && income <= 800000) {
        return 30000;
    } else if (income > 800000 && income <= 2000000) {
        return 130000;
    } else if (income > 2000000 && income <= 8000000) {
        return 490000;
    } else {
        return 2410000;
    }
}

function getRateTax(income) {
    if (income <= 250000) {
        return [0, 0];
    } else if (income > 250000 && income <= 400000) {
        return [0.2, 0];
    } else if (income > 400000 && income <= 800000) {
        return [0.25, 1];
    } else if (income > 800000 && income <= 2000000) {
        return [0.3, 2];
    } else if (income > 2000000 && income <= 8000000) {
        return [0.32, 3];
    } else {
        return [0.35, 4];
    }
}

function formatNum(number) {
    return number.toLocaleString()
}

// Events
computeButton.addEventListener("click", () => {
    let income = +incomeInput.value
    let baseTax = getBaseTax(income)
    let [rateTax, limit] = getRateTax(income)
    let excess = income - taxRanges[limit]
    excess = excess < 0 ? 0 : excess
    
    let incomeTax = baseTax + excess * rateTax

    baseTax = formatNum(baseTax)
    rateTax = formatNum(rateTax)*100
    excess = formatNum(excess)
    incomeTax = formatNum(incomeTax)

    taxInfoDiv.innerHTML = "<p>Base Tax: P "+ baseTax +"</p>"+ 
    "<p>Tax Rate: "+ rateTax +"%</p>"+ 
    "<p>Taxable Excess: P "+ excess +"</p>"+ 
    "<p id=\"taxText\">Income Tax: P "+ incomeTax +"</p>"
})