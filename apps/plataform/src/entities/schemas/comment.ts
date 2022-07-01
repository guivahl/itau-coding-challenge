import Joi from 'joi'

export const commentCreateSchema = {
    body: Joi.object({
        movieId: Joi.string().uuid().required(),
        text: Joi.string().required()
    })
}

export const commentReplyCreateSchema = {
    body: Joi.object({
        movieId: Joi.string().uuid().required(),
        text: Joi.string().required(),
        replyId: Joi.number().strict().integer().required()
    })
}

export const commentCitationSchema = {
    body: Joi.object({
        movieId: Joi.string().uuid().required(),
        text: Joi.string().required(),
        replyId: Joi.number().strict().integer(),
        citationId: Joi.number().strict().integer().required()
    })
}

export const updateCommentRepeteadSchema = {
    params: Joi.object({
        commentId: Joi.number().integer().required()
    })
}

export const deleteCommentSchema = {
    params: Joi.object({
        commentId: Joi.number().integer().required()
    })
}
