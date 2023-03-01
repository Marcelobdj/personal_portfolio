'use strict'

const diceType = document.getElementsByName('diceRadio')
const diceQntdInput = document.querySelector('#diceQntd')
const rollButtonInput = document.querySelector('#rollButton');
const diceResultsDiv = document.querySelector('#diceContainer');
const clearButton = document.querySelector('#clearButton')

function isNumberValid(n){

    if (Number(diceQntdInput.value) >= 1) {
        return n = true;
    } else {
        return n = false;
    }
};

function addResult(diceResult){
    let divResult = document.createElement('div');
    diceResultsDiv.appendChild(divResult);
    let diceRollResult = document.createElement('h1');
    diceRollResult.innerHTML = diceResult;
    divResult.appendChild(diceRollResult);
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

rollButtonInput.addEventListener('click', function(){

    let maxNum;

    if (isNumberValid(diceQntdInput.value) === true){

        if (diceType[0].checked){ //d4
            maxNum = 4;        
        } else if (diceType[1].checked) {//d6
            maxNum = 6;
        } else if (diceType[2].checked) {//d8
            maxNum = 8;
        } else if (diceType[3].checked) {//d10
            maxNum = 10;
        } else if (diceType[4].checked) {//d12
            maxNum = 12;
        } else {//d20
            maxNum = 20;
        }
    } else {
        window.alert('Atenção, o número de dados rolados deve ser maior que 0.');
    }

    for (let i = 1; i <= diceQntdInput.value; i++){
        addResult(getRandomInt(1, maxNum))
    }
});

clearButton.addEventListener('click', function(){
    diceResultsDiv.innerHTML = ''
});

