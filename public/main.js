const exploreBtn = document.querySelector(".explore");
const updateBtn = document.querySelectorAll("#update");
const removeBtn = document.querySelectorAll("#remove");
const listWindow = document.querySelector('.list');

Array.from(updateBtn).forEach(btn => btn.addEventListener('click', updateBook));
Array.from(removeBtn).forEach(btn => btn.addEventListener('click', removeBook));

if (window.location.pathname === '/frontDesk.html'){
    window.onload = function afterPageLoad(){
        if (sessionStorage.getItem('title'))
            findBook();
    }
    const findBtn = document.querySelector("#find");
    findBtn.addEventListener('click', findBook);
}
if (window.location.pathname === '/explore.ejs'){
    const editBtn = document.querySelectorAll("#edit");
    Array.from(editBtn).forEach(btn => btn.addEventListener('click', editBook));
}

function findBook(){
    const title = document.querySelector('#title').value || sessionStorage.getItem('title');
    
    fetch(`/api/${title}`)
        .then(response => response.json()
            .then (data=> { 
                document.querySelector('#title').value = data[0].title;
                document.querySelector('#author').value = data[0].author;
                document.querySelector('#date').value = data[0].date;  
                document.querySelector('#pages').value = data[0].pages;  
                document.querySelector('#synopsis').value = data[0].synopsis; 
        }))       
        .catch(error => console.error(error))
}

function removeBook(){
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
function editBook(){

    sessionStorage.setItem('title', this.parentNode.parentNode.querySelector('h3').textContent);
    const title = sessionStorage.getItem('title');
    location.pathname = '/frontDesk.html';

    fetch(`/api/${title}`)
        .then(response => response.json()
            .then (data=> { 
                document.querySelector('#title').value = data[0].title;
                document.querySelector('#author').value = data[0].author;
                document.querySelector('#date').value = data[0].date;  
                document.querySelector('#pages').value = data[0].pages;  
                document.querySelector('#synopsis').value = data[0].synopsis; 
        }))       
        .catch(error => console.error(error))
}
function updateBook(){

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
        sessionStorage.removeItem('title');
        window.location.reload();
    })
}
