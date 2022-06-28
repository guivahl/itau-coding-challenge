import { Server } from '@overnightjs/core'
import cors from 'cors'
import http from 'http'
import express from 'express'

import { UsersController } from './controllers/users-controller'
import { RatingsController } from './controllers/ratings-controller'
import { MoviesController } from './controllers/movies-controller'
import { CommentsController } from './controllers/comments-controller'
import { CommentsReviewController } from './controllers/comments-review-controller'

import { PORT } from './config/environment'

export class ServerSetup extends Server {
    private server?: http.Server 

    constructor(private port = PORT){
        super()
    }

    public initServer(): void {
        this.setupExpress()
        this.setupControllers()
    }

    private setupExpress(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    private setupControllers(): void {
        const userControllers = new UsersController()
        const ratingControllers = new RatingsController()
        const movieController = new MoviesController()
        const commentController = new CommentsController()
        const commentReviewController = new CommentsReviewController()

        this.addControllers([
            userControllers,
            ratingControllers,
            movieController,
            commentController,
            commentReviewController
        ])
    }

    public start(): void {
      this.server = this.app.listen(PORT, () => console.log(`Serviço principal rodando na porta ${PORT}`))
    }
}