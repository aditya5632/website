const db =require("../routes/db-config");
const bcrypt= require( "bcryptjs") ; 

const register = async(req,res)=>{
    const {email,password}= req.body
    if (!email || !password) return res.json({ status:"error",error:"Please provide email and password"});
    else{
        db.query('SELECT email FROM users WHERE email=?' ,[email], async(err, results) =>{
            if(err) throw err;
            if(results[0]) return res.json({status:"error",error: "Email is already in use"})
            else{
                const hashpassword=await bcrypt.hash(password,8);
                db.query( 'INSERT INTO users SET ?',{email:email,password:hashpassword}, (err, result) =>{
                    if (err) throw err;
                    return res.json({status:"success",success:"User has been registered"})
                })
            }
        })
    }
    
}
module.exports=register;