export default class localStorage{
    constructor() {
        this.items = JSON.parse(window.localStorage.getItem('todo'));
        if (this.items === null){
            this.items = [];
        }
    }

    updateItems(ul){
       this.items = [];
    ul.querySelectorAll('li').forEach((li) => {
        console.log(li)
        this.items.push(li.outerHTML);
    })
        this.saveItems();
    }
    saveItems(){
        window.localStorage.setItem('todo', JSON.stringify(this.items))
    }
}