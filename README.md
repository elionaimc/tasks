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
# parameter -o is a flag to programmatically open web browser and navigate to project
ng serve -o
```

Once the server is running, open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

This project supports Server Side Rendering (SSR). To interact with SSR version,run:

```bash
# build the project
ng build

#  start a local development server
npm run serve:ssr
```

Once the server is running, open your browser and navigate to [http://localhost:4000/](http://localhost:4000/).
