const { urlencoded } = require('express');
const express = require('express');
const app = express();
const requests = require('requests');

app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended:false}));

app.use(express.json());

let place = 'mumbai';


app.get('/', (req,res)=>{
    
});
app.get('/home',(req,res)=>{
    res.render('index.ejs');
});
app.post('/home', (req,res)=>{
    place = req.body.city;
    let info = `http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=93e059ab1880c53bb3753131d219e8db`
    
    requests(info)
    .on('data', function (chunk) {
    const val = JSON.parse(chunk);
    res.render('result.ejs',{
        city: val.name,
        status: val.weather[0].main,
        temp:Math.round(val.main.temp) ,
        min: val.main.temp_min,
        max: val.main.temp_max
    });
    console.log(val);
    })
    .on('end', function (err) {
    if (err) return res.send('connection closed due to errors', err);
 
    console.log('end');
    });

});

app.listen(3000);