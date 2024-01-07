# Invoice Management System

The Invoice Management App is a React and Redux-based web application that streamlines invoice creation, viewing, and management. It introduces a user-friendly Products tab, dynamic product information updates, and allows grouping products for better organization during invoice creation.

## Live Demo

A live demo of the application is hosted at [https://invoices-manager-v2.netlify.app](https://invoices-manager-v2.netlify.app)

## Features

-   Create, view, edit, and delete invoices
-   Duplicate existing invoices for easy creation
-   Manage associated products in a dedicated tab.
-   Real-time reflection of product changes in all used invoices.
-   Organize products by purpose for streamlined workflow.

## Built With

-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   [Redux](https://redux.js.org/) - A Library for managing the application state.
-   [React Router](https://reactrouter.com/en/main) - A Framework to handle routing in React applications.
-   [Bootstrap](https://react-bootstrap.netlify.app/) - An open-source CSS framework.

## Getting Started

To get started with the project, follow these steps:

1.  Clone the repository:

    ```sh
    git clone https://github.com/nirajbagdi/invoices-manager.git
    cd invoices-manager
    ```

2.  Install & Run the application:

    ```sh
    npm install
    npm start
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000/).

### Project Structure

-   **src/components**: Contains React components for different parts of the application.
-   **src/actions**: Redux actions and action types.
-   **src/reducers**: Reducers for managing different parts of the state.
-   **src/store**: Configuration of the Redux store.
-   **src/utils**: Utility functions.

## Credits

This project is an enhanced version and built on top of [Invoice Generator](https://github.com/johnuberbacher/invoice-generator).
