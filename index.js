const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const crudLink = "https://crudcrud.com/api/a828b12d899244428aa86ac574008038/TrackerData"


form.addEventListener('submit', addItem);
// window.localStorage.clear()
//delete item
itemList.addEventListener('click', removeItem);
//filter


// Add item
function addItem(e){
e.preventDefault();
// Get input value
let price = document.getElementById('price').value 
let description = document.getElementById('description').value
let category = document.getElementById('category').value
// Create new li element
let li= document.createElement('li');
// Add class
li.className = 'list-group-item';
// Add text node with input value
let itemstoAppend = document.createTextNode (price + " " + description+ " " + category)


// li.appendChild(document.createTextNode (description))

// for (var i in localStorage) {
//     if (localStorage[i] === `"${description}"`){
//         if(confirm("Email already exists")) return
//         else return
//     }       
// }   
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
    

    
    
 
//AXIOS Addition

    // let existingUsers = JSON.parse(localStorage.getItem("allUsers"))
    // if(existingUsers == null) existingUsers = []
    let Price = document.createTextNode(price)
    let Description = document.createTextNode(description)
    let Category = document.createTextNode(category)
    let users = {
        "Price": Price.textContent,
        "Description": Description.textContent,
        "Category": Category.textContent
    }
    // localStorage.setItem(JSON.stringify(users.Name),JSON.stringify(users.Email) )
    axios
    .post(crudLink, users)
    .then((res) => {
        console.log(res)
        li.id = res.data._id
        console.log(li.id)
        })
    .catch((err) => console.log(err))

    
document.getElementById('price').value = ''
document.getElementById('description').value = ''
document.getElementById('category').value = ''

}

//To show previous user interaction//
window.addEventListener('DOMContentLoaded', ()=>{
    axios
    .get(crudLink)
    .then((res)=>{
        console.log(res)
        for(var i=0; i<res.data.length;i++){
            showNewUseronScreen(res.data[i])
        }
    })
    .catch((err)=> console.log(err))
})

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
function removeItem(e){
    if(e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')){
            var li = e.target.parentElement;
            
            // let key = li.textContent.split(" ")[0]
            // console.log(key)
            // localStorage.removeItem(`"${key}"`)
            // code to delete from database
            axios
            .delete(`${crudLink}/${li.id}`)
            .then((res)=>{
                itemList.removeChild(li)
                for(var i=0; i<res.data.length;i++){
                    showNewUseronScreen(res.data[i])
                }
            })
            .catch((err)=> console.log(err))
        }
    }
}





function editItems(e){
    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        // itemList.removeChild(li);
        
        axios
        .delete(`${crudLink}/${li.id}`)
        .then((res)=>{
            itemList.removeChild(li)
            for(var i=0; i<res.data.length;i++){
                showNewUseronScreen(res.data[i])
            }
        })
        .catch((err)=> console.log(err))

        let n = li.textContent.split(" ")[0]
        let eml = li.textContent.split(" ")[1].split("editX")[0]
        let emt = li.textContent.split(" ")[2].split("editX")[0]
        // let emt = li.textContent.split(" ")[1].split("editX")[1]
        console.log(n)
        console.log(eml)
        console.log(emt)
        document.getElementById('price').value = n
        document.getElementById('description').value = eml
        document.getElementById('category').value = emt
    }
    // if(document.getElementsByClassName('submit').clicked==true){
    //     var li = e.target.parentElement;
        
    // }

}