/////////////////////////////////////////////////////////////////////////////////
//
//  Título:         Trabajo - Creación de una aplicación web en el cliente
//  Institución:    Universidad Internacional de la Rioja - México
//  Autor:          Óscar Lozano Pérez
//  Archivo:        jQueryDatosCovid.js
//  Descripción:    Lógica del proyecto que administra los datos
//
/////////////////////////////////////////////////////////////////////////////////

// Variables Generales
var data;
var ayer;
var hoy;
var casos = 0;
var recuperaciones = 0;
var muertes = 0;
var activos = 0;
var flag = 0;
var paises = [];
var flagCountry=0;
var totalCountry=0;
var fila = 0;

var datosTablaDia;

var tablaDias = [];

// for(row = 1;row<14757;row++){
//     for(subrow = 1; subrow<62;subrow++){
//         tablaDias[subrow-1] = [];
//         tablaDias[subrow-1][0]="";
//         tablaDias[subrow-1][1]=0;
//         tablaDias[subrow-1][2]=0;
//         tablaDias[subrow-1][3]=0;
//     }

var filaDias = 0;
var flagDias = 0;
var fechaDias = 0;
$(document).ready(function(){
    $('#header').load('../header-ads.html');
    $('#footer').load('../footer-ads.html');

    // Variables Generales
    var data;
    var ayer;
    var hoy;
    var casos = 0;
    var recuperaciones = 0;
    var muertes = 0;
    var activos = 0;
    var flag = 0;
    var paises = [];
    var flagCountry=0;
    var totalCountry=0;
    var fila = 0;

    var diaUltimoReporte = "2020-03-23";




    // Abre la dirección para traer los datos
    $.ajax({
        type: "GET",
        url: "time-series-19-covid-combined_csv.csv",
        dataType: "text",
        success: function(response)
        {
            data = $.csv.toArrays(response);
            // tablaGeneral(data);
            obtenerFechaHoy();
            contarTotales(data);
            crearTabla(paises);
            funcionTablaDias();
        }
    });
    document.getElementById("csv-display").onclick = function () {
        alert("Total Cases: " + paises + "Total Recoveries: " + recuperaciones + "Total Deaths: " + muertes);
    };
    // Obtiene la fecha del dia
    function obtenerFechaHoy() {
        var fecha = new Date();

        var mes = fecha.getMonth()+1;
        var dia = fecha.getDate();

        hoy = fecha.getFullYear() + '-' +
            (mes<10 ? '0' : '') + mes + '-' +
            (dia<10 ? '0' : '') + dia;
        //alert(output);
        obtenerFechaAyer(fecha);
    }

    // Obtiene la fecha del dia anterior ya que son los datos mas recientes
    function obtenerFechaAyer(fecha){
        var fechaAyer = new Date(fecha);
        fechaAyer.setDate(fechaAyer.getDate()-1);

        var mesAyer = fechaAyer.getMonth()+1;
        var diaAyer = fechaAyer.getDate();
        var anoAyer = fechaAyer.getFullYear();

        ayer = anoAyer + '-' +
            (mesAyer<10 ? '0' : '') + mesAyer + '-' +
            (diaAyer<10 ? '0' : '') + diaAyer;
    }

    // Genera una tabla con código HTML
    function tablaGeneral(data) {
        var html = '<table  class="table table-condensed table-hover table-striped">';

        if(typeof(data[0]) === 'undefined') {
            return null;
        } else {
            $.each(data, function( index, row ) {
                //bind header
                if(index == 0) {
                    html += '<thead>';
                    html += '<tr>';
                    $.each(row, function( index, colData ) {
                        html += '<th>';
                        html += colData;
                        html += '</th>';
                    });
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';
                } else {
                    html += '<tr>';
                    $.each(row, function( index, colData ) {
                        html += '<td>';
                        html += colData;
                        html += '</td>';
                    });
                    html += '</tr>';
                }
            });
            html += '</tbody>';
            html += '</table>';

            $('#tablaPaises').append(html);
        }
    }

    // Suma los datos de los casos totales, recuperaciones, muertes y activos
    function contarTotales(data){
        if(typeof(data[0]) === 'undefined') {
            return null;
        } else {
            $.each(data, function( index, row ) {
                if(index!=0) {
                    $.each(row, function( index, colData ) {
                        // Primer Columna Fecha
                        if (colData==diaUltimoReporte){
                            flag=1;
                            paises[fila]=[];
                        }
                        // Segunda Columna Pais
                        if (flag==1 && index==1){
                            if(colData==""){
                            }
                            else{
                                paises[fila][0]=colData;
                            }
                        }
                        // Tercera Columna Estado/Provincia
                        if (flag==1 && index==2){
                            if(colData==""){
                                paises[fila][1]="";
                            }
                            else{
                                paises[fila][1]=colData;
                            }
                        }
                        // Cuarta Columna Confirmados
                        if (flag==1 && index==5){
                            if(colData==""){
                            }
                            else{
                                casos=casos + parseInt(colData);
                                paises[fila][2]=colData;
                            }
                        }
                        // Quinta Columna Recuperados
                        if(flag==1 && index==6){
                            if(colData==""){
                            }
                            else{
                                recuperaciones=recuperaciones + parseInt(colData);
                                paises[fila][3]=colData;}
                        }
                        // Sexta columna Muertes
                        if(flag==1 && index==7){
                            if(colData==""){
                            }
                            else{
                                muertes=muertes + parseInt(colData);
                                flag=0;
                                paises[fila][4]=colData;
                                fila=fila+1;
                            }
                        }
                    });
                }
                else{
                    paises[fila]=[];
                    paises[fila][0]="País";
                    paises[fila][1]="Estado/Provincia";
                    paises[fila][2]="Casos";
                    paises[fila][3]="Recuperados";
                    paises[fila][4]="Muertes";
                    fila=fila+1;
                }
            });
        }

    }

    function crearTabla(tabla){
        var html = '<table  class="table table-condensed table-hover table-striped">';

        if(typeof(tabla[0]) === 'undefined') {
            return null;
        } else {
            $.each(tabla, function( index, row ) {
                //bind header
                if(index == 0) {
                    html += '<thead>';
                    html += '<tr>';
                    $.each(row, function( index, colData ) {
                        html += '<th>';
                        html += colData;
                        html += '</th>';
                    });
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';
                } else {
                    html += '<tr>';
                    $.each(row, function( index, colData ) {
                        html += '<td>';
                        html += colData;
                        html += '</td>';
                    });
                    html += '</tr>';
                }
            });
            html += '</tbody>';
            html += '</table>';


            $('#csv-display').append(convertirMiles(casos));
            $('#casosRecuperados').append(convertirMiles(recuperaciones));
            $('#casosMuertes').append(convertirMiles(muertes));
            activos = casos - recuperaciones - muertes;
            $('#casosActivos').append(convertirMiles(activos));
            $('#tablaEjemplo').append(html);
            drawPie(recuperaciones,muertes,activos);


        }
    }

    function convertirMiles(cadenaMiles){
        var cadena = cadenaMiles.toString();
        var cadenaResultado = "";
        if(cadena.length>=4 && cadena.length<7){
            cadenaResultado = cadena.slice(0,cadena.length-3) + "," + cadena.slice(cadena.length-3,cadena.length);
        }
        else if (cadena.length>7){
            cadenaResultado = cadena.slice(cadena.length-7,cadena.length-6)+","+cadena.slice(cadena.length-6,cadena.length-3) + "," + cadena.slice(cadena.length-3,cadena.length);
        }
        else{
            cadenaResultado = cadenaMiles;
        }
        return cadenaResultado;
    }

    function funcionTablaDias(){
        $.ajax({
            type: "GET",
            url: "DatosTablaDia.csv",
            dataType: "text",
            success: function(response)
            {
                datosTablaDia = $.csv.toArrays(response)
                drawChart(datosTablaDia);
            }
        });
    }







    function contarPaises(data){
        if(typeof(data[0]) === 'undefined') {
            return null;
        } else {
            $.each(data, function( index, row ) {
                if(index!=0) {
                    $.each(row, function( index, colData ) {
                        if (colData==diaUltimoReporte){
                            flag=1;
                            paises[fila]=[];
                        }
                        if (fila!=0){
                            if (paises[fila-1][0]==colData){
                                flag=0;
                            }
                        }
                        if (flag==1 && index==1){
                            if(colData==""){
                            }
                            else{
                                paises[fila][0]=colData;
                            }
                        }
                        if (flag==1 && index==5){
                            if(colData==""){
                            }
                            else{
                                paises[fila][1]=colData;
                            }
                        }
                        if(flag==1 && index==6){
                            if(colData==""){
                            }
                            else{
                                paises[fila][2]=colData;                                }
                        }
                        if(flag==1 && index==7){
                            if(colData==""){
                            }
                            else{
                                paises[fila][3]=colData;
                                flag=0;
                                fila=fila+1;
                            }
                        }
                    });
                }
            });
        }

    }
});