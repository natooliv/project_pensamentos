const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();
const conn = require('./db/conn');

// Configuração do template engine Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main', // Nome do arquivo de layout principal
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
// session middleware
app.use(
    session({
        name:"session",
        secret:"nosso_secret",
        resave:false,
        saveUninitialized:false,
        store:new fileStore({
            logFn:function(){},
            path:require('path').join(require('os').tmpdir(),'sessions'),
        }),
        cookie:{
            secure:false,
            maxAge:360000,
            expires: new Date(Date.now() + 360000),
            httpOnly:true,
        }

    })
);

// flash messages 
app.use(flash());

// public path
app.use(express.static('public'));

// set session 
app.use((req,res,next)=> {
    if(req.session.userid){
        res.locals.session = req.session;
    }
    next();
});

conn
.sync()
.then(()=>{
    app.listen(3000)
})
.catch((err)=> console.log(err));
