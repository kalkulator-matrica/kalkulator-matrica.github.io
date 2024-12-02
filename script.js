document.addEventListener("DOMContentLoaded", () => {
    initializeMatrix("A", 3, 3);
    initializeMatrix("B", 3, 3);

    setupDimensionControls("A");
    setupDimensionControls("B");
});

const checkbox = document.getElementById("ishodiste");

checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        document.getElementById("saIshodistem").classList.add("hidden");
        document.getElementById("coordXish").value = '';
        document.getElementById("coordYish").value = '';
    }
    else {
        document.getElementById("saIshodistem").classList.remove("hidden");
    }
});

// Synchronize sliders and inputs for matrix dimensions
function setupDimensionControls(id) {
    const rowsSlider = document.getElementById(`rows${id}`);
    const colsSlider = document.getElementById(`cols${id}`);
    const rowsInput = document.getElementById(`rows${id}Input`);
    const colsInput = document.getElementById(`cols${id}Input`);

    const syncDimensions = () => {
        rowsInput.value = rowsSlider.value;
        colsInput.value = colsSlider.value;
        initializeMatrix(id, parseInt(rowsSlider.value), parseInt(colsSlider.value));
    };

    const syncSliders = () => {
        rowsSlider.value = rowsInput.value;
        colsSlider.value = colsInput.value;
        initializeMatrix(id, parseInt(rowsInput.value), parseInt(colsInput.value));
    };

    rowsSlider.addEventListener("input", syncDimensions);
    colsSlider.addEventListener("input", syncDimensions);

    rowsInput.addEventListener("change", syncSliders);
    colsInput.addEventListener("change", syncSliders);
}

// Initialize a matrix with input fields
function initializeMatrix(id, rows, cols) {
    const matrixDiv = document.getElementById(`matrix${id}`);
    matrixDiv.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.classList.add("matrix-row");
        for (let j = 0; j < cols; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.value = '';
            input.className = `matrix-input-${id}`;
            row.appendChild(input);
        }
        matrixDiv.appendChild(row);
    }
}

// Get matrix values from input fields                                     /* */
function getMatrixValues(id) {
    const inputs = document.querySelectorAll(`.matrix-input-${id}`);
    const rows = parseInt(document.getElementById(`rows${id}`).value);
    const cols = parseInt(document.getElementById(`cols${id}`).value);
    const values = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            if (isNaN(parseFloat(inputs[i * cols + j].value))) {  //if there is any missing values an alert is thrown
                alert("Popuni matricu!");
                return;
            }
            row.push(parseFloat(inputs[i * cols + j].value));
        }
        values.push(row);
    }
    return values;
}

// Set matrix values to input fields
function setMatrixValues(id, values) {
    const rows = values.length;
    const cols = values[0].length;
    document.getElementById(`rows${id}`).value = rows;
    document.getElementById(`cols${id}`).value = cols;
    initializeMatrix(id, rows, cols);
    const inputs = document.querySelectorAll(`.matrix-input-${id}`);
    inputs.forEach((input, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        input.value = values[row][col];
    });
}

// Display result in a table format
function displayResult(matrix) {

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    const table = document.createElement("table");
    table.className = "matrix-table";
    matrix.forEach(row => {
        const rowElem = document.createElement("tr");
        row.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value.toFixed(2);
            rowElem.appendChild(cell);
        });
        table.appendChild(rowElem);
    });
    resultDiv.appendChild(table);
}

//result for translation and rotation window
function displayResultTrans(x, y) {
    const resultDiv = document.getElementById("result-trans");
    resultDiv.innerHTML = "";

    const table = document.createElement("table");
    table.className = "matrix-table";

    const rowElemX = document.createElement("tr");

    const cellX = document.createElement("td");
    cellX.textContent = "X: " + x.toFixed(2);
    rowElemX.appendChild(cellX);

    table.appendChild(rowElemX);
    const rowElemY = document.createElement("tr");

    const cellY = document.createElement("td");
    cellY.textContent = "Y: " + y.toFixed(2);
    rowElemY.appendChild(cellY);

    table.appendChild(rowElemY);

    resultDiv.appendChild(table);
}

function displayResultRot(x, y) {
    const resultDiv = document.getElementById("result-rot");
    resultDiv.innerHTML = "";

    const table = document.createElement("table");
    table.className = "matrix-table";

    const rowElemX = document.createElement("tr");

    const cellX = document.createElement("td");
    cellX.textContent = "X: " + x.toFixed(2);
    rowElemX.appendChild(cellX);

    table.appendChild(rowElemX);
    const rowElemY = document.createElement("tr");

    const cellY = document.createElement("td");
    cellY.textContent = "Y: " + y.toFixed(2);
    rowElemY.appendChild(cellY);

    table.appendChild(rowElemY);

    resultDiv.appendChild(table);
}




// Matrix operations

// Clear all matrix values
function clearMatrix(id) {
    const inputs = document.querySelectorAll(`.matrix-input-${id}`);
    inputs.forEach(input => (input.value = ''));
}

// Fill matrix with random values
function fillRandom(id) {
    const inputs = document.querySelectorAll(`.matrix-input-${id}`);
    inputs.forEach(input => (input.value = (Math.random() * 10).toFixed(2)));
}

// Transpose matrix
function transposeMatrix(id) {
    const matrix = getMatrixValues(id);
    const result = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    setMatrixValues(id, result);
    displayResult(result);
}

// Multiply matrix by a scalar
function scalarMultiply(id) {
    const scalar = parseFloat(prompt("Unesi broj:"));
    if (isNaN(scalar)) {
        alert("Neispravni broj!");
        return;
    }
    const matrix = getMatrixValues(id);
    const result = matrix.map(row => row.map(value => value * scalar));
    setMatrixValues(id, result);
    displayResult(result);
}

// Add two matrices
function addMatrices() {
    const A = getMatrixValues("A");
    const B = getMatrixValues("B");
    if (A.length !== B.length || A[0].length !== B[0].length) {
        alert("Matrice moraju imati iste dimenzije za zbrajanje!");
        return;
    }
    const result = A.map((row, i) => row.map((value, j) => value + B[i][j]));
    displayResult(result);
}

// Subtract two matrices
function subtractMatrices() {
    const A = getMatrixValues("A");
    const B = getMatrixValues("B");
    if (A.length !== B.length || A[0].length !== B[0].length) {
        alert("Matrice moraju imati iste dimenzije za oduzimanje!");
        return;
    }
    const result = A.map((row, i) => row.map((value, j) => value - B[i][j]));
    displayResult(result);
}

// Multiply two matrices
function multiplyMatrices() {
    const A = getMatrixValues("A");
    const B = getMatrixValues("B");
    if (A[0].length !== B.length) {
        alert("Matrice moraju biti komplementarne za množenje!");
        return;
    }
    const result = A.map(row =>
        B[0].map((_, colIndex) =>
            row.reduce((sum, value, rowIndex) => sum + value * B[rowIndex][colIndex], 0)
        )
    );
    displayResult(result);
}

// Calculate determinant of a square matrix
function determinant(id) {
    const matrix = getMatrixValues(id);
    if (matrix.length !== matrix[0].length) {
        alert("Matrica mora biti kvadratna za računanje determinante!");
        return;
    }
    const result = calculateDeterminant(matrix);
    //alert(`Determinant: ${result}`);
    displayResult([[result]]);
}

function calculateDeterminant(matrix) {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    return matrix[0].reduce((sum, value, colIndex) => {
        const subMatrix = matrix.slice(1).map(row => row.filter((_, i) => i !== colIndex));
        return sum + value * calculateDeterminant(subMatrix) * (colIndex % 2 === 0 ? 1 : -1);
    }, 0);
}

// Calculate inverse of a square matrix
function inverseMatrix(id) {
    const matrix = getMatrixValues(id);
    if (matrix.length !== matrix[0].length) {
        alert("Matrica mora biti kvadratna za računanje inverzije!");
        return;
    }
    const det = calculateDeterminant(matrix);
    if (det === 0) {
        alert("Nije moguće izračunati inverznu matricu!");
        return;
    }
    const n = matrix.length;
    const adjugate = matrix.map((row, i) =>
        row.map((_, j) => {
            const minor = matrix
                .filter((_, rowIdx) => rowIdx !== i)
                .map(row => row.filter((_, colIdx) => colIdx !== j));
            return calculateDeterminant(minor) * ((i + j) % 2 === 0 ? 1 : -1);
        })
    );
    const result = adjugate[0].map((_, i) => adjugate.map(row => row[i])).map(row => row.map(value => value / det));
    setMatrixValues(id, result);
    displayResult(result);
}

//switch to translation window
function switchWindowTranslation(id) {
    document.getElementById("calculator-window").classList.add("hidden");
    document.getElementById("traslation-window").classList.remove("hidden");
}

//switch to rotation window
function switchWindowRotation(id) {
    document.getElementById("calculator-window").classList.add("hidden");
    document.getElementById("rotation-window").classList.remove("hidden");
}

//back to calc window
function switchWindowCalc(id) {
    document.getElementById("calculator-window").classList.remove("hidden");
    document.getElementById("traslation-window").classList.add("hidden");
    document.getElementById("rotation-window").classList.add("hidden");
}

//translation
function translateMy(id) {
    const coordX = document.getElementById("coordX");
    const coordY = document.getElementById("coordY");
    const valueI = document.getElementById("i");
    const valueJ = document.getElementById("j");
    let rX = parseFloat(coordX.value) + parseFloat(valueI.value);
    let rY = parseFloat(coordY.value) + parseFloat(valueJ.value);
    if (isNaN(rX) || isNaN(rY)) {
        alert("Unesi vrijednosti!");
        return;
    }
    let result = [];

    result.push([rX], [rY]);
    displayResultTrans(rX, rY);

}

//rotation
function rotation(id) {
    const x = parseFloat(document.getElementById("coordXr").value);
    let y = parseFloat(document.getElementById("coordYr").value);
    const deg = parseFloat(document.getElementById("kut").value);
    let xs = parseFloat(document.getElementById("coordXish").value);
    let ys = parseFloat(document.getElementById("coordYish").value);

    if (checkbox.checked) {
        xs = 0;
        ys = 0;
    }

    const rad = (deg * Math.PI) / 180;

    let rX = xs + (x - xs) * Math.cos(rad) - (y - ys) * Math.sin(rad);
    let rY = ys + (x - xs) * Math.sin(rad) + (y - ys) * Math.cos(rad);

    let result = [];

    if (isNaN(rX)) {
        alert("Unesi vrijednosti!");
        return;
    }

    result.push([rX], [rY]);
    displayResultRot(rX, rY);
}

// Raise matrix to a power
/*function powerMatrix(id) {
    const power = parseInt(prompt("Enter the power:"));
    if (isNaN(power) || power < 0) {
        alert("Nroj ne smije biti negativan!");
        return;
    }
    let matrix = getMatrixValues(id);
    if (matrix.length !== matrix[0].length) {
        alert("Matrica mora biti kvadratna za računanje eksponente!");
        return;
    }
    let result = matrix;
    for (let i = 1; i < power; i++) {
        result = multiplyMatricesHelper(result, matrix);
    }
    displayResult(result);
}*/

// Helper to multiply matrices
function multiplyMatricesHelper(A, B) {
    return A.map(row =>
        B[0].map((_, colIndex) =>
            row.reduce((sum, value, rowIndex) => sum + value * B[rowIndex][colIndex], 0)
        )
    );
}

