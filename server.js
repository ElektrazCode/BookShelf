const express = require('express');
const bodyParser = require('body-parser');
const { ConnectionClosedEvent } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const connectionStr = 'mongodb+srv://moi:tusaisquoi@cluster0.zgxesci.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8000;

MongoClient.connect(connectionStr)
    .then(client => {
        const db = client.db('bookshelf-books');
        const booksCollection = db.collection('books');

        app.set('view engine', 'ejs');
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.listen(PORT, ()=> console.log(`Server is running on ${PORT}! You better go catch it!`));
        
        app.get('/', (request, response) => {               
            response.sendFile(__dirname + '/index.html');          
        })

        app.get('/explore.ejs', (request, response) => {
            booksCollection.find().sort({title:1}).toArray()
                .then(results => {
                    response.render('explore.ejs', {books: results});
                })
                .catch(error=> console.error(error))  
        })

        app.get('/api', (request, response) => {
            booksCollection.find().toArray()
                .then(results => {
                    response.json(results);
                })
                .catch(error=>console.error(error))
        })
        
        app.get('/api/:bookName', (request, response) =>{
            const bookTitle = request.params.bookName.toLowerCase();
            console.log(bookTitle);
            booksCollection.find().toArray()
            .then(results => {
                const book = results.filter(obj => obj.title.toLowerCase() === bookTitle);
                if(book) 
                    response.json(book);
                else
                    response.json({'error':'Book is Not on Shelf!'});
            })
        })
        // app.get('/books', (request, response) =>{
        //     const bookTitle = request.body.title.toLowerCase();
        //     console.log(bookTitle);
        //     booksCollection.find().toArray()
        //     .then(results => {
        //         const book = results.filter(obj => obj.title.toLowerCase() === bookTitle);
        //         if(book) 
        //             response.json(book);
        //         else
        //             response.json({'error':'Book is Not on Shelf!'});
        //     })
        // })
        
        app.post('/books', (request, response)=>{
            booksCollection.insertOne(request.body)
            .then( result => {
                response.redirect('/frontDesk.html');
            })
            .catch(error=>console.error(error))
        })

        app.put('/books', (request, response) => {
            booksCollection.findOneAndUpdate(
                {  
                    title: request.body.title,
                },
                {
                    $set: {
                        title: request.body.title,
                        author: request.body.author,
                        date: request.body.date,
                        pages: request.body.pages,
                        synopsis: request.body.synopsis
                    }
                },
                {
                    upsert: true
                }
            )
            .then(results => {
                response.redirect('/frontDesk.html');
                })
            .catch(error=> console.error(error))  
        })
       
        app.delete('/books', (request, response) => {
            booksCollection.findOneAndDelete(
                { title: request.body.title}
            )
            .then(result => {
                if (result.deletedCount === 0)
                    return response.json('No books to delete!');
                response.json('Deleted last book!');
            })
            // .then( result => {
            //     response.redirect('/explore.ejs');
            // })
            .catch(error => console.error(error))
        })
    })
    .catch(error=>console.error(error));

