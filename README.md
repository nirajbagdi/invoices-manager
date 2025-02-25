# Invoice Management System

This project is an **enhanced version** of an existing [Invoice Generator](https://github.com/johnuberbacher/invoice-generator). The original project only supported generating an invoice from provided details in a single form. This version expands on that by introducing **Invoice Management** and a **Products Tab** for better organization.

## Features

### ✅ Originally Supported Features
- Generate an invoice by entering all details in a single form.
- Export the invoice as a document.

### 🔄 New Enhancements
- **Invoices can now be saved and managed** – View, edit, and delete invoices instead of just generating them.

- **Dedicated Products Tab** – Products are now managed separately from invoices.
  - Add, edit, or remove product items independently.
  - Group products into categories for better organization.

- **Two-Tab Invoice Layout:**
  - **Overview Tab** – Displays invoice details like client info and tax rates.
  - **Products Tab** – Lists and manages associated product items.

- **Duplicate Existing Invoices** – Quickly create a new invoice based on an existing one.

- **Shared Product Updates** –
  - If a product's name or description is updated, it reflects across all invoices using that product.
  - Changing a product’s quantity only affects that specific invoice, not others.

## Screenshots

![Screenshot 2025-02-25 180501](https://github.com/user-attachments/assets/ff03462c-06d6-4b9a-a98d-b986145c9068)
![Screenshot 2025-02-25 180630](https://github.com/user-attachments/assets/5f123a3d-3011-464f-b756-a2fd7648898c)
![Screenshot 2025-02-25 180706](https://github.com/user-attachments/assets/b9885577-3431-4f86-ba67-a88faeb8e674)
![Screenshot 2025-02-25 180731](https://github.com/user-attachments/assets/bc26a066-0e34-4f30-8470-0a7b5fe09967)


## Tech Stack
- **React** – Component-based UI.
- **Redux** – Centralized state management.
- **React Router** – Handles navigation.
- **Bootstrap** – Provides responsive styling.
- **[JSPDF React](https://www.npmjs.com/package/jspdf-react)** – Converts HTML to PDF docs.

## Installation
```sh
git clone https://github.com/nirajbagdi/invoices-manager.git

npm install

npm start
```
Runs on http://localhost:3000
