let letras = [];
let lineasXD = [];
let numerosTemp = [];
let contadorLeft = 0;
let contadorRight = 0;
let contadorCenter = 0;
let id = 0;
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
arbol();

function arbol() {
  let nodo1 = {
    num1: "(5.2)",
    operador: "-",
    num2: "*",
  };
  let nodo2 = {
    num1: "*",
    operador: "",
    num2: "11",
  };
  let nodo3 = {
    num1: "3",
    operador: "",
    num2: "9",
  };

  imprimirArbol(nodo1, "center");
  imprimirArbol(nodo2, "right");
  imprimirArbol(nodo3, "left");
  imprimirArbol(nodo2, "right");
  imprimirArbol(nodo2, "left");
  imprimirArbol(nodo2, "right");
  imprimirArbol(nodo3, "left");
  imprimirArbol(nodo3, "right");
}
function imprimirArbol(nodo, place) {
  imprimirNodo(nodo, place);
}

function imprimirNodo(nodo, pos) {
  console.log(`nodo posición ${pos}`);
  let arbolDiv = document.getElementById("arbol");
  let nuevoEstilo = document.createElement("style");
  let css;
  let margin = "0rem";
  //nodo center
  if (pos == "center") {
    arbolDiv.innerHTML = `<div class="nodo${pos}">${espacios(9)}${
      nodo.operador
    }</br>${espacios(3)}/${espacios(10)}\\<br>${espacios(0)}${
      nodo.num1
    }${espacios(8)}${nodo.num2}</div>`;
  }
  //nodo right
  if (pos == "right") {
    id += 1;
    contadorRight += 1;
    let aux = 3;
    if (contadorLeft >= 1) {
      contadorLeft -= 1;
      margin = `${aux * contadorRight - 3}rem`;
    } else {
      margin = `${aux * contadorRight}rem`;
    }
    console.log("hay mas de un nodo right");

    console.log(`${contadorRight}, contador r, margin: ${margin}`);
    arbolDiv.innerHTML += `<div id="nodoRight${contadorRight}${id}">${espacios(
      9
    )}${nodo.operador}</br>${espacios(3)}/${espacios(10)}\\<br>${espacios(0)}${
      nodo.num1
    }${espacios(12)}${nodo.num2}</div>`;
    css = `#nodoRight${contadorRight}${id} {margin-left: ${margin}}`;
    nuevoEstilo.appendChild(document.createTextNode(css));
    arbolDiv.appendChild(nuevoEstilo);
  }
  //nodo left
  if (pos == "left") {
    id += 1;
    contadorLeft += 1;
    let aux = 3;
    if (contadorRight >= 1) {
      contadorRight -= 1;
      aux = aux * contadorRight - 3;
      margin = `${aux}rem`;
      console.log(
        `el cR es mayor a 1:${contadorRight}, marg: ${margin} y cL: ${contadorLeft}`
      );
    } else {
      aux = aux * contadorLeft * -1;
      margin = `${aux}rem`;
      console.log(`primer nodo left, marg:${margin}`);
    }
    arbolDiv.innerHTML += `<div id="nodoLeft${contadorLeft}${id}">${espacios(
      9
    )}${nodo.operador}</br>${espacios(3)}/${espacios(10)}\\<br>${espacios(0)}${
      nodo.num1
    }${espacios(12)}${nodo.num2}</div>`;
    css = `#nodoLeft${contadorLeft}${id} {margin-left: ${margin}}`;
    nuevoEstilo.appendChild(document.createTextNode(css));
    arbolDiv.appendChild(nuevoEstilo);
  }
}

function espacios(cantidad) {
  let espacios = "";
  for (let i = 0; i <= cantidad; i++) {
    espacios += "&nbsp;";
  }
  return espacios;
}
