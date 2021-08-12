'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let numeroNovo = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        numeroNovo = true;

       if(operador == '+'){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if(operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if(operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if(operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => {
    if(numeroNovo){
        display.textContent = texto.toLocaleString('BR');
        numeroNovo = false;
    }else{
        display.textContent += texto.toLocaleString('BR');
    }
}


const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if(!numeroNovo){
        calcular();
        numeroNovo = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.')); 
    }
    
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const apagar = () => display.textContent = '';

document.getElementById('limparDisplay').addEventListener('click', apagar);

const apagarConta = () => {
    numeroNovo = true;
    numeroAnterior = undefined;
    operador = undefined;
    apagar();
}

document.getElementById('limparResultado').addEventListener('click', apagarConta);

const apagarUltimoDireita = () => display.textContent = display.textContent.slice(0,-1);

document.getElementById('backspace').addEventListener('click', apagarUltimoDireita);

const inverter = () => {
    numeroNovo = true;
    atualizarDisplay(display.textContent * -1);
}

document.getElementById('inverte').addEventListener('click', inverter);

const existeDecimal = () => display.textContent.indexOf(',') != -1;

const existeValor = () => display.textContent.length > 0;

const criarDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}

document.getElementById('decimal').addEventListener('click', criarDecimal);


const mapaTeclado = {

    '0': 'teclaZero',
    '1': 'teclaUm',
    '2': 'teclaDois',
    '3': 'teclaTres',
    '4': 'teclaQuatro',
    '5': 'teclaCinco',
    '6': 'teclaSeis',
    '7': 'teclaSete',
    '8': 'teclaOito',
    '9': 'teclaNove',
    '/': 'operadorDivisao',
    '*': 'operadorVezes',
    '+': 'operadorSoma',
    '-': 'operadorSubtracao',
    '=': 'igual',
    'Enter': 'igual',
    'Backspace': 'backspace',
    ',':'decimal',
    'Esc': 'limparDisplay',
    'c':'limparResultado'
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;

    if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
    
    
}

document.addEventListener('keydown', mapearTeclado);