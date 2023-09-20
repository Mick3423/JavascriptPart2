import LocalStorage from "./localStorage.js";
import Dialog from "./dialog.js";

const localStorage = new LocalStorage();


export default class Todo{
    constructor() {
 this.enterButton = document.querySelector('#inputArea button');
 this.input = document.querySelector('#inputArea input');
 this.ul = document.querySelector('ul#toDoList');

 if (localStorage.items.length > 0){
     this.loadFromLocalStorage();
 }

 this.enterButton.addEventListener('click', (e) => this.addListItem(e));
 this.input.addEventListener('keypress', (e) => this.addListItem(e));


    }
    addListItem(e){

        if(this.input.value.length > 0 && (e.key === 'Enter' || e.key === undefined )){
        this.createListItem();
        }


    }
    createListItem(){
    const li = document.createElement('Li')
     li.innerHTML= `${this.input.value} <i class="far fa-trash-alt"></i>`;
    this.ul.appendChild(li)
        this.input.value = ''

        li.addEventListener('click', (e) => this.crossOut(e));
        li.querySelector('i').addEventListener('click', (e) => this.deleteListItem(e));

        localStorage.updateItems(this.ul)

    }

    crossOut(e){

        e.currentTarget.classList.toggle('done');
        localStorage.updateItems(this.ul)
    }

   async deleteListItem(e){
    e.stopPropagation();
    const listItem = e.currentTarget.parentNode;
    const dialog = new Dialog({
        questionText: 'Er du virkelig sikker?',
        trueButtonText: 'jaaa',
        falseButtonText: 'neej',
    })
     const deleteItem = await dialog.confirm()
       if (deleteItem){

           listItem.remove();
           localStorage.updateItems(this.ul)
       }

    }


    loadFromLocalStorage(){
        let listItem ='';
        localStorage.items.forEach(item => listItem += item);
        this.ul.innerHTML = listItem;
        this.ul.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', (e) => this.crossOut(e));
            li.querySelector('i').addEventListener('click', (e) => this.deleteListItem(e));
        })
    }
}

