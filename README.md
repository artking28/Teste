# Teste Técnico - Tokio Marine

Projeto fullstack para demonstrar habilidades em desenvolvimento com Java e Angular, seguindo boas práticas e organização de código.

## Tecnologias
- **Back-end**: Java com Spring Boot
- **Front-end**: Angular
- **Banco de dados**: PostgreSQL

## Pré-requisitos
- Java 17
- Maven
- Node.js (versão 16 ou superior)
- PostgreSQL (banco `tokioteste` criado)
- npm ou bun (opcional, para front-end)

## Execução
- O servidor Spring Boot roda na porta **3000**.
- A aplicação Angular roda na porta **4200**.

## Como rodar o front-end
1. Navegue até a pasta `web`:
   ```bash
   cd web
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor Angular:
   ```bash
   npm run s
   ```
   **Nota**: Se preferir, use `bun run s`. Estes comandos estão definidos no `angular.json`.


4. Acesse em `http://localhost:4200`.

## Como rodar o back-end
1. Configure o PostgreSQL:
    - Crie o banco `tokioteste`:
      ```bash
      createdb tokioteste
      ```
    - Ajuste as credenciais no arquivo `src/main/resources/application.yml`.
2. Navegue até a pasta `server`:
   ```bash
   cd server
   ```
3. Compile e execute o projeto:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
4. O servidor estará disponível em `http://localhost:3000`.

### Configurações do `application.yml`
O arquivo `src/main/resources/application.yml` contém as configurações do banco e servidor. Exemplo:

```yaml
spring:
   datasource:
      url: jdbc:postgresql://localhost:5432/tokioteste
      username: postgres
      password: postgres
      driver-class-name: org.postgresql.Driver
   jpa:
      database-platform: org.tokio.teste.arthur.config.MyPostgresDialect
      hibernate:
         ddl-auto: update
      show-sql: false

server:
   port: 3000
   error:
      include-stacktrace: always

management:
   endpoints:
      web:
         exposure:
            include: mappings
```

- **Credenciais**: Ajuste `username` e `password` conforme seu ambiente PostgreSQL.
- **MyPostgresDialect**: Dialect customizado para suportar configurações específicas do PostgreSQL no projeto (ex.: tipos de dados personalizados).
- **management.endpoints**: Habilita endpoints do Actuator (ex.: `/actuator/mappings`) para monitoramento e debug da API.

## API Endpoints

### ⚙️ AnonymousController
| Endpoint         | Método | Descrição                              |
|------------------|--------|----------------------------------------|
| `/ping`          | GET    | Verifica disponibilidade (retorna `pong`). |

### 🔒 AuthController (`/api/auth`)
| Endpoint           | Método | Descrição                              |
|--------------------|--------|----------------------------------------|
| `/api/auth/login`  | POST   | Autentica usuário e retorna JWT.       |
| `/api/auth/signup` | POST   | Cria novo usuário e retorna JWT.       |

### 👤 UserController (`/user`)
| Endpoint                | Método | Descrição                              |
|-------------------------|--------|----------------------------------------|
| `/user/changeTheme`     | GET    | Altera tema do usuário logado.         |
| `/user/quickUpdate`     | POST   | Atualiza dados do usuário logado.      |
| `/user/findChildren`    | GET    | Lista usuários filhos do logado.       |

### 📍 AddressController (`/address`)
| Endpoint                | Método | Descrição                              |
|-------------------------|--------|----------------------------------------|
| `/address/myAddresses`  | GET    | Lista endereços do usuário logado.     |
| `/address/cep/{cep}`    | GET    | Busca endereço via API ViaCEP.         |

**Nota**: O endpoint `/address/cep/{cep}` retorna o endereço completo do ViaCEP, sem alterar dados no sistema.

### 📦 AbstractController (genérico)
Usado como base para operações comuns em controladores como `UserController` e `AddressController`. O `<prefixo>` pode ser `/user`, `/address`, etc.

| Endpoint                | Método | Descrição                              |
|-------------------------|--------|----------------------------------------|
| `/<prefixo>/byId/{id}` | GET    | Busca entidade por ID.                 |
| `/<prefixo>/byId/{id}` | DELETE | Remove entidade por ID.                |
| `/<prefixo>/select`     | POST   | Filtra/lista entidades com paginação.  |
| `/<prefixo>/save`       | POST   | Cria ou atualiza entidade.             |

**Nota**: O método `save` usa `uuidCheck` para evitar duplicações.
