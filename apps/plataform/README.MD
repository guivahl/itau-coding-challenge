## Plataform

Sistema principal do desafio do [Bootcamp Itaú Dev Experts](https://letscode.com.br/processos-seletivos/itau-bootcamp-dev) realizado em parceria com a [Let's Code](http://letscode.com.br/). Para maiores informações gerais sobre o projeto consulte o [README.md](../../README.md) principal do projeto.

### Como executar

Caso deseje executar o projeto sem o Docker, siga o seguinte passo a passo

1. Crie um arquivo `.env` com base no arquivo `.env.example` e defina as variavéis de ambiente.
2. Instala os pacotes com `npm install`
3. Execute o projeto com `npm run dev`

### Regras de negócio

A relação de funcionalidades e rotas pode ser vista [aqui](../../assets/ROTAS.md).

- Como o usuário pode pontuar?
    - Ao avaliar um filme
    - Ao responder um comentário
- Qual valor das notas de um filme?
    - Usuário pode avaliar um filme de '1' a '10'.