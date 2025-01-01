# Tasks

Frontend only task manager app using Angular framework.

## Development server

Before you run this web app, you need to install dependencies using your terminal

```bash
# using npm as project manager
npm install
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6 and has the following library dependencies:

- [Angular Material](https://material.angular.io/)
    - Common stylling and themming
    - Visual components and animation
- [Capacitor](https://capacitorjs.com/)
    - Local storage support (platform agnostic) and other plugins
    - Native builds (not used)

To start a local development server, run:

```bash
# parameter -o is a flag to programmatically open web browser and navigate to project URL
ng serve -o
```

Once the server is running, open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

This project supports Server Side Rendering (SSR). To interact with SSR version,run:

```bash
# build the project
ng build

# start a local development server
npm run serve:ssr
```

Once the server is running, open your browser and navigate to [http://localhost:4000/](http://localhost:4000/).

## Requisitos Funcionais

- O usuário deve ser capaz de:
    - Adicionar uma nova tarefa com título e descrição. ✅
    - Marcar uma tarefa como concluída. ✅
    - Editar uma tarefa existente. ✅
    - Excluir uma tarefa. ✅
    - Filtrar tarefas por status (concluídas/não concluídas). ✅

- Os dados devem ser armazenados no local storage do navegador. ✅

- A aplicação deve possuir:
    - Uma tela de listagem de tarefas. ✅
    - Um formulário para criar/editar tarefas. ✅

## Requisitos Técnicos

- Angular versão 14 ou superior. ✅
- Utilize boas práticas de componentização e modularização. ✅
- Utilize Reactive Forms para o gerenciamento dos formulários. ✅
- Implemente pelo menos um serviço para abstrair a lógica de gerenciamento das tarefas. ✅
- Utilize RxJS para lidar com streams de dados onde aplicável. ✅
- Use Bootstrap ou outro framework CSS para estilização básica (usado: Angular Material). ✅
- Crie um Pipe customizado para formatar a data de criação/edição das tarefas. ✅
- Adicione tratamento de erros e validações nos formulários. ✅

## Extras (opcional)

- Implementar testes unitários (usando Jasmine e Karma). ⛔
- Configurar Lazy Loading para otimizar o carregamento de módulos. ⛔
- Utilizar State Management (ex.: NgRx) para gerenciar o estado global da aplicação. ✅
- Implementar animações para melhorar a experiência do usuário. ✅