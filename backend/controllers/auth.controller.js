import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { signInSchema, signUpSchema } from "../validations/auth.validation.js";
import sendMail from "../config/email.js";

export const signUp = async (req, res) => {
    try {
        const { error } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, password, userName } = req.body

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Este email já está em uso" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            userName
        });

        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production', // false local
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        });


        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(201).json(userResponse);

    } catch (error) {
        return res.status(500).json({ message: `Erro ao registrar: ${error.message}` });
    }
}

export const signIn = async (req, res) => {


    try {

        const { error } = signInSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { password, userName } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        });



        const userResponse = user.toObject();
        delete userResponse.password;
        
        return res.status(200).json(userResponse);

    }
    catch (error) {
        return res.status(500).json({ message: `Erro ao fazer login ${error}` });
    }

}

export const signOut = async (req, res) => {

    try {

        res.clearCookie('token');
        return res.status(200).json({ message: "Logout feito com sucesso" });

    }
    catch (error) {
        return res.status(500).json({ message: `erro no logout ${error}` });
    }

}



export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        user.isOtpVerified = false;


        await user.save();
        await sendMail(email, otp)

        return res.status(200).json({ message: "código OTP enviado para o seu email" })

    } catch (error) {
        console.error('Erro ao enviar OTP:', error)
        return res.status(500).json({ message: `erro ao tentar enviar o código OTP` })
    }
}


export const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Código inválido ou expirado" });
        }

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();

        return res.status(200).json({ message: "Otp verificado com sucesso" });

    }
    catch (error) {
        console.log(`erro na viricação do otp ${error}`)
        return res.status(500).json({ message: ` Erro ao verificar código OTP` });
    }

}





export const resetPassword = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "Usuário não encontrado ou Código OTP não verificado" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({ message: "Senha alterada com sucesso" })



    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao tentar alterar a senha" });
    }

}
