const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

async function generatePDF(jsonData) {
  try {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a new page
    const page = pdfDoc.addPage([600, 400]);

    // Embed JSON data onto the PDF page
    page.drawText(JSON.stringify(jsonData, null, 2), {
      x: 50,
      y: page.getHeight() - 100,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Write the PDF to a file
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
  // ...other data
};

generatePDF(jsonData);
