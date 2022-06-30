# itau-coding-challenge

Projeto referente a quinta e última etapa do processo seletivo do [Bootcamp Itaú Dev Experts](https://letscode.com.br/processos-seletivos/itau-bootcamp-dev) realizado em parceria com a [Let's Code](http://letscode.com.br/).

## Requisitos

Os requisitos do projeto podem ser encontrados no arquivo [REQUISITOS.md](assets/REQUISITOS.md) presente na pasta *assets* do projeto.

## Tecnologias utilizadas

- [NodeJs] (https://nodejs.org/)
    - [Typescript] (https://www.typescriptlang.org/)
    - [Express] (https://expressjs.com/)
    - [Prisma] (https://prisma.io/)
- [PostgreSQL] (https://www.postgresql.org/)
- [Docker](https://www.docker.com/) 
    - [Docker Compose](https://docs.docker.com/compose/install/) 

## Como executar

### Instalar

Para facilitar a execução do projeto foram criados containers para as ambas APIs (plataforma e autenticação) e também para o banco de dados Postgres. Dessa forma, podemos executar todo o fluxo somente com o Docker e o Docker Compose instalados no ambiente.

- [Docker](https://www.docker.com/) (Utilizei a versão 20.10.1)
- [Docker Compose](https://docs.docker.com/compose/install/) (Utilizei a versão 1.27.4)

### Execução

1. Clone o projeto e entre na pasta com os seguintes comandos:
```
    git clone git@github.com:guivahl/itau-coding-challenge.git && cd itau-coding-challenge/
```

1.1 **IMPORTANTE:** Para conexão com a API externa é necessário gerar uma **API_KEY** no site. Para isso, é necessário um simples cadastro com a utilização de um endereço de email válido. A criação da chave pode ser gerada nesse [link](https://www.omdbapi.com/apikey.aspx).

Após geração da chave, é necessário adicionar a chave em um arquivo chamado **.env** dentro da pasta *apps/plataform*. Essa ação pode ser realizada com o seguinte comando:
```
touch apps/plataform/.env

echo "MOVIE_API_KEY={INSIRA_KEY_AQUI}" >> apps/plataform/.env
```

1.2 Antes de executar o projeto a primeira vez é necessário realizar a construção da imagem Docker. Para isso, execute o seguinte comando:
``` 
make build
```

2. Após a criação da imagem, podemos instanciar os containers com o comando:
``` 
make up
```

2.1 Para parar a execução dos containers do sistema, execute:
``` 
make down
```

### Rotas

Durante o projeto utilizei o [Insomnia](https://insomnia.rest/) para realizar as requisições ao servidor. É um software enxuto e de fácil utilização. Recomendo o mesmo para testagem de aplicação. \
Caso opte pelo Insomnia, é necessário definir algumas [variavéis de ambiente](https://docs.insomnia.rest/insomnia/environment-variables). No arquivo [ROTAS.md](assets/ROTAS.md) há uma documentação de como configurar essas variáveis e também uma relação entre **Funcionalidades x Rotas** no sistema.

[![Run in Insomnia](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=itau-coding-challenge&uri=https://github.com/guivahl/itau-coding-challenge/blob/main/assets/insomnia.json)

## Arquitetura

### Sistema

O sistema possui dois serviços: o da plataforma, que possui as principais regras de negócio, e o de autenticação, que realiza a validação de credenciais do usuário. Ambos utilizam o mesmo banco de dados. \
O serviço da plataforma realiza consultas a API [The Open Movie Database](https://www.omdbapi.com/) para obter informações sobre os filmes e requisições ao serviço de autenticação para validar os acessos. \
O serviço de autenticação utiliza um banco de dados cache para armazenar tentativas inválidas de login.

![ArquiteturaSistema](./assets/images/SystemArchitecture.jpg)


### Código

A arquitetura de código escolhida foi inspirada em conceitos de Arquitetura limpa. Utilizamos, em ambos serviços, camadas de abstração com diferentes responsabilidades.

- Camadas:
    - Server ⇒ Lida com as requisições recebidas pelo sistema
    - Controllers & Routes ⇒ Responsáveis por receber e devolver os dados para cada endpoint
    - Services ⇒ Regras de negócio, aciona banco e API externa
    - Database Repositories ⇒ Acessa os dados do banco

![ArquiteturaCodigo](./assets/images/CodeArchitecture.jpg)

### Banco de dados

Pelas regras de negócio e requisitos definidos optei por utilizar um banco de dados relacional SQL. O banco de dados escolhido para esta aplicação foi o [Postgres](https://www.postgresql.org/). \
A fim de obter uma maior abstração na conexão e operações com a instância do banco, optei pela utilização de um ORM em ambos serviços do sistema. O ORM escolhido foi o [Prisma](https://www.prisma.io/). 

O diagrama relacional foi construído especificamente para a aplicação e se encontra logo abaixo. Para maiores informações sobre as tabelas e respectivas colunas acesse o arquivo [TABELAS.md](assets/TABELAS.md). 

![DiagramaBanco](./assets/images/DatabaseDiagram.png)
