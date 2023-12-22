import DUMMY_INVOICES from '../invoices.json';

const ACTIONS = {
	SAVE_ITEM: 'SAVE_ITEM',
	DELETE_ITEM: 'DELETE_ITEM',
	SET_ACTIVE_INVOICE: 'SET_ACTIVE_INVOICE',
};

const initialState = {
	items: DUMMY_INVOICES.invoices,
	activeInvoice: null,
};

export const saveItem = item => ({ type: ACTIONS.SAVE_ITEM, payload: item });
export const deleteItem = itemId => ({ type: ACTIONS.DELETE_ITEM, payload: itemId });
export const setActiveInvoice = item => ({ type: ACTIONS.SET_ACTIVE_INVOICE, payload: item });

const invoicesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.SAVE_ITEM: {
			const { id: itemId, ...updatedItem } = action.payload;

			const existingItem = state.items.find(item => item.id === itemId);

			if (existingItem) {
				const updatedItems = state.items.map(item =>
					item.id === itemId ? { ...item, ...updatedItem } : item
				);

				return { ...state, items: updatedItems };
			} else {
				return { ...state, items: [...state.items, action.payload] };
			}
		}

		case ACTIONS.DELETE_ITEM: {
			const filteredItems = state.items.filter(item => item.id !== action.payload);
			return { ...state, items: filteredItems };
		}

		case ACTIONS.SET_ACTIVE_INVOICE: {
			return { ...state, activeInvoice: action.payload };
		}

		default:
			return state;
	}
};

export default invoicesReducer;
