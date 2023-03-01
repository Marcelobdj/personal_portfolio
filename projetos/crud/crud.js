'use strict'

// --------------------functions----------------------
const formReset = () =>{
    const form = document.querySelector('form');
    form.reset();
}

const isValid = () => {
    return document.querySelector('#form').reportValidity()
}

// load database
const getLocalStorage = () => JSON.parse(localStorage.getItem('dbCostumer')) ?? [];

// save database
const setLocalStorage = (database) => localStorage.setItem('dbCostumer', JSON.stringify(database));

const clearTable = () =>{
    const tableInfo = document.querySelectorAll('#table>tbody tr');
    tableInfo.forEach(tableInfo => tableInfo.parentNode.removeChild(tableInfo))
}

const updateTable = () => {
    const dbCostumer = getLocalStorage();
    clearTable();
    dbCostumer.forEach(createDatabaseRow) // the for-each return an element and an index (witch is aplyed at 'createDatabaseRow' function
}

const createDatabaseRow = (costumer, index) =>{
    const displayRow = document.createElement('tr');
    displayRow.innerHTML = `
        <td>${costumer.name}</td>
        <td>${costumer.email}</td>
        <td>${costumer.phone}</td>
        <td>${costumer.city}</td>
        <td>
            <button type="button" class="btn btn-warning" id='editBtn-${index}'>Editar</button>
            <button type="button" class="btn btn-danger" id='deleteBtn-${index}'>Excluir</button>
        </td>
    `
    document.querySelector('#table>tbody').appendChild(displayRow);
}

const saveCostumer = (costumer) => {
    const dbCostumer = getLocalStorage();
    dbCostumer.push(costumer);
    setLocalStorage(dbCostumer);
};

// save the edited costumer
const updateConstumerInDatabase = (index, costumer) =>{
    const dbCostumer = getLocalStorage();
    dbCostumer[index] = costumer;
    setLocalStorage(dbCostumer);
}

const displayEditingCostumer = (costumer) =>{
    document.querySelector('#nameInput').value = costumer.name
    document.querySelector('#emailInput').value = costumer.email
    document.querySelector('#phoneInput').value = costumer.phone
    document.querySelector('#cityInput').value = costumer.city
    document.querySelector('#nameInput').dataset.index = costumer.index
}

const editCostumer = (index) =>{
    const costumer = getLocalStorage()[index];
    costumer.index = index;
    newCosWindow.classList.remove('hidden');
    addBtn.classList.add('hidden');
    displayEditingCostumer(costumer);
}

const deleteCostumer = (index) =>{
    const dbCostumer = getLocalStorage();
    dbCostumer.splice(index, 1);
    setLocalStorage(dbCostumer);
}

// identify witch dinamicaly created button is pressed: edit or delete
const identifyButton = (event) =>{
    if (event.target.type == 'button'){
        const [action, index] = event.target.id.split('-') // separates de index from the id at the dinamicaly created button in a array
        if (action == 'editBtn'){
            editCostumer(index);
        } else {
            const costumer = getLocalStorage()[index];
            const confirmAlert = confirm (`Deseja realmente excluir o cliente ${costumer.name}`)
            if (confirmAlert){
                console.log(action);
                deleteCostumer(index);
                updateTable();
            }
        }
    }
}


// --------------------interactions----------------------
updateTable()

const addBtn = document.querySelector('#addBtn');
const newCosWindow = document.querySelector('#newCosWindow')
addBtn.addEventListener('click', function(){
    newCosWindow.classList.remove('hidden');
    addBtn.classList.add('hidden');
});

const cancelBtn = document.querySelector('#cancelBtn');
cancelBtn.addEventListener('click', function(){
    formReset();
    newCosWindow.classList.add('hidden');
    addBtn.classList.remove('hidden');
});

const saveBtn = document.querySelector('#saveBtn');
saveBtn.addEventListener('click', function(){

    if(isValid()){
        const costumer = {
            name: document.querySelector('#nameInput').value,
            email: document.querySelector('#emailInput').value,
            phone: document.querySelector('#phoneInput').value,
            city: document.querySelector('#cityInput').value
        };
        const index = document.querySelector('#nameInput').dataset.index
        if (index == 'new'){
            saveCostumer(costumer);
            formReset();
            newCosWindow.classList.add('hidden');
            addBtn.classList.remove('hidden');
            updateTable();
            window.alert('Cliente cadastrado com sucesso!');
        } else{
            updateConstumerInDatabase(index, costumer);
            updateTable();
            newCosWindow.classList.add('hidden');
            addBtn.classList.remove('hidden');
            window.alert('Cliente editado com sucesso!');
        }
    } else{
        formReset();
        newCosWindow.classList.add('hidden');
        addBtn.classList.remove('hidden');
        updateTable();
        window.alert('Erro: Verifique se todos os campos foram preenchidos')
    }
});

const editOrDelete = document.querySelector('#table>tbody');
editOrDelete.addEventListener('click', identifyButton);