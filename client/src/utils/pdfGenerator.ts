import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'

export class PDFGenerator {
  private doc: jsPDF

  constructor() {
    this.doc = new jsPDF()
  }

  // 添加页面到PDF
  async addPage(element: HTMLElement) {
    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL('image/png')
    this.doc.addImage(imgData, 'PNG', 0, 0, 210, 297)
    this.doc.addPage()
  }

  // 合并多个PDF
  async mergePDFs(pdfs: ArrayBuffer[]) {
    // TODO: 实现PDF合并功能
  }

  // 生成最终PDF
  async generate(filename: string = 'document.pdf') {
    this.doc.save(filename)
  }
}