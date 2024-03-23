const jwt = require("jsonwebtoken");
const db = require('../routes/db-config');
const bcrypt=require("bcryptjs");

const login =  async (req, res) => {
    const{email, password} = req.body;
    if (!email || !password) return res.json({ status:"error",error:"Please provide email and password"});
    else{
        db.query('SELECT * FROM users WHERE email=?',[email],async (err, results)=>{
            if(err) throw err;
            if(!results.length||!await bcrypt.compare(password,results[0].password))return res.json({status:'error', error: 'Invalid Email or Password'})
            else{
                const token=jwt.sign({id: results[0].id}, process.env.JWT_SECRET,{
                    expiresIn:process.env.JWT_EXPIRES
                })
                const cookieOptions={
                    expiresIn: new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),
                    httpOnly: true
                }
                res.cookie("userRegistered",token,cookieOptions);
                
                //return res.json({status:"success",success:"User has been logged In"});
                return res.redirect('/profile');
            }
    })

}}
module.exports = login;