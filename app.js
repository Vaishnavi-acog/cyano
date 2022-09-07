const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const sqlite3 = require("sqlite3").verbose();
let sql;
const cors = require("cors");
// const url = require("url")
app.use(express.static("./views"))
app.set('view engine', 'html')
app.use(express.json())
app.use(cors({origin: "*"}))
app.set('views', __dirname + '/views'); // general config
app.engine('html', require('ejs').renderFile);
app.use(express.static("views"));
//connect
const db = new sqlite3.Database('./cyano.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
})

app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.render("home")
})
app.post("/movie", (req, res)=>{
    try {
        // console.log(req.body.quote)
        const {name, proteome, pfam} = req.body;
        sql = "INSERT INTO cyano( name, proteome, pfam) VALUES (?,?,?)";
        db.run(sql, [movie, quote, char],(err)=>{
            if(err) return res.json({status: 300, success: false, error:err});
                
            console.log("success", name, proteome, pfam)
        })
        return res.json({
            status: 200,
            success: true
        }) 
    } catch (error) {
        return res.json({status: 300, success: false})
    }
})

app.get("/movie", (req, res)=>{
sql = "SELECT * FROM cyano WHERE proteome LIKE 'UP000002483%' ";
try {
    db.all(sql,[], (err, row)=>{
        if(err) return res.json({status: 300, success: false, error: err});

        if(row.length < 1) return res.json({status: 300, success: false, error: err});

        return res.json({status: 200, data:row, success: true}) 
    } )
} 
catch (error) {
    return res.json({status: 300, success: false})
}

})

app.listen(8000, (req, res)=>{
    console.log('listening on 8000')
})