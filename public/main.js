const exploreBtn = document.querySelector(".explore");
const updateBtn = document.querySelectorAll("#edit");
const removeBtn = document.querySelectorAll("#remove");
const findBtn = document.querySelector("#find");
const listWindow = document.querySelector('.list');

Array.from(updateBtn).forEach(btn => btn.addEventListener('click', updateBook));
Array.from(removeBtn).forEach(btn => btn.addEventListener('click', removeBook));
findBtn.addEventListener('click', findBook);

function findBook(){
    console.log("Find Button has been clicked!");
    const title = document.querySelector('#title');
    fetch(`/api/${title}`)
        .then(response => {
            console.log("Hi");
            console.log(response.json());
        })
        .then(data => console.log(data))
        .catch(error => console.error(error))
}

function removeBook(){
    console.log("Remove Button has been clicked!");
    const book = this.parentNode.parentNode.querySelector('h3').textContent;
    fetch('/books',{
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: book
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
    console.log("Update Button has been clicked!");
    const book = this.parentNode.parentNode.querySelector('h3').textContent;

    fetch('/books',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: book
        })
    })
    .then(results => {
        if (results.ok) return results.json();
    })
    .then(data=>{
        window.location.reload();
    })
}
