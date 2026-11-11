import * as pdfjsLib from 'pdfjs-dist';

// Configure pdfjs worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const tokenizedText = await page.getTextContent();
        const pageText = tokenizedText.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n\n';
      }

      if (fullText.trim().length > 30) {
        return fullText.trim();
      }
    } catch (e) {
      console.warn('PDF.js parsing error, attempting text fallback:', e);
    }
  }

  // Fallback for plain text, doc, or if pdfjs worker hits an issue
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        // Strip out non-printable ASCII noise if raw binary file was read
        const cleanContent = content.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
        resolve(cleanContent);
      } else {
        reject(new Error('Unable to read file content.'));
      }
    };
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsText(file);
  });
}
