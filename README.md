# Tasks

Gerenciador de tarefas utilizando o framework Angular

## Servidor de desenvolvimento

Antes de executar esse projeto, você deve instalar as dependências usando seu terminal

```bash
# using npm as project manager
npm install
```

Este projeto foi criado utilizando o framework [Angular CLI](https://github.com/angular/angular-cli) versão 19.0.6 e depende das seguintes bibliotecas:

- [Angular Material](https://material.angular.io/)
    - Estilização geral e tema dos componentes
    - Componentes visuais e animação
- [Capacitor](https://capacitorjs.com/)
    - Suporte a local storage (platform-agnostic) e outras libs
    - Native builds (não utilizado)

Para iniciar o servidor local de desenvolvimento, execute:

```bash
# parameter -o is a flag to programmatically open web browser and navigate to project URL
ng serve -o
```

Uma vez que o servidor esteja rodando, abra seu navegador e navegue para [http://localhost:4200/](http://localhost:4200/).

Este projeto suporta SSR (Server Side Rendering). Para interagir com a versão SSR, execute:

```bash
# build the project
ng build

# start a local development server
npm run serve:ssr
```

Uma vez que o servidor esteja rodando, abra seu navegador e navegue para [http://localhost:4000/](http://localhost:4000/).

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