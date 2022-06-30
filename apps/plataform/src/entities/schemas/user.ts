import Joi from 'joi'

export const userLoginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

export const userCreateSchema = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

