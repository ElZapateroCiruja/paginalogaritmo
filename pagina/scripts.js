let logChart = null; // Variable para almacenar el gráfico

// Función para convertir una fracción a número
function parseFraction(input) {
    if (input.includes("/")) {
        let [numerator, denominator] = input.split("/").map(Number); // Separar el numerador y el denominador
        if (denominator === 0) {
            alert("El denominador no puede ser cero.");
            return NaN;
        }
        return numerator / denominator;
    }
    return parseFloat(input);
}

document.getElementById('logForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const a = parseFraction(document.getElementById('a').value);
    const b = parseFraction(document.getElementById('b').value);
    const c = parseFraction(document.getElementById('c').value);
    const k = parseFraction(document.getElementById('k').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(k)) {
        alert("Por favor ingrese valores válidos.");
        return;
    }

    if (b <= 0 || b === 1) {
        alert("El valor de 'b' debe ser mayor que 0 y no puede ser igual a 1.");
        return;
    }

    // Cálculo de la raíz de la función logarítmica
    let raiz = null;
    if (a !== 0) {
        // Calculamos la raíz, que es el valor de x cuando la función se iguala a 0
        raiz = (Math.pow(b, -k / a)) + c; // Esto es una aproximación del valor de la raíz
    }
    const ordenada = c;
    const dominio = `( ${c.toFixed(2)}, +∞ )`;
    const parOrdenado = `(${raiz !== null ? raiz.toFixed(2) : "no definido"}, 0)`;
    const asintota = `x = ${-b}`;
    const funcionTipo = a > 0 ? "Creciente" : "Decreciente"; // Determinar si es creciente o decreciente

    // Mostrar resultados
    document.getElementById('raizValue').textContent = raiz !== null ? raiz.toFixed(2) : "No definida";
    document.getElementById('ordenadaValue').textContent = ordenada.toFixed(2);
    document.getElementById('asintotaValue').textContent = asintota;
    document.getElementById('dominioValue').textContent = dominio;
    document.getElementById('parOrdenadoValue').textContent = parOrdenado;
    document.getElementById('funcionTipo').textContent = funcionTipo;

    // Crear gráfico
    const ctx = document.getElementById('logChart').getContext('2d');
    const xValues = [];
    const yValues = [];
    const asintotaX = -b; // Valor de la asíntota

    for (let x = 0.1; x <= 50; x += 0.1) { 
        const y = a * Math.log(x, b) + c;
        xValues.push(x);
        yValues.push(y);
    }

    if (logChart) {
        logChart.destroy(); // Eliminar el gráfico anterior si existe
    }

    logChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'Función Logarítmica',
                data: yValues,
                borderColor: '#bf1818cf',
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: false,
                    ticks: {
                        stepSize: 5
                    }
                },
                y: {
                    min: Math.min(...yValues) - 2,
                    max: Math.max(...yValues) + 2,
                    ticks: {
                        stepSize: 5
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return 'y = ' + tooltipItem.raw.toFixed(2);
                        }
                    }
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        xMin: asintotaX,
                        xMax: asintotaX,
                        borderColor: '#ff6347', // Rojo
                        borderWidth: 2,
                        label: {
                            content: `Asintota x = ${asintotaX}`,
                            enabled: true,
                            position: "top"
                        }
                    }]
                }
            }
        }
    });
});

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('logForm').reset();
    document.getElementById('raizValue').textContent = '';
    document.getElementById('ordenadaValue').textContent = '';
    document.getElementById('asintotaValue').textContent = '';
    document.getElementById('dominioValue').textContent = '';
    document.getElementById('parOrdenadoValue').textContent = '';
    document.getElementById('funcionTipo').textContent = ''; // Limpiar tipo de función
    if (logChart) {
        logChart.destroy(); // Borrar el gráfico
    }
});
