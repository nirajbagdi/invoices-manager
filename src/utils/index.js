import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
