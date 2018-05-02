//linreg.js

function calcularError(datos, b, m){
    var error = 0;
    datos.forEach(function(element) {
        error += Math.pow((element[1] - (m * element[0] + b)), 2);
    });
    return error/datos.length;
}

function pasoGradiente(datos, m, b, learningRate){
    var mg = 0, bg = 0, N = datos.length;
    datos.forEach(function(element) {
        mg += -(2 / N) * element[0] * (element[1] - ((m * element[0]) + b));
        bg += -(2 / N) * (element[1] - ((m * element[0]) + b));
    });
    M = m - (mg * learningRate);
    B = b - (bg * learningRate);
    return [B, M];
}

function descensoGradiente(datos, inim, inib, learningRate, iters){
    var m = inim, b = inib;
    var result;
    for(var i = 0; i < iters; ++i){
        //[m, b] = pasoGradiente(datos, m, b, learningRate);
        result = pasoGradiente(datos, m, b, learningRate);
        m = result[0];
        b = result[1];
    }
    return [m, b];
}
/*
var datos = [
    [2.9, 4.0],
    [6.7, 7.4],
    [4.9, 5.0],
    [7.9, 7.2],
    [9.8, 7.9],
    [6.9, 6.1],
    [6.1, 6.0],
    [6.2, 5.8],
    [6.0, 5.2],
    [5.1, 4.2],
    [4.7, 4.0],
    [4.4, 4.4],
    [5.8, 5.2]
];

console.log(calcularError(datos, 3, 6));
//1175.8784615384616
console.log(pasoGradiente(datos, 3, 2, 0.003));
//[1.9142461538461539, 2.4518815384615382]
console.log(descensoGradiente(datos, 2, 1, 0.003, 100));
//[0.7953077853540641, 0.79498853450669482]
*/