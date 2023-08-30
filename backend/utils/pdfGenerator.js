const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

async function generatePDF(jsonData) {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(JSON.stringify(jsonData, null, 2), {
      x: 50,
      y: page.getHeight() - 100,
      size: 12,
      color: rgb(0, 0, 0),
    });
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('output.pdf', pdfBytes);

    console.log('PDF generated successfully.');
  } catch (error) {
    console.log('Error:', error.message);
  }
}

const jsonData = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
};

generatePDF(jsonData);
