export function initPdfViewer() {
  const pdfIframe = document.getElementById('pdf-iframe');
  const pdfFallback = document.getElementById('pdf-fallback');

  if (pdfIframe) {
    pdfIframe.addEventListener('error', () => {
      pdfIframe.style.display = 'none';
      if (pdfFallback) {
        pdfFallback.style.display = 'flex';
      }
    });
  }
}