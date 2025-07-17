import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {

    try{

        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ message: "Acesso não autorizado" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.userId;
        next();

    }
    catch(error){
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }

}

export default isAuth;