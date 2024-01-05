import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const currencyOptions = [
	{ value: '$_USD', label: 'USD (United States Dollar)' },
	{ value: '£_GBP', label: 'GBP (British Pound Sterling)' },
	{ value: '¥_JPY', label: 'JPY (Japanese Yen)' },
	{ value: '$_CAD', label: 'CAD (Canadian Dollar)' },
	{ value: '$_AUD', label: 'AUD (Australian Dollar)' },
	{ value: '$_SGD', label: 'SGD (Singapore Dollar)' },
	{ value: '¥_CNY', label: 'CNY (Chinese Renminbi)' },
	{ value: '₿_BTC', label: 'BTC (Bitcoin)' },
];

export const generateInvoice = async () => {
	const canvas = await html2canvas(document.querySelector('#invoiceCapture'));
	const imgData = canvas.toDataURL('image/png', 1.0);

	const pdf = new jsPDF({
		orientation: 'portrait',
		unit: 'pt',
		format: [612, 792],
	});

	pdf.internal.scaleFactor = 1;

	const imgProps = pdf.getImageProperties(imgData);
	const pdfWidth = pdf.internal.pageSize.getWidth();
	const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

	pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
	pdf.save('invoice-001.pdf');
};
