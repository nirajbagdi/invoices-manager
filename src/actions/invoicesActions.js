import { createAction } from '@reduxjs/toolkit';

export const saveInvoice = createAction('invoices/saveInvoice');
export const deleteInvoice = createAction('invoices/deleteInvoice');
export const copyInvoice = createAction('invoices/copyInvoice');
export const setActiveInvoice = createAction('invoices/setActiveInvoice');
export const updateProductInInvoices = createAction('invoices/updateProductInInvoices');
