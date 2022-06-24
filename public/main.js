const exploreBtn = document.querySelector(".explore");
const closeBtn = document.querySelector(".close");
const updateBtn = document.querySelectorAll("#edit");
const removeBtn = document.querySelectorAll("#remove");
const listWindow = document.querySelector('.list');
// exploreBtn.addEventListener('click', listAllBooks);
// closeBtn.addEventListener('click', closeList);
Array.from(updateBtn).forEach(btn => btn.addEventListener('click', updateBook));
Array.from(removeBtn).forEach(btn => btn.addEventListener('click', removeBook));
console.log('We\'re in');
// function listAllBooks(){
//     listWindow.style.display = 'block';
// }

// function listAllBooks(){
//     console.log("Explore Button has been clicked!");
//     fetch('/books',{
//         method: 'get'
//         // headers: {'Content-Type': 'application/json'}
//     })
//     .then(results => {
//         conosle.log(results.json());
//     })
// }

function removeBook(){
    console.log("Remove Button has been clicked!");
    fetch('/books',{
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title:'Hola'
        })
    })
    .then(results => {
        if (results.ok) return results.json();
    })
    .then(data=>{
        window.location.reload();
    })
}

function updateBook(){
    console.log("Edit Button has been clicked!");
    fetch('/books',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title:'Hola',
            author:'Me',
            date:'today',
            pages:'1',
            synopsis: 'testing'
        })
    })
    .then(results => {
        if (results.ok) return results.json();
    })
    .then(response => window.location.reload(true))
}

// function closeList(){
//     listWindow.style.display = 'none';
// }