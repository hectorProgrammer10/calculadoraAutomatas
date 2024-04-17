let letras = [];
let lineasXD = [];
let numerosTemp = [];
let contadorLeft = 0;
let contadorRight = 0;
let contadorCenter = 0;
let id = 0;
let nodosArbol = [];
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
      arbol();
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
  let arbol = document.getElementById("arbol");
  lexico.innerHTML = "";
  pantalla.innerHTML = "";
  resultado.innerHTML = "";
  arbol.innerHTML = "";
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
  let haySigo = 0;
  // ------------------                 3                   7         9
  // let pruebaCadena = ["5.2", "-", "9", "*", "3", "*", "11"];
  // let pruebaCadena = ["3", "*", "4", "+", "1", "*", "2"];
  let pruebaCadena = letras;
  let cadenaInfo = [];
  let cadenaAux = [];
  let jerarquia = ["*", "/", "+", "-"];
  let posicion = ["center", "right", "left"];
  let info = {
    signo: "",
    posicion: "",
  };
  // Identificar los signos en la cadena y su posición   --- [3, 7, 9]
  for (let i = 0; i < pruebaCadena.length; i++) {
    let elemento = pruebaCadena[i];

    if (
      elemento === "+" ||
      elemento === "-" ||
      elemento === "*" ||
      elemento === "/"
    ) {
      info = {
        signo: elemento,
        posicion: i,
      };
      cadenaInfo.push(info); //mapea los signos
    }
  }

  // Ordenar los signos según su jerarquía   --- [7, 9, 3]
  for (let a = 0; a < jerarquia.length; a++) {
    let signoBuscado = jerarquia[a];
    for (let i = 0; i < cadenaInfo.length; i++) {
      let objeto = cadenaInfo[i];
      if (objeto.signo === signoBuscado) {
        //ordena por jerarquia los signos --0
        let info2 = {
          signo: objeto.signo,
          posicion: objeto.posicion,
        };
        cadenaAux.push(info2);
      }
    }
  }
  //cade aux tiene la posicion por jerarquia. cadenaAux[0].signo/posicion

  let nodo = {
    num1: "",
    operador: "",
    num2: "",
    posicion: "",
  };
  let cadenaAuxLength = cadenaAux.length;
  while (cadenaAux.length > 0) {
    let infoNodo = cadenaAux.pop(); //signo, posicion

    // Determinar la posición del nodo en el árbol

    ///-------------------------

    console.log(pruebaCadena);
    console.log(
      `infoNodo = ${infoNodo.signo} y posicion sig = ${
        pruebaCadena[infoNodo.posicion + 1]
      }, hay signo? = ${haySigo}`
    );
    if (cadenaAux.length == cadenaAuxLength - 1) {
      console.log("primer nodo");
      //primer nodo
      if (cadenaAuxLength > 1) {
        if (infoNodo.posicion > pruebaCadena.length - infoNodo.posicion) {
          nodo = {
            num1: "",
            operador: infoNodo.signo,
            num2: pruebaCadena[infoNodo.posicion + 1],
            posicion: posicion[0],
          };
          haySigo = 1;
        } else {
          nodo = {
            num1: "",
            operador: infoNodo.signo,
            num2: pruebaCadena[infoNodo.posicion - 1],
            posicion: posicion[0],
          };
          haySigo = 1;
        }
      } else {
        nodo = {
          num1: pruebaCadena[infoNodo.posicion - 1],
          operador: infoNodo.signo,
          num2: pruebaCadena[infoNodo.posicion + 1],
          posicion: posicion[0],
        };
      }
    } else {
      console.log("otro nodo");
      if (haySigo == 1) {
        console.log("hay signo");
        if (cadenaAux.length > 0) {
          nodo = {
            num1: "",
            operador: infoNodo.signo,
            num2: pruebaCadena[infoNodo.posicion + 1],
            posicion: posicion[2],
          };
          haySigo = 1;
        } else {
          nodo = {
            num1: pruebaCadena[infoNodo.posicion - 1],
            operador: infoNodo.signo,
            num2: pruebaCadena[infoNodo.posicion + 1],
            posicion: posicion[2],
          };
          haySigo = 0;
        }
      } else {
        console.log("no hay signo");
        nodo = {
          num1: "",
          operador: infoNodo.signo,
          num2: pruebaCadena[infoNodo.posicion + 1],
          posicion: posicion[2],
        };
      }
    }

    imprimirArbol(nodo, nodo.posicion);
  }
}

//impresion de los nodos del arbol-----
function imprimirArbol(nodo, pos) {
  // console.log("nodo:" + nodo);
  // console.log(`nodo posición ${pos}`);
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
