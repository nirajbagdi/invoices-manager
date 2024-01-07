export const getInvoiceWithProductDetails = (invoice, products) => {
	const itemsWithDetails = invoice.items.map(item => {
		const product = products.find(product => product.id === item.productId) || {};
		return { ...product, ...item };
	});

	return { ...invoice, items: itemsWithDetails };
};
