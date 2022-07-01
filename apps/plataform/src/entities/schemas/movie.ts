import Joi from 'joi'

export const getMovieSchema = {
    query: Joi.object({
        movieName: Joi.string().required()
    })
}

export const getMovieCommentsSchema = {
    params: Joi.object({
        movieId: Joi.string().uuid().required()
    })
}
