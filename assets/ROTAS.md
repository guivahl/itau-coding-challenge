### Relação Funcionalidades x Rotas 
- Abertas
    - Criar novo usuário (POST ’/users’)
    - Login (POST ’/login’)
- Leitor
    - Ver informações de um filmes (GET ‘/movies’)
    - Ver comentários de um filme (GET ‘/movies/:movieId/comments’)
    - Dar nota a filme (POST ‘/ratings’)
- Basico
    - Postar comentários (POST ‘/comments’)
    - Postar notas (POST ‘/ratings’)
    - Responder comentários (POST ‘/comments/replies’)
- Avançado
    - Citar comentários (POST ‘/comments/citations’)
    - Marcar comentários como “Gostei” ou “Não gostei” (POST '/comments-reviewes')
- Moderador
    - Mudar *role* de outro usuário para moderador (PATCH ‘/users/:userId/roles/moderador’)
    - Excluir comentário (DELETE ‘/comments/:commentId’)
    - Marcar comentário como repetido (PATCH ‘/comments/:commentId/repeated’)

### Configuração Insomnia

**Variavéis de ambiente**
- A nível global: 
```
{
    "PLATAFORM_URL":(URL do serviço da plataforma, default: http://localhost:3000)
    "AUTH_URL": (URL do serviço de autenticação, default: http://localhost:3001)
    "AUTH_TOKEN": (token de autenticação, necessário realizar login pela aplicação pois possui tempo de expiração)
}
``` 
- Na pasta User
```
{
    "USER_ID": (ID de usuário válido)
}
``` 
- Na pasta Comment
```
{
  "COMMENT_ID": (ID de comentário válido)
}
``` 
- Na pasta Movies
```
{
  "MOVIE_ID": (ID de filme válido)
}
``` 