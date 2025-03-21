export class PrintService {
  // 打印单个文档
  static async printDocument(element: HTMLElement) {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>打印文档</title>
          <style>
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              @page {
                margin: 0;
                size: A4;
              }
            }
          </style>
        </head>
        <body>
          ${element.outerHTML}
        </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
    printWindow.close()
  }

  // 批量打印
  static async printMultiple(element: HTMLElement, copies: number) {
    for (let i = 0; i < copies; i++) {
      await this.printDocument(element)
    }
  }
}