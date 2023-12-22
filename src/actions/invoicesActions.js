import { createAction } from '@reduxjs/toolkit';

export const saveItem = createAction('invoices/saveItem');
export const deleteItem = createAction('invoices/deleteItem');
export const setActiveInvoice = createAction('invoices/setActiveInvoice');