import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Export a DOM element as PNG
export async function exportAsPNG(elementId, filename = "family-tree.png") {
  const element = document.getElementById(elementId);
  if (!element) return;
  const canvas = await html2canvas(element);
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
}

// Export a DOM element as PDF
export async function exportAsPDF(elementId, filename = "family-tree.pdf") {
  const element = document.getElementById(elementId);
  if (!element) return;
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
  const imgWidth = canvas.width * ratio;
  const imgHeight = canvas.height * ratio;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
}
