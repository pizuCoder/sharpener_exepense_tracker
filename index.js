const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const crudLink = "https://crudcrud.com/api/a828b12d899244428aa86ac574008038/TrackerData"


// form.addEventListener('submit', addItem);
// window.localStorage.clear()
//delete item
itemList.addEventListener('click', removeItem);
//filter
form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        // Get input value
        let price = document.getElementById('price').value 
        let description = document.getElementById('description').value
        let category = document.getElementById('category').value
        // Create new li element
        let li = document.createElement('li');
        // Add class
        li.className = 'list-group-item';
        // Add text node with input value
        let itemstoAppend = document.createTextNode (price + " " + description+ " " + category)
        li.appendChild(itemstoAppend)

        var editBtn = document.createElement('button');
        // Add classes to edit button
        editBtn.className = 'btn btn-secondary btn-sm float-right edit';
        // Append text node
        editBtn.appendChild(document.createTextNode('edit'));
        // Append button to li
        li.appendChild(editBtn);

        editBtn.addEventListener('click', editItems)

        var deleteBtn = document.createElement('button');
        // Add classes to del button
        deleteBtn.className = 'btn btn-danger btn-sm float-right mr-3 delete';
        // Append text node
        deleteBtn.appendChild(document.createTextNode('X'));
        // Append button to li
        li.appendChild(deleteBtn);

        itemList.appendChild(li);

        let Price = document.createTextNode(price)
        let Description = document.createTextNode(description)
        let Category = document.createTextNode(category)
        let users = {
            "Price": Price.textContent,
            "Description": Description.textContent,
            "Category": Category.textContent
        }
        const res = await axios.post(crudLink, users);
        li.id = res.data._id;
        console.log(li.id);
    } catch (err) {
        console.log(err);
    } finally {
        document.getElementById('price').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get(crudLink);
        console.log(res);
        for(var i = 0; i < res.data.length; i++) {
            showNewUseronScreen(res.data[i]);
        }
    } catch (err) {
        console.log(err);
    }
});




//function to show on screen//
function showNewUseronScreen(userData){
    let userID = userData._id
    let price = userData.Price
    let description = userData.Description
    let category = userData.Category
    // Create new li element
    let li= document.createElement('li');
    // Add class
    li.className = 'list-group-item';
    li.id = `${userID}`
    // Add text node with input value
    let itemstoAppend = document.createTextNode (price + " " + description+ " " + category)

    
    li.appendChild(itemstoAppend)

        var editBtn = document.createElement('button');
        // Add classes to edit button
        editBtn.className = 'btn btn-secondary btn-sm float-right edit';
        // Append text node
        editBtn.appendChild(document.createTextNode('edit'));
        // Append button to li
        li.appendChild(editBtn);

        editBtn.addEventListener('click', editItems)

        
    
        // Create del button element
        var deleteBtn = document.createElement('button');
        // Add classes to del button
        deleteBtn.className = 'btn btn-danger btn-sm float-right mr-3 delete';
        // Append text node
        deleteBtn.appendChild(document.createTextNode('X'));
        // Append button to li
        li.appendChild(deleteBtn);
        


    itemList.appendChild(li);
}
// Remove item
async function removeItem(e) {
    try {
        if (e.target.classList.contains('delete')) {
            if (confirm('Are You Sure?')) {
                var li = e.target.parentElement;
                await axios.delete(`${crudLink}/${li.id}`);
                itemList.removeChild(li);
                const res = await axios.get(crudLink);
                for(var i = 0; i < res.data.length; i++) {
                    showNewUseronScreen(res.data[i]);
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}






async function editItems(e) {
    try {
        if (e.target.classList.contains('edit')) {
            var li = e.target.parentElement;
            await axios.delete(`${crudLink}/${li.id}`);
            itemList.removeChild(li);
            const res = await axios.get(crudLink);
            for(var i = 0; i < res.data.length; i++) {
                showNewUseronScreen(res.data[i]);
            }

            let n = li.textContent.split(" ")[0]
            let eml = li.textContent.split(" ")[1].split("editX")[0]
            let emt = li.textContent.split(" ")[2].split("editX")[0]

            document.getElementById('price').value = n
            document.getElementById('description').value = eml
            document.getElementById('category').value = emt
        }
    } catch (err) {
        console.log(err);
    }
}

    // if(document.getElementsByClassName('submit').clicked==true){
    //     var li = e.target.parentElement;
        
    // }

