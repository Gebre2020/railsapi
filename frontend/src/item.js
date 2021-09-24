// Needs to remember all the items
// Responsible for setting the properties of each item
// the html we want to put on the DOM for each item
// Attach event listeners particular to each item

// Needs to remember all the items
// Responsible for setting the properties of each item
class Item {
    static all = [];
    static container = document.getElementById('item-list');
    
    constructor({name, price, description, id, category_id}) {
        this.name = name
        this.price = price
        this.description = description
        this.id = id
        this.categoryId = category_id
        this.element = document.createElement('li')
        this.element.addEventListener('click', this.handleClick)
        // debugger
        Item.all.push(this)
    }

    static filteredByCategory(filteredCategory){
        if(filteredCategory) {
            for(const i of Item.all){
                if(i.categoryId === parseInt(filteredCategory.id)){
                    i.element.style.display =""               
                }else {
                    i.element.style.display = "none"
                }
            }
        }else {
            for(const i of Item.all){
                i.element.style.display = ""
            }
        }
       // debugger
    //    if(filteredCategory){
    //        const filteredItems = Item.all.filter((i) => {
    //            //debugger
    //            return i.categoryId === parseInt(filteredCategory.id)
    //        })
    //        Item.container.innerHTML = "";
    //        for(const item of filteredItems) {
    //            item.renderItem()
    //        }
    //     }else{ 
    //         Item.container.innerHTML = "";
    //         for(const item of Item.all) {
    //             item.renderItem()
    //         }    
    //    }
    }

    // edit item
    // the html we want to put on the DOM for each item
    render() {
        this.element.innerHTML = `
        <div>
        $<span class="price">${this.price}</span>
        <span class="name">${this.name}</span>
        <span class="description">${this.description}</span>
        </div>
        <button class="edit" data-id= "${this.id}" >Edit</button>
        <button class="delete" data-id= "${this.id}" >Delete</button>
        `
        return this.element
    }

    renderItem(){     
        // this.render()
        Item.container.appendChild(this.render())
        // form.reset()
        // li.addEventListener('click', handleClick)
    }

    handleClick = (e) => {
        // debugger
        if(e.target.innerText === "Delete"){
            // debugger
            itemApi.deleteItem(e)
        }else if(e.target.innerText === "Edit"){
            //debugger
            e.target.innerText = 'Save'
            // change the innerText of my button to save
            // have a edit form appear with values filled out
            // change the information on the backend db
            // change the information on the frontend (changing the DOM)
            this.createEditFields(e.target)
        } else if(e.target.innerText === "Save"){
            e.target.innerText = 'Edit'
            this.saveUpdatedItem(e.target)
        }
    }

    createEditFields(){
        const div = this.element.querySelector('div');
        //debugger
        // const price = div.children[0].innerText
        // const name = div.children[1].innerText
        // const description = div.children[2].innerText
        // // debugger
        // div.innerHTML = 
        // `<input type="number" id ="edit-${price}" value="${price}">
        // <input type="text" id ="edit-${name}" value= "${name}">
        // <input type="text" id ="edit-${description}" value="${description}">
        // `
     
        for(const element of div.children){
           // debugger
           let inputValue = element.innerText;
           let name = element.classList[0];
           // debugger
           element.outerHTML = `<input type="text" class="edit-${name}" value="${inputValue}" />`
           // debugger 
       }
    }

    saveUpdatedItem(){
        
        this.price = this.element.querySelector(".edit-price").value;
        this.name = this.element.querySelector(".edit-name").value;
        this.description = this.element.querySelector(".edit-description").value;

        itemApi.updateItem(this)
        //debugger
        // const itemInfo = {
        //    price: priceInput.value,
        //    name: nameInput.value,
        //    description: descriptionInput.value
        // }
       // debugger 
       // e.preventDefault();
     
        // const configObject = {
        //    method: 'PATCH',
        //    headers: {
        //       "Content-Type": "application/json",
        //       Accept: "application/json"
        //    },
        //    body: JSON.stringify(itemInfo)
        // } 
        // fetch(`${baseURL}/${id}`, configObject)
        // .then(r =>r.json())
        // .then(json => {
        //    //debugger
        //    renderLiHTML(li, json.data)
        // })
    }
}
