import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { signInSchema, signUpSchema } from "../validations/auth.validation.js";

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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
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
            secure: false,
            sameSite: 'Strict'
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
