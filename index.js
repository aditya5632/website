const express= require("express");
const db=require("./routes/db-config.js")
const app=express();
const cookie=require("cookie-parser");
app.use("/js",express.static(__dirname+"/public/js"))
app.use("/css",express.static(__dirname+"/public/css"))
app.set("view engine","ejs");
app.set("views","./views");
app.use(cookie());
app.use(express.json());

const PORT=process.env.PORT || 5000;


db.connect((err)=>{
    if(err) throw err ;
})


app.use("/",require("./routes/pages"));
app.use("/api",require("./controllers/auth"));
app.listen(PORT);