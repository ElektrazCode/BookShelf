const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8000;
const books = {
    'murder on the nile': {
        'title': 'Murder on the Nile',
        'author': 'Agatha Christie',
        'pages': '288',
        'synopsis': 'A young girl keeps escaping death at several occaions while on a Nile cruise in Egypt. Who is trying to kill her? and why?'
    },
    'crime of the orient express': {
        'title': 'Crime of the Orient Express',
        'author': 'Agatha Christie',
        'pages': '218',
        'synopsis': 'A young girl keeps escaping death at several occaions while on a Nile cruise in Egypt. Who is trying to kill her? and why?'
    }
}


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html');
})

app.get('/api', (request, response) => {
    response.json(books);
})

app.get('/api/:booksName', (request, response) =>{
    const bookName = request.params.booksName.toLowerCase();
    console.log(bookName);
    if(books[bookName]){
        response.json(books[bookName]);
    }
    else
        response.json({'error':'Book Missing!'});
})
app.listen(PORT, ()=> console.log(`Server is running on ${PORT}! You better go catch it!`));