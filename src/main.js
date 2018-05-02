var data = [];
var data2 = [];
var arraydata;
var lrate

function graficar(){
    document.getElementById('salida').value = null;
    var select = document.getElementById("sel");
    var select2 = document.getElementById("lr");

    var selectdata = select.options[select.selectedIndex].value;
    var selectlrat = select2.options[select2.selectedIndex].value;
    switch(selectdata){
        case '1': data = dataset1; break;
        case '2': data = dataset2; break;
        case '3': data = dataset3; break;
        case '4': data = dataset4; break;
        case '5': data = dataset5; break;
    }
    switch(selectlrat){
        case '1': lrate = 0.01; break;
        case '2': lrate = 0.001; break;
        case '3': lrate = 0.0001; break;
        case '4': lrate = 0.00001; break;
        case '5': lrate = 0.000001; break;
    }

    arraydata = genArray(data);

    document.getElementById('generar').removeAttribute('disabled');

    var ctx = document.getElementById('chart').getContext('2d');
    var scatter = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Datos Etiquetados',
                backgroundColor: 'rgba(0, 102, 153, 100)',
                data: data
            }]
        },
        options: {
        }
    });
}

function graficar2(mb){
    data2 = getLineData(arraydata, mb[0], mb[1]);
    var ctx = document.getElementById('chart').getContext('2d');
    var scatter = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Datos Etiquetados',
                backgroundColor: 'rgba(0, 102, 153, 100)',
                data: data
            }, {
                label: 'Linea óptima',
                backgroundColor: 'rgba(58, 182, 119, 100)',
                borderColor: 'rgba(58, 182, 119, 100)',
                data: data2,
                type: 'line',
                showLine: 'true',
                fill: false
            }]
        },
        options: {
        }
    });
}

function regressionLineal(){
    document.getElementById('salida').value = null;

    //var lrate = ;
    var epochs = 1000;
    var mb = [0, 0];
    addText("calculando error...");
    addText("Error inicial: " + calcularError(arraydata, 0, 0), '\n');
    addText("Calculando regresión lineal...", '\n');
    addText("descenso por gradiente...", '\n');
    addText("minimizando error...", '\n');
    mb = descensoGradiente(arraydata, 0, 0, lrate, epochs);
    addText("error: " + calcularError(arraydata, mb[0], mb[1]), '\n');
    addText("m: " + mb[0], '\n');
    addText("b: " + mb[1], '\n');
    addText("graficando linea óptima...", '\n');
    graficar2(mb);
    addText("hecho!", '\n');
}

function addText(ntext, esc=''){
    var textarea = document.getElementById('salida');
    var currenValue = textarea.value;
    textarea.value = currenValue + esc + ntext;
}

function genArray(obj){
    var newarray = [];
    obj.forEach(function(element){
        newarray.push([element.x, element.y]);
    });
    return newarray;
}
/*
function getMax(arr){
    var xmax = 0;
    var ymax = 0;
    arr.forEach(function(element){
        if (element[0] > xmax) xmax = element[0];
        if (element[0] > ymax) ymax = element[1];
    });
    return [xmax, ymax];
}

function getMin(arr){
    max = getMax(arr);
    var xmin = max[0];
    var ymin = max[1];
    arr.forEach(function(element){
        if (element[0] < xmin) xmin = element[0];
        if (element[0] < ymin) ymin = element[1];
    });
    return [xmin, ymin];
}*/

function getLineData(arr, m, b){
    var xmax = 0;
    var ymax = 0;
    arr.forEach(function(element){
        if (element[0] > xmax) xmax = element[0];
        if (element[1] > ymax) ymax = element[1];
    });
    var xmin = xmax;
    var ymin = ymax;
    arr.forEach(function(element){
        if (element[0] < xmin) xmin = element[0];
        if (element[1] < ymin) ymin = element[1];
    });

    var linedata = [
        {x: xmax, y: ((xmax * m) + b) },
        {x: xmin, y: ((xmin * m) + b) }
    ]
    return linedata;
}