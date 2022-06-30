## Auth

Sistema de autorização para realização do desafio do [Bootcamp Itaú Dev Experts](https://letscode.com.br/processos-seletivos/itau-bootcamp-dev) realizado em parceria com a [Let's Code](http://letscode.com.br/). Para maiores informações gerais sobre o projeto consulte o [README.md](../../README.md) principal do projeto.

### Como executar

Caso deseje executar o projeto sem o Docker, siga o seguinte passo a passo

1. Crie um arquivo `.env` com base no arquivo `.env.example` e defina as variavéis de ambiente.
2. Instala os pacotes com `npm install`
3. Execute o projeto com `npm run dev`

### Cache

O [node-cache](https://www.npmjs.com/package/node-cache) foi escolhido para salvar as tentativas de logins erradas no sistema de autenticação.
