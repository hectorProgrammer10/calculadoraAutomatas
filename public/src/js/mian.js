function main() {
  let div = document.getElementById("resultado");
  let div2 = document.getElementById("arbol");
  let texto = `fewfwefefewfwefasfsfasfafsfsfsfsfffffffffffffffffffffffsasf`;
  for (let i = 0; i <= 100; i++) {
    div2.innerHTML += `${texto}+${texto}</br>`;
  }
}

main();
let letras = [];
let lineasXD = [];
let numeros = "";
const botones = document.querySelectorAll("button");
let contador = -1;
botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    let pantalla = document.getElementById("pantalla");
    const contenidoBoton = boton.textContent;
    if (contenidoBoton == "CE") {
      borrarTodo(pantalla);
    } else if (contenidoBoton == "←") {
      let lexico = document.getElementById("resultado");
      lexico.innerHTML = "";
      letras.pop();
      lineasXD.pop();
      contador -= 1;
      imprimir(pantalla);
      imprimirLexico();
    } else if (contenidoBoton == "=") {
      resultado(pantalla);
    } else if (contenidoBoton == "(" || contenidoBoton == ")") {
      letras.push(contenidoBoton);
      contador += 1;
      imprimir(pantalla);
      lexico("PARZQ", contenidoBoton);
    } else if (
      contenidoBoton == "+" ||
      contenidoBoton == "-" ||
      contenidoBoton == "*" ||
      contenidoBoton == "/"
    ) {
      contador += 1;
      switch (contenidoBoton) {
        case "+":
          lexico("SUM", contenidoBoton);
          break;
        case "-":
          lexico("REST", contenidoBoton);
          break;
        case "*":
          lexico("MULT", contenidoBoton);
          break;
        case "/":
          lexico("DIV", contenidoBoton);
          break;
      }

      letras.push(contenidoBoton);
      imprimir(pantalla);
      // } else if (contenidoBoton == ".") {
      //   // Inicializamos una cadena para almacenar los números
      //   letras.push(contenidoBoton);
      //   imprimir(pantalla);
      //   letras.pop();
      //   // Recorremos los elementos de 'letras' hasta encontrar un operador o paréntesis
      //   while (letras.length > 0) {
      //     let elemento = letras.pop();

      //     // Verificamos si el elemento es un número o un punto decimal
      //     if (!isNaN(elemento) || elemento === ".") {
      //       // Si es un número o un punto decimal, lo agregamos a 'numeros'
      //       numeros = elemento + numeros;
      //       lineasXD.pop();
      //       contador -= 1;
      //       imprimirLexico();
      //     } else {
      //       // Si se encuentra un operador o paréntesis, detenemos el bucle
      //       letras.push(elemento); // Restauramos el operador o paréntesis a 'letras'

      //       break;
      //     }
      //   }

      //   // Ahora 'numeros' contiene los números antes del punto

      //   console.log("Números antes del punto:", numeros);
    } else {
      if (!isNaN(contenidoBoton || ".")) {
        contador += 1;
        letras.push(contenidoBoton);
        //lexico("INT", contenidoBoton);
        imprimir(pantalla);
      }
    }
  });
});

function borrarTodo(pantalla) {
  let resultado = document.getElementById("resultadoOp");
  let lexico = document.getElementById("resultado");
  lexico.innerHTML = "";
  pantalla.innerHTML = "";
  resultado.innerHTML = "";
  letras = [];
  lineasXD = [];
  contador = -1;
}
function imprimir(pantalla) {
  let cadenaLetras = "";
  letras.forEach((letra) => {
    cadenaLetras += letra;
  });
  pantalla.innerHTML = cadenaLetras;
}
function lexico(tipo, valor) {
  let contenido = `<span class="lineaTxt">Linea: <span class="resaltado">1</span> &nbsp;&nbsp;Tipo: 
    <span class="resaltado">${tipo}</span> &nbsp;&nbsp;Valor: 
    <span class="resaltado">${valor}</span> &nbsp;&nbsp;posición: 
    <span class="resaltado">${contador}</span><span></br>`;
  lineasXD.push(contenido);
  imprimirLexico();
}
function imprimirLexico() {
  let lexico = document.getElementById("resultado");
  let cadenaTxt = "";
  lineasXD.forEach((linea) => {
    cadenaTxt += linea;
  });
  lexico.innerHTML = cadenaTxt;
}

function resultado(operacion) {
  let imprimir = document.getElementById("resultadoOp");
  let expresion = operacion.textContent.trim();
  let resultado = eval(expresion);
  imprimir.innerHTML = `&nbsp;${resultado}`;
}
