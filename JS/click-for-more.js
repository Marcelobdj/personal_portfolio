const clickForMore = document.querySelector('#clickForMore');
const newInfoArticle = document.querySelector('#newInfoArticle');

clickForMore.addEventListener('click', function(){
    newInfoArticle.classList.toggle('hidden');

    if(newInfoArticle.className == 'hidden'){
        clickForMore.textContent = 'Clique para expandir';
    } else{
        clickForMore.textContent = 'Clique para esconder'
    }
});
