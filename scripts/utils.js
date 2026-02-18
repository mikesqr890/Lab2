/*
*  Archivo utils.js
*  Creado para: Calculadora de Cuota Mensual
*  Curso: EDyA1 - Universidad Autónoma de Occidente
*
*  Descripción: 
*  Proporciona la función de cálculo de cuota mensual de préstamos
*/

// Función para calcular la cuota mensual usando la fórmula del préstamo
function calcularCuota(prestamo, meses, interes) {
    // Fórmula: cuota = prestamo * ((1+i)^n * i) / ((1+i)^n - 1)
    const i = interes;
    const n = meses;
    const numerador = Math.pow(1 + i, n) * i;
    const denominador = Math.pow(1 + i, n) - 1;
    const cuota = prestamo * (numerador / denominador);
    return cuota;
}

// Función para crear la página HTML de respuesta con el resultado
function crearPaginaRespuesta(nombre, prestamo, meses, interes, cuota) {
    const interesFormateado = (interes * 100).toFixed(2);
    const cuotaFormateada = cuota.toFixed(2);
    const prestamoFormateado = parseFloat(prestamo).toFixed(2);
    
    const nPage = `
        <!DOCTYPE html>
        <head>
            <title>Calculadora de Cuota Mensual</title>
            <style>
                body {
                    background-color: lightcyan;
                    font-size: 20px;
                    font-family: Arial, sans-serif;
                }

                .elEstilo {
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                    align-items: center;
                }
                    
                h1 {
                    color: darkgreen;
                    text-align: center;
                    font-size: 30px;
                }

                footer {
                    text-align: center;
                    font-size: 15px;
                    margin-top: 30px;
                }

                table {
                    width: 500px;
                    margin: 20px auto;
                    padding: 5px;
                    border: 2px solid darkgreen;
                    border-collapse: collapse;
                    background-color: #6ee290;
                }

                table caption {
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: darkgreen;
                    font-size: 20px;
                }

                td {
                    padding: 10px;
                    border: 1px solid #2d7a4d;
                }

                input {
                    margin: 5px;
                    padding: 8px;
                    background-color: white;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    width: 250px;
                    font-size: 16px;
                }

                input:focus {
                    outline: 2px solid darkgreen;
                }

                input[type="submit"] {
                    width: 100%;
                    height: 45px;
                    background-color: darkgreen;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: bold;
                }

                input[type="submit"]:hover {
                    background-color: #2d7a4d;
                }

                textarea {
                    width: 500px;
                    height: 100px;
                    padding: 10px;
                    margin: 10px auto;
                    font-family: 'Courier New', monospace;
                    font-size: 14px;
                    border: 2px solid darkgreen;
                    border-radius: 4px;
                    background-color: #f0f0f0;
                }

                .resultado {
                    background-color: #e8f5e9;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 20px auto;
                    width: 500px;
                    border: 2px solid darkgreen;
                }

                .coloreado {
                    background-color: #6ee290;
                    padding: 15px;
                    border-radius: 5px;
                }
            </style>    
        </head>
        <body>
            <main> 
                <div class="elEstilo">
                    <h1>Calculadora de Cuota Mensual</h1>
                    
                    <form action="/calcular" enctype="application/x-www-form-urlencoded" method="post">
                        <table>
                            <caption>Ingrese los siguientes datos</caption>
                            <tbody>
                                <tr>
                                    <td>Nombre</td>
                                    <td><input type="text" value="${nombre}" name="nombre" placeholder="Ingresa el nombre" required></td>
                                </tr>
                                <tr>
                                    <td>Préstamo</td>
                                    <td><input type="number" value="${prestamo}" name="prestamo" placeholder="Ingrese la Cantidad" required></td>
                                </tr>
                                <tr>
                                    <td>Meses</td>
                                    <td><input type="number" value="${meses}" name="meses" placeholder="Seleccione la Cantidad" required></td>
                                </tr>
                                <tr>
                                    <td>Interés</td>
                                    <td><input type="number" value="${interes}" step="0.01" name="interes" placeholder="Ej: 0.15 para 15%" required></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><input type="submit" value="Calcular Cuota"></td>              
                                </tr>                                 
                            </tbody>
                        </table>                          
                    </form>
                    
                    <div class="resultado">
                        <strong>RESULTADO:</strong><br><br>
                        ${nombre} debe pagar <strong>$${cuotaFormateada}</strong> cada mes por el préstamo de $${prestamoFormateado} a ${meses} meses con el interés del ${interesFormateado}%
                    </div>
                </div>
            </main>
            <footer> 
                <hr>
                <div class="coloreado">
                    Creado por los estudiantes para el curso de EDyA1 en la Universidad Autónoma de Occidente
                </div>
            </footer>
        </body>
        </html>`;
    return nPage;
}

// Se indican las funciones a exportar
module.exports = { calcularCuota, crearPaginaRespuesta };