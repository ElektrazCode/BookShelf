const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionStr = 'mongodb+srv://moi:tusaisquoi@cluster0.zgxesci.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8000;


const books = {
    'murder on the nile': {
        'title': 'Murder on the Nile',
        'author': 'Agatha Christie',
        'date': '1937',
        'pages': '288',
        'synopsis': 'A young girl keeps escaping death at several occaions while on a Nile cruise in Egypt. Who is trying to kill her? and why?'
    },
    'crime of the orient express': {
        'title': 'Crime of the Orient Express',
        'author': 'Agatha Christie',
        'date': '1934',
        'pages': '218',
        'synopsis': 'A young girl keeps escaping death at several occaions while on a Nile cruise in Egypt. Who is trying to kill her? and why?'
    }
}

MongoClient.connect(connectionStr)
    .then(client => {
        const db = client.db('bookshelf-books');
        const booksCollection = db.collection('books');

        app.set('view engine', 'ejs');
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.listen(PORT, ()=> console.log(`Server is running on ${PORT}! You better go catch it!`));
        
        app.get('/', (request, response) => {

            booksCollection.find().toArray()
                .then(results => {
                    response.render('index.ejs', {books: results});
                })
                .catch(error=> console.error(error))
                
            // response.sendFile(__dirname + '/index.html');
            
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
        
        app.post('/books', (request, response)=>{
            booksCollection.insertOne(request.body)
            .then( result => {
                console.log(result);
                response.redirect('/');
            })
            .catch(error=>console.error(error))
        })
       
    })
    .catch(error=>console.error(error));

