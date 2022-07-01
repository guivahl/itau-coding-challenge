import Joi from 'joi'

const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/

export const userLoginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

export const userVerifySchema = {
    body: Joi.object({
        token: Joi.string().pattern(JWT_REGEX).required()
    })
}
