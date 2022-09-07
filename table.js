
const sqlite3 = require("sqlite3").verbose();
let sql;

//connect
const db = new sqlite3.Database('./cyano.db', sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
})
// create

// sql = `CREATE TABLE cyano(id INTEGER PRIMARY KEY, name, proteome, pfam)`;
// db.run(sql)

//DROP
// db.run("DROP TABLE details");

//insert
sql = `INSERT INTO cyano( name, proteome, pfam) VALUES (?,?,?)`;
db.run(sql, ["Halomona" , "UP000223862","PF00160"],
(err)=>{
    if(err) return console.error(err.message)
})

//query
// sql = `SELECT * FROM users`;
// db.all(sql, [], (err, rows)=>{
//     if(err) return console.error(err.message);
//     rows.forEach((row)=>{
//         console.log(row)
//     })

// })