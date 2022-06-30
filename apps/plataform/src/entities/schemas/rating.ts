import Joi from 'joi'

const SCORE_VALUES = [
    '1', '2', '3', '4', '5',
    '6', '7', '8', '9', '10'
]

export const ratingCreateSchema = {
    body: Joi.object({
        movieId: Joi.string().uuid().required(),
        score: Joi.string().valid(...SCORE_VALUES).required()
    })
}
