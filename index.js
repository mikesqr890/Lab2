/*
*  Archivo index.js
*  Creado para: Calculadora de Cuota Mensual
*  Curso: EDyA1 - Universidad Autónoma de Occidente
*
*  Descripción: 
*  Servidor web con NodeJS y Express para calcular cuotas mensuales de préstamos
*/

// Importa funciones desde utils.js
const misFunciones = require('./scripts/utils')

// Importa express
const express = require('express')

// Crea aplicación usando express y puerto
const app = express()
const port = 3000

// Middleware para parsear datos URL-encoded del formulario
app.use(express.urlencoded({extended: true}))

// Archivos públicos accesibles (carpeta public/)
app.use(express.static('public'))

// RUTAS DEL SERVIDOR

// GET / - Página de bienvenida
app.get('/', (req, res) => {
  console.log('GET / - Página de bienvenida');
  res.sendFile(__dirname + "/public/welcome.html");
})

// GET /calcular - Muestra el formulario de la calculadora
app.get('/calcular', (req, res) => {
  console.log('GET /calcular - Formulario de calculadora');
  res.sendFile(__dirname + "/static/calculadora.html");
})

// GET /about - Página "Acerca de"
app.get('/about', (req, res) => {
    console.log('GET /about - Página acerca de');
    res.sendFile(__dirname + "/static/about.html");
})

// POST /calcular - Procesa el cálculo de la cuota
app.post('/calcular', (req, res) => {
  console.log('POST /calcular - Calculando cuota');

  // Extrae datos del formulario
  const datos = req.body;
  console.log('Datos recibidos:', datos);

  // Obtiene los valores
  const nombre = datos.nombre;
  const prestamo = parseFloat(datos.prestamo);
  const meses = parseInt(datos.meses);
  const interes = parseFloat(datos.interes);

  // Validaciones básicas
  if (!nombre || !prestamo || !meses || interes === undefined) {
    res.send(`
      <html>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1 style="color: red;">❌ Error</h1>
          <p>Por favor complete todos los campos correctamente.</p>
          <a href="/calcular" style="color: darkgreen;">← Volver al formulario</a>
        </body>
      </html>
    `);
    return;
  }

  if (prestamo <= 0 || meses <= 0 || interes < 0) {
    res.send(`
      <html>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1 style="color: red;">❌ Error</h1>
          <p>Los valores del préstamo, meses e interés deben ser positivos.</p>
          <a href="/calcular" style="color: darkgreen;">← Volver al formulario</a>
        </body>
      </html>
    `);
    return;
  }

  // Calcula la cuota usando la función en utils.js
  const cuota = misFunciones.calcularCuota(prestamo, meses, interes);
  
  console.log(`Cuota calculada: $${cuota.toFixed(2)}`);

  // Genera la página HTML con el resultado
  const paginaRespuesta = misFunciones.crearPaginaRespuesta(nombre, prestamo, meses, interes, cuota);
  
  // Envía la respuesta al cliente
  res.send(paginaRespuesta);  
})

// Inicia el servidor
app.listen(port, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor de Calculadora de Cuota Mensual');
  console.log('='.repeat(50));
  console.log(`📍 Ejecutándose en: http://localhost:${port}`);
  console.log(`📊 Calculadora: http://localhost:${port}/calcular`);
  console.log(`ℹ️  Acerca de: http://localhost:${port}/about`);
  console.log('='.repeat(50));
})