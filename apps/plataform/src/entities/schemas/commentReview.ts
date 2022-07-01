import Joi from 'joi'

export const commentReviewCreateSchema = {
    body: Joi.object({
        commentId: Joi.number().strict().integer().required(),
        hasLiked: Joi.boolean().strict().required()
    })
}
