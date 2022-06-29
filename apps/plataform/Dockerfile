FROM node:16 as development

WORKDIR /home/apps/plataform

COPY package.json ./

ENV DATABASE_URL="postgresql://docker:password@database:5432/itau_coding_challenge"

COPY . .

