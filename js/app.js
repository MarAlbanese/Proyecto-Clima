
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

// Seleccionas el formulario y lo almacenas en variable.
// Creas el evento de llamado para cuando figure la pagina.
// Con la variable creada se llama al evento submit y a la funcion Buscar Clima.


function buscarClima(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    console.log(ciudad);
    console.log(pais);

    // Validacion
    if(ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios')

        return;
    }
    consultarAPI(ciudad, pais );
}
// buscarClima crea dos variables y almacena lo que se ponga en el label.
// La funcion valida que los campos no esten vacios y en su caso llama a la funcion MostrarError.
// Si no da error, llama a la funcion mostrarApi.


function mostrarError(mensaje) {
  
  const alerta = document.querySelector('.bg-red-100');
  if(!alerta) {
      const alerta = document.createElement('div');

      alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center" );

      alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;
      container.appendChild(alerta);
      
      setTimeout(()=>{
        alerta.remove();
      }, 2000);


  }
}
// mostrarError crea una varibale almacenando una clase seleccionada.
// Si la clase no esta crea una variable creando un div. 
// Al div se le agrega una clase.
// El div y con la clase se agrega al HTML.
// El div y la clase se agregan abajo de la pagina.
// Por ultmo se borra el mensaje de error a los tres segundos.


function consultarAPI(ciudad, pais ) {
        // Consultar la API e imprimir el Resultado...

    // leer la url  y agregar el API key
    const appId = '31b33df22fe2b492d9b74843003438fe';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();

    // query con fetch api
    fetch(url)
      .then(respuesta => { 
        return respuesta.json();
      })
      .then(datos => {
        console.log(datos);
        limpiarHTML();
        if(datos.cod === "404") {
          mostrarError('Ciudad No Encontrada')
        } else {
          mostrarClima(datos)
        }
      })
      .catch(error => {
        console.log(error)
      });
}

// En una variable se almacena Id de la appi
// En una variable se almacena la url de la appi y se agrega pais, ciudad y Idappi 
// La informacion de la url solo se puede ver si hay Idappi
// Llamo a la funcion Spiner
// Con Fech veo el contenido de la url
// Con .them le pido la respuesta en un json
// con .them le pido ver los datos y un condicional 
// El condicional lleva a mostrarError o buscarCLima
// Por ultimo un catch por si la url esta mal



function mostrarClima(datos) {

  // Formatear el Clima...

  const { name, main: { temp, temp_max, temp_min } } = datos;

  // Extrae los datos del objeto de la url y los almacena en una variable

  const grados = KelvinACentigrados(temp);
  const min = KelvinACentigrados(temp_max);
  const max = KelvinACentigrados(temp_min);

  // En tres variables almacena funciones que dan las temperaturas

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Clima en: ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')

  // Crea un parrafo, lo agrega al html y le da una clase

  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl')

  //Crea un parrafo, lo agrega al html y le da una clase

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add('text-xl')

  //Crea un parrafo, lo agrega al html y le da una clase
  
  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add('text-xl')

  // Crea un parrafo, lo agrega al html y le da una clase
  
  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white')
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  // Crea un div, le da una clase y le agrega los cuatro parrafos
  
  resultado.appendChild(resultadoDiv)

  // Agrega el div en el espacio de resultado
}

function KelvinACentigrados(grados) {
  return parseInt( grados - 273.15);

  // Cualquier parametro que pase, si le resto 273.15 dara lo mismo
}

function limpiarHTML() {
  while(resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
  }
// Con esa funcion limpio el resultado de buscar busqueda

}

function Spinner() {

  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}