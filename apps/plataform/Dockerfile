FROM node:16 as development

WORKDIR /home/apps/plataform

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV DATABASE_URL="postgresql://docker:password@database:5432/itau_coding_challenge"
ENV URL_AUTH_API="http://auth:3001"

CMD ["sh", "./docker-dev.sh"]