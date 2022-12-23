
const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
document.addEventListener("DOMContentLoaded", function () {
    // console.log("vscode");
    localStorage.getItem();
  });

const date = new Date()
// const submitBtn = document.getElementById('Submit')
// Form submit event
form.addEventListener('submit', addItem);
// window.localStorage.clear()
//delete item
itemList.addEventListener('click', removeItem);
//filter


// Add item
function addItem(e){
e.preventDefault();
// Get input value
// let count=0
let newItem = document.getElementById('item').value 
let description = document.getElementById('description').value
let category = document.getElementById('category').value
// Create new li element
let li= document.createElement('li');
// Add class
li.className = 'list-group-item';
// Add text node with input value
let itemstoAppend = document.createTextNode (newItem + " " + description +" " + category)


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
    

    
    
 
//localStorage Addition

    // let existingUsers = JSON.parse(localStorage.getItem("allUsers"))
    // if(existingUsers == null) existingUsers = []
    let userExpense = document.createTextNode(newItem)
    let userDesc = document.createTextNode(description)
    let userCategory = document.createTextNode(category)
    let key= function generateUniqueNumber() {
        var timestamp = Date.now();
        var randomNumber = Math.random();
        return timestamp + randomNumber;
      }
    // let count=0
    
        let users = {
           
            "ExpenseAmount": userExpense.textContent,
            "Description": userDesc.textContent,
            "Category": userCategory.textContent
        }
        localStorage.setItem(key(), JSON.stringify(`Rs.${users.ExpenseAmount} for ${users.Description}  category: ${users.Category}`) )
    
    
    // 
    
    
    
    

document.getElementById('item').value = ''
document.getElementById('description').value = ''
document.getElementById('category').value = ''

}

// Remove item
function removeItem(e){
    if(e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);
            let key = li.textContent.split(" ")[0]
            console.log(key)
            localStorage.removeItem(`"${key}"`)
        }
    }
}



function editItems(e){
    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;
        itemList.removeChild(li);
        // console.log(li.textContent)
        let n = li.textContent.split(" ")[0]
        let eml = li.textContent.split(" ")[1]
        let cat = li.textContent.split(" ")[2].split("editX")[0]
        document.getElementById('item').value = n
        document.getElementById('description').value = eml
        document.getElementById('category').value = cat

    }

}


