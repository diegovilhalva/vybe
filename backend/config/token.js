import jwt from 'jsonwebtoken'

const genToken = async (userId) => {

    try{

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {expiresIn: '10y'});
        return token;

    }
    catch(error){
        console.error("Erro ao gerar token:", error);
        return res.status(500).json({ message:"Erro ao gerar token" });
    }

}

export default genToken