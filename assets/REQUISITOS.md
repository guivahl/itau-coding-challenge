### Requisitos

- [ ] Um usuário não poderá logar sem ter feito um cadastro
- [ ] Um usuário não poderá ver filmes e comentários e notas sem estar logado
- [ ] Um usuário não poderá criar, editar ou excluir comentários e notas sem estar logado
- [ ] Um usuário de um determinado perfil não poderá realizar ações que não fazem parte de seu perfil
- [ ] Todas as funcionalidade de seu sistema devem receber um token de autenticação, gerados pela sua API de autorização
- [ ] Um usuário não autenticado(que não possui o token) não poderá realizar ações no sistema.
- [ ] Um usuário com token invalido não poderá realizar ações no sistema.
- [ ] Todas as tentativas falhas de login devem ser salvas em um cache.
- [ ] Caso um usuário tente 3 vezes logar e erre, na 4 vez deverá ser retornado uma mensagem de “limite de tentativas excedido “

### Requisitos não funcionais

- [ ] Armazene os dados de cadastro de usuário e produtos em uma base de dados da sua escolha, inclusive H2.
- [ ] Crie um cache para tentativas de login, o cache pode ser utilizando um provedor de cache ou o próprio hashMap do java
- [ ] Desenvolva suas API’s utilizando a linguagem JAVA.
- [ ] Você deve utilizar os filmes fornecidos pela API [https://www.omdbapi.com/](https://www.omdbapi.com/), ou seja deverá consumir essa API na sua aplicação.