# ngx-library

A simple Angular application to help users manage their collection of books. It uses the [Open Library API](https://openlibrary.org/dev/docs/api/books) to fetch book details and local storage to save user's library data.

# Pre-Requisites

## 1. **Node.js and npm:**

You need Node.js installed on your system. npm (Node Package Manager) comes bundled with Node.js, so you don't need to install it separately. Download Node.js from the official website: [https://nodejs.org](https://nodejs.org)

Verify the installation by running these commands in your terminal or command prompt:

```bash
node -v
npm -v
```

## 2. **Angular CLI:**

The Angular CLI (Command Line Interface) is essential for creating, managing, and building Angular projects.

Install the Angular CLI globally using npm:

`npm install -g @angular/cli`

Verify the installation:

`ng version`

## 3. Basic Angular Knowledge

A basic understanding of Angular concepts like components, services, modules, and data binding is helpful.

Familiarity with TypeScript (the language Angular uses) is recommended.

If you're new to Angular, the official overview is an excellent starting point: [https://angular.dev/overview](https://angular.dev/overview).

## 4. General Web Development Knowledge

Basic understanding of HTML, CSS, and JavaScript is necessary to create and manage the frontend components and markup.

# Getting Started

To get started with the project, please follow these steps:

1.  Clone the repository from GitHub:
    ```bash
    git clone https://github.com/mrivasperez/ngx-library.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd ngx-library
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    ng serve
    ```
5.  Open your browser and go to `http://localhost:4200` to view the application.

# Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

# Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

# Testing

There are no tests at the moment. If you choose to contribute tests, please make sure they are compatible with the following standards.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Contributing
I would appreciate your contributions 🙏🏼 Please read the [Contribution Guide](./CONTRIBUTING.md).