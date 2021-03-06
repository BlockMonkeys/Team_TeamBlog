const { User } = require("../model/User");

//회원 확인(Blockmonkey);
const auth = (req, res, next) => {
    const token = req.cookies.x_auth;
    //쿠키에서 토큰을 가져와 복호화해서 
    //-> 유저의 아이디값과 토큰을 복호화한 유저의 _id값을 비교해 유저를 확인한다.
    //-> 유저가 존재하면 인증시켜주고, 없으면 인증시키면 인증안됨.
    User.compareToken(token, (err, user)=>{
        if(err) return res.send(err);
        if(!user) return res.json({ is_login: false, msg: "유저가 존재하지 않습니다." });
        req.token = token;
        req.user = user;
        next();
    })
}


module.exports = { auth };