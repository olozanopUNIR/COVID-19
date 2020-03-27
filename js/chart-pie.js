/////////////////////////////////////////////////////////////////////////////////
//
//  Título:         Trabajo - Creación de una aplicación web en el cliente
//  Institución:    Universidad Internacional de la Rioja - México
//  Autor:          Óscar Lozano Pérez
//  Archivo:        chart-pie.js
//  Descripción:    Crea la gráfica de pie
//
/////////////////////////////////////////////////////////////////////////////////

function drawPie(recu,muer,acti) {
    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';

// LLena la gráfica con los datos obtenidos del archivo jQueryCovid.js
    var recuperado = recuperaciones + 1;
    var numero1 = 1;
    var numero2 = 2;
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Casos Recuperados", "Muertes", "Casos Activos"],
            datasets: [{
                data: [recu, muer, acti],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });

}