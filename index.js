// pull in express
const express = require(`express`);
const logger = require(`morgan`); // instant logs. save logs and backup ;; companies - where did things go wrong?
const cors = require(`cors`);
const helmet = require(`helmet`);



const server = express();

// keep routes and middleware separate.
// MIDDLEWARES
// const logger = (req, res, next) => {
//     // next will be called in every piece of middleware we build
//     // it will determine when to go to next piece of middleware
//     console.log(`${Date.now()} $(req.method) made to the ${req.url}`) // method and url lives on req body by default
//     // without next, infinite loop.
//     next();
// }

// req is just an object. create new property ;; mutate it. new property name called section
const greeter = (req, res, next) => {
    req.section = 'FSW14';
    next();
}

const yell = (req, res, next) => {
    // modify req,params.name to uppercase
    const newName = req.params.name.toUpperCase();
    // set new name yelled on req.name
    req.name = newName;
    // move in to next piece of middleware
    next();
}

server.use(logger(`combined`));
// server.use(logger(`tiny`));
server.use(cors());
server.use(helmet());
// server.use(logger('tiny', cors(), helmet()));


// global middleware
// server.use(logger); // all endpoints will go to logger
// route
server.get('/section', greeter, (req, res) => {
    res.send(`Hello ${req.section}, I <3 U!`);
})

// middleware in between request (logger)
// ROUTES
// server.get('/', logger, (req, res) => {
//     res.send('Cowabunga!');
// });
server.get('/', (req, res) => {
    res.send('Cowabunga!');
});
server.get('/rapha', (req,res) => {
    res.send('I am Raphael!');
});
server.get('/name/:name', yell, greeter, (req,res) => {
    res.send(`${req.name} is in ${req.section}`);
})


const port = 9000;
server.listen(port, () => console.log(`Booyahkasha happening ${port}`))

// There is nothing more empowering than being able to customize your own software
// Why log mention favicon 
// Greeter middleware. Manipulate request and print a string