const exploreBtn = document.querySelector(".explore");
const updateBtn = document.querySelectorAll("#update");
const removeBtn = document.querySelectorAll("#remove");
const findBtn = document.querySelector("#find");
const listWindow = document.querySelector('.list');

Array.from(updateBtn).forEach(btn => btn.addEventListener('click', updateBook));
Array.from(removeBtn).forEach(btn => btn.addEventListener('click', removeBook));
findBtn.addEventListener('click', findBook);

function findBook(){
    const title = document.querySelector('#title').value;
    console.log(title);
    fetch(`/api/${title}`)
        .then(response => response.json()
            .then (data=> { 
                console.log(data[0]);
                document.querySelector('#title').value = data[0].title;
                document.querySelector('#author').value = data[0].author;
                document.querySelector('#date').value = data[0].date;  
                document.querySelector('#pages').value = data[0].pages;  
                document.querySelector('#synopsis').value = data[0].synopsis; 
        }))       
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
    // const book = this.parentNode.parentNode.querySelector('h3').textContent;

    fetch('/books',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: document.querySelector('#title').value,
            author: document.querySelector('#author').value,
            date: document.querySelector('#date').value,  
            pages: document.querySelector('#pages').value,  
            synopsis: document.querySelector('#synopsis').value 
        })
    })
    .then(results => {
        if (results.ok) return results.json();
    })
    .then(data=>{
        window.location.reload();
    })
}
