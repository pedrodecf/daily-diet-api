# 🥗 Daily Diet API

1. Clone este repositório em sua máquina local:
```bash
git clone https://github.com/pedrodecf/daily-diet-api/
```

2. Instale as dependências necessárias:
```bash
npm install
```

3. Execute as migrations do Knex para criar as tabelas do banco de dados:
```bash
npm run knex -- migrate:latest
```

4. Inicie a API:
```bash
npm run dev
```

> [!NOTE]  
> Fiz muito rápido esse repositório e esqueci de fazer os commits [(eu nesse momento)](https://youtu.be/W8Do3jssZ-g?si=qWDK4Hr0jGOD6rwN)

---

### Requisitos Funcionais:

- [x] Criar um usuário
- [x] Identificar o usuário entre as requisições
- [x] Registrar uma refeição feita, com as seguintes informações:
  - [x] Nome
  - [x] Descrição
  - [x] Data e Hora
  - [x] Está dentro ou não da dieta
- [x] Editar uma refeição, podendo alterar todos os dados acima
- [x] Apagar uma refeição
- [x] Listar todas as refeições de um usuário
- [x] Visualizar uma única refeição
- [x] Recuperar as métricas de um usuário
  - [x] Quantidade total de refeições registradas
  - [x] Quantidade total de refeições dentro da dieta
  - [x] Quantidade total de refeições fora da dieta
  - [x] Melhor sequência de refeições dentro da dieta

### Regras de Negócios:

- [x] Restringir visualização, edição e exclusão de refeições apenas ao usuário que as criou
