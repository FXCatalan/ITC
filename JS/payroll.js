const addButton = document.getElementById("add")
const minusButton = document.getElementById("minus")
//const modifyButton = document.getElementById("modify")

const delDialog = document.getElementById("del_confirmation");
const delDia_input = document.getElementById("dia_rowInput");
const delDia_confirm = document.getElementById("dia_confirm");

const tableBody = document.getElementById("tableBody")

// Variables

let payroll = [];

// Utility functions

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

function getIndexOf(identifier) {
    for (const index in payroll) {
        const obj = payroll[index]
        
        if (identifier != obj.id) continue;
        return index;
    }
}

function formatNum(number) {
    return number.toLocaleString();
}

function extractAllPatterns(htmlString) {
    const startTag = "<tr>";
    const endTag = "</tr>";

    let patterns = {};
    let currentIndex = 0;
    let count = 0;

    while (true) {
        let startIndex = htmlString.indexOf(startTag, currentIndex);
        if (startIndex === -1) break;

        let endIndex = htmlString.indexOf(endTag, startIndex);
        if (endIndex === -1) break;

        patterns[count] = [startIndex, endIndex + endTag.length];
        count++;
        currentIndex = endIndex + endTag.length;
    }

    return patterns;
}

function removeRow(num) {
    let rowStringPairs = extractAllPatterns(tableBody.innerHTML);

    let startIndex = rowStringPairs[num][0];
    let endIndex = rowStringPairs[num][1];

    let before = tableBody.innerHTML.substring(0, startIndex);
    let after = tableBody.innerHTML.substring(endIndex, tableBody.innerHTML.length);

    tableBody.innerHTML = before + after;
}

// Row init functions

function initRow(identifier) {
    let obj = payroll[getIndexOf(identifier)]; 

    let nameInp = document.getElementById(identifier+"_name");
    let daysInp = document.getElementById(identifier+"_days");
    let rateInp = document.getElementById(identifier+"_rate");
    let deducInp = document.getElementById(identifier+"_deduc");

    let removeBut = document.getElementById(identifier+"_remove");
    
    let rowNameTxt = document.getElementById(identifier+"_name");
    let rowNumText = document.getElementById(identifier+"_rowNum");
    let grossText = document.getElementById(identifier+"_gross");
    let netText = document.getElementById(identifier+"_net");

    let rowNum = +getIndexOf(identifier)+1

    function updRow() {
        grossText.innerHTML = "P " + formatNum(daysInp.value * rateInp.value);
        netText.innerHTML = "P " + formatNum(daysInp.value * rateInp.value - deducInp.value);

        obj.name = nameInp.value;
        obj.days = daysInp.value;
        obj.rate = rateInp.value;
        obj.gross = grossText.innerHTML;
        obj.deduc = deducInp.value;
        obj.net = netText.innerHTML;
    };

    rowNumText.innerHTML = rowNum;
    rowNameTxt.value = obj.name;
    daysInp.value = obj.days;
    rateInp.value = obj.rate;
    grossText.innerHTML = "P "+ obj.gross;
    rateInp.value = obj.rate;
    deducInp.value = obj.deduc;
    netText.innerHTML = "P "+ obj.net;

    nameInp.addEventListener("input", updRow);
    daysInp.addEventListener("input", updRow);
    rateInp.addEventListener("input", updRow);
    deducInp.addEventListener("input", updRow);
    removeBut.addEventListener("click", () => {
        let row = getIndexOf(identifier);
        
        removeRow(row);
        payroll.splice(row, 1);
        updateRows();
    });
}

function updateRows() {
    for (const index in payroll) {
        const val = payroll[index].id;
        initRow(val);
    }
}

function newRow() {
    let identifier = Date.now();
    let payrollObj = {
        id: identifier,
        name: "",
        days: 0,
        rate: 0,
        gross: 0,
        deduc: 0,
        net: 0,
    };

    tableBody.innerHTML += 
    "<tr> "
        +"<td id=\""+identifier+"_rowNum\"> "
            + (payroll.length+1)           
        +"</td>"
        
        +"<td>"
            +"<input class=\"input\" id=\""+identifier+"_name\"></input>"
        +"</td>"

        +"<td>"
            +"<input class=\"input\" id=\""+identifier+"_days\" type=\"number\"></input>"
        +"</td>"

        +"<td>"
            +"<input class=\"input\" id=\""+identifier+"_rate\" type=\"number\"></input>"
        +"</td>"

        +"<td id=\""+identifier+"_gross\">P 0</td>" 

        +"<td>"
            +"<input class=\"input\" id=\""+identifier+"_deduc\" type=\"number\"></input>"
        +"</td>"

        +"<td id=\""+identifier+"_net\">P 0</td>"

        +"<td>"
            +"<button class=\"button\" id=\""+identifier+"_remove\" type=\"number\">-</button> </td>"+
    " </tr>";

    payroll.push(payrollObj);
    updateRows();
}

/*

function removeLastPattern(htmlString) {
    let startTag = "<tr>";
    let endTag = "</tr>";
  
    let lastEndIndex = htmlString.lastIndexOf(endTag);
    if (lastEndIndex === -1) return htmlString;
  
    let lastStartIndex = htmlString.lastIndexOf(startTag, lastEndIndex);
    if (lastStartIndex === -1) return htmlString;
  
    let beforePattern = htmlString.substring(0, lastStartIndex); 
    let afterPattern = htmlString.substring(lastEndIndex + endTag.length); 
    return beforePattern + afterPattern; 
}

*/

// Main

(()=> {
    addButton.addEventListener("click", () => {
        newRow();
    })

    minusButton.addEventListener("click", () => {
        delDialog.showModal();
    })

    delDia_confirm.addEventListener("click", () => {
        let row = delDia_input.value;
        if (row == "") return;
        
        row = +row;
        if (row <= 0 || row > payroll.length) return;
        
        removeRow(row-1);
        payroll.splice(row-1, 1);
        updateRows();       
    })
})();