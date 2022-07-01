FROM node:16 as development

WORKDIR /home/apps/auth

COPY package.json ./

RUN npm i

ENV DATABASE_URL="postgresql://docker:password@database:5432/itau_coding_challenge"

COPY . .


RUN npm install --location=global prisma