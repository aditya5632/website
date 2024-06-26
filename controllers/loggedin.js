const db=require( "../routes/db-config");
const jwt=require( 'jsonwebtoken' );


const loggedIn=(req,res,next)=>{
    if(!req.cookies.userRegister)return next();
    try{
        const decoded=jwt.verify(req.cookies.userRegister,process.env.JWT_SECRET);
        db.query('SELECT * FROM users WHERE id=?',[decoded.id],(err,result)=>{
            if(err) return next();
            req.user=result[0];
            return next();
        })
    }catch(err){
            if(err) return next(error)
    }
    
}
module.exports = loggedIn;