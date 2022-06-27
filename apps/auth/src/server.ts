import { Server } from '@overnightjs/core'
import cors from 'cors'
import http from 'http'
import express from 'express'

import { AuthController } from './controllers/auth-controller'

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
        const authController = new AuthController()

        this.addControllers([authController])
    }

    public start(): void {
      this.server = this.app.listen(PORT, () => console.log(`Serviço de autenticação rodando na porta ${PORT}`))
    }
}