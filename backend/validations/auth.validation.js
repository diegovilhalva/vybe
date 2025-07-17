export const signUpSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter no mínimo 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres',
    'any.required': 'Nome é obrigatório'
  }),
  userName: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'Nome de usuário é obrigatório',
    'string.min': 'Nome de usuário deve ter no mínimo 3 caracteres',
    'string.max': 'Nome de usuário deve ter no máximo 30 caracteres',
    'any.required': 'Nome de usuário é obrigatório',
    'string.alphanum': 'Nome de usuário deve conter apenas letras e números'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email é obrigatório',
    'any.required': 'Email é obrigatório'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Senha deve ter no mínimo 6 caracteres',
    'string.empty': 'Senha é obrigatória',
    'any.required': 'Senha é obrigatória'
  })
});



import Joi from 'joi';

export const signInSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'Nome de usuário é obrigatório',
    'string.min': 'Nome de usuário deve ter no mínimo 3 caracteres',
    'string.max': 'Nome de usuário deve ter no máximo 30 caracteres',
    'any.required': 'Nome de usuário é obrigatório',
    'string.alphanum': 'Nome de usuário deve conter apenas letras e números'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 6 caracteres',
    'any.required': 'Senha é obrigatória'
  })
});
