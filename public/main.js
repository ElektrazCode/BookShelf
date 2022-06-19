const exploreBtn = document.querySelector(".explore");
exploreBtn.addEventListener('click', listAllBooks);
console.log("I'm here!");
function listAllBooks(){
    console.log("Explore Button has been clicked!");
    fetch('/books',{
        method: 'get'
        // headers: {'Content-Type': 'application/json'}
    })
    .then(results => {
        conosle.log(results.json());
    })
}