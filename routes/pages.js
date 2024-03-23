const express =require("express");
const router=express.Router();
const loggedIn=require("../controllers/loggedin")
const logout=require("../controllers/logout")

// logged in
router.get( "/",loggedIn, (req, res) => {
    if(req.user){
        res.render("index", {status:"LoggedIn",user:req.user});
    }else{
    res.render("index",{status:"no",user:"nothing"});
}
})

//register route
router.get( "/register", (req, res) => {
    res.sendFile("register.html",{root:"./public"});
})

//profile route
router.get("/profile",loggedIn,function(req,res){
   //;  
   if(req.user){
    res.sendFile("index",{root:"./public"});
}else{
res.render("index",{status:"no",user:"nothing"});
}
});

//login route

router.get( "/login", (req, res) => {
    res.sendFile("login.html",{root:"./public/"});
})

//log out
router.get("/logout",logout)
module.exports= router;