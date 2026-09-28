# organizamuusAPI

API desenvolvida para o back-end da aplicação mobile Organuzamuus, um app para organização de tarefas compartilhadas entre moradores de uma mesma casa ou apartamento. O projeto surgiu a partir de uma referência de UI/UX publicada no Behance: [Organizamuus — UI/UX](https://www.behance.net/gallery/245162835/Organizamuus-UIUX?tracking_source=search_projects%7Corganizamuus)

A proposta é resolver um problema comum entre universitários que precisam dividir moradia durante a graduação, muitas vezes com pessoas de outros cursos ou universidades, e encontram dificuldades para organizar a rotina, dividir responsabilidades e acompanhar as tarefas da casa.

O frontend da aplicação foi desenvolvido em React Native com Expo, TypeScript e Styled-Components.

Repositório: [Organizamuus](https://github.com/thainarapenha/organizamuus)

<div align="center">Node.js | TypeScript | Express | Prisma | PostgreSQL | Docker | JWT | Zod</div>

##  O que tem feito:

### Autenticação
- [x] Cadastro de usuários
- [x] Login com e-mail e senha
- [x] Hash de senha
- [x] Autenticação via JWT
- [x] Middleware de autenticação
- [x] Token de usuário autenticado

### Tarefas
- [x] Criar tarefa
- [x] Listar tarefas do apartamento
- [x] Buscar tarefa por ID
- [x] Atualizar tarefa
- [x] Excluir tarefa

##  O que falta:

- [ ] Login com Google
- [ ] Refresh Token
- [ ] Recuperação de senha
- [ ] Gestão de membros
- [ ] Adicionar/convidar moradores
- [ ] Remover moradores
- [ ] Implementar recorrência semanal
- [ ] Notificações

## Endpoints

| Métodos |    Rotas     |               Descrição                               |
| ------- | :----------: | :---------------------------------------------------: |
| POST    |  /auth/login |   Autentica o usuário e retorna um token JWT          |
| POST    |  /tasks      |   Cria uma nova tarefa no apto do usuário autenticado |
| GET     |  /tasks      |   Lista as tarefas do apto do usuário                 |
| GET     |  /tasks/:id  |   Retorna os dados de uma tarefa específica por id    |
| PATCH   |  /tasks/:id  |   Atualiza os dados de uma tarefa existente           |
| DELETE  |  /tasks/:id  |   Exclui uma tarefa do apartamento do usuário         |

As rotas de tarefas são protegidas por JWT.

O token deve ser enviado no header:

Authorization: Bearer SEU_TOKEN

## JSON
### POST /auth/login
```
{
  "email": "seu_nome@teste.com",
  "password": "sua_senha"
}
```

### POST /tasks
```
{
  "responsibleMemberId": "aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  "room": "kitchen",
  "description": "Lavar a louça",
  "startDate": "2026-09-28T18:00:00.000Z",
  "endDate": "2026-09-28T19:00:00.000Z",
  "recurrence": "single"
}
```

### PATCH /tasks/:id
```
{
  "responsibleMemberId": "aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
  "room": "bathroom",
  "description": "Limpar o banheiro",
  "startDate": "2026-09-28T18:00:00.000Z",
  "endDate": "2026-09-28T19:00:00.000Z",
  "recurrence": "weekly",
  "status": "pending"
}
```

##  Instalando e Executando

Clonando o repositório:

```
https://github.com/thainarapenha/organizamuusAPI.git
```

Entrar na pasta do projeto:

```
cd organizamuusAPI
```

Instalando todos os pacotes:

```
npm install
```

Rodando o projeto:

```
npm run dev
```


## Contato
LinkedIn: [Thainara Penha](https://www.linkedin.com/in/thainarapenha/)
