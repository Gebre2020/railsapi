// handling fetch requests for my items
class ItemApi {
    constructor(port) {
        this.baseURL = `${port}/items`
    }

    getItems(){
        fetch(this.baseURL)
        .then(r => r.json())
        .then(data => {
            data["data"].forEach((item) => {
              const i = new Item({id: item.id, ...item.attributes})
              i.renderItem()       
            })
        })
    }

    createItems(){
        const itemInfo = {
            price: priceInput.value,
            name: nameInput.value,
            description: descriptionInput.value,
            category_id: dropdown.value
        } 
      
        const configObject = {
            method: 'POST',
            headers: {
               "Content-Type": "application/json",  //sending json information
               Accept: "application/json"   //expect to get back json information
            },
            body: JSON.stringify(itemInfo)   //sending post request
        } 
        fetch(this.baseURL,configObject)
        .then(r =>r.json())
        .then(json => {
            // debugger
            const i = new Item({id: json.data.id, ...json.data.attributes})
            i.renderItem()        
        })
    }

    updateItem(item){
        const {price, name, description, id} =item
        // debugger
        const itemInfo = {price, name, description}
        const configObject = {
            method: 'PATCH',
            headers: {
               "Content-Type": "application/json",
               Accept: "application/json"
            },
            body: JSON.stringify(itemInfo)
         } 
         fetch(`${baseURL}/${id}`, configObject)
         .then(r =>r.json())
         .then(json => {
            //debugger
            item.render()
         })
    }

    deleteItem(e){
        // delete from frontend
        const id = e.target.dataset.id
        e.target.parentElement.remove()
        const configObject = {
           method: 'DELETE'
        } 
        //debugger
        // backend delete
        fetch(baseURL + `/${id}`, configObject)
        .then(r => r.json())
        .then(json => alert(json.message))
    }
}