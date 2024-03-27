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
let numerosTemp = [];
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
    } else {
      if (!isNaN(contenidoBoton) || contenidoBoton == ".") {
        let aux = letras.pop();
        let tipo = "INT";
        if (tienePunto(aux) || contenidoBoton == ".") {
          tipo = "FLOAT";
        } else {
          tipo = "INT";
        }
        if (!isNaN(aux)) {
          aux = aux + contenidoBoton;
          letras.push(aux);
          lineasXD.pop();
          lexico(tipo, aux);
          imprimir(pantalla);
        } else {
          if (aux == null) {
            //primer numero
            contador += 1;
            letras.push(contenidoBoton);
            lexico(tipo, contenidoBoton);
            imprimir(pantalla);
          } else {
            contador += 1;
            letras.push(aux);
            letras.push(contenidoBoton);
            lexico(tipo, contenidoBoton);
            imprimir(pantalla);
          }
        }
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

function tienePunto(cadena) {
  return /\./.test(cadena); // Utilizamos una expresión regular para buscar un punto decimal en la cadena
}
