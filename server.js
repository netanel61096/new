const 
express=require("express"),
app=express(),
jwt=require("jsonwebtoken"),
secret= "5840"

const users=[{
 _id: "61096",
 name: "netanel",
 email: "netanel61096@test",
 pass: "hila61096"
}]

function createToken(id){
    const token =jwt.sign({_id: id},secret,{expiresIn: "15m"})
    return token
}

function authToken(token){
    const decode=jwt.verify(token,secret)
    const id=decode._id
    const foundUser=users.find(u=> u._id==id)
    return foundUser

}

function login (email,pass){
const foundUser=users.find(u=>u.email===email)
if(!foundUser||foundUser.pass!==pass)  throw "not auth"
const token=createToken(foundUser._id)
return token
}

function log (){
    try {
const token=login("netanel61096@test","hila61096")
const res=authToken(token)
console.log(res);
    } catch (error) {
        console.log(error);
    }
}

log()


app.listen(3210,()=>console.log("server is runing"))