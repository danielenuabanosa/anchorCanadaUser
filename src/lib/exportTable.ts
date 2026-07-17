import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export type ExportFormat = 'CSV' | 'Excel' | 'PDF'
export type ExportFormatKey = 'csv' | 'excel' | 'pdf'

export type ExportCell = string | number | null | undefined
export type ExportRow = ExportCell[]

function cellText(value: ExportCell): string {
  return value == null ? '' : String(value)
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function stripExtension(filename: string) {
  return filename.replace(/\.(csv|xlsx|xls|pdf)$/i, '')
}

function withExtension(filename: string, ext: string) {
  return `${stripExtension(filename)}.${ext}`
}

function escapeCsv(value: ExportCell) {
  const raw = cellText(value)
  if (/[",\n\r]/.test(raw)) return `"${raw.replace(/"/g, '""')}"`
  return raw
}

export function toExportFormat(format: ExportFormat | ExportFormatKey): ExportFormat {
  if (format === 'csv' || format === 'CSV') return 'CSV'
  if (format === 'excel' || format === 'Excel') return 'Excel'
  return 'PDF'
}

/** Download a tabular dataset as CSV. */
export function downloadCsv(filename: string, headers: string[], rows: ExportRow[]) {
  const lines = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => headers.map((_, i) => escapeCsv(row[i])).join(',')),
  ]
  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
  triggerDownload(blob, withExtension(filename, 'csv'))
}

/** Download a tabular dataset as a real Excel workbook (.xlsx). */
export function downloadExcel(
  filename: string,
  headers: string[],
  rows: ExportRow[],
  sheetName = 'Export',
) {
  const data = [headers, ...rows.map((row) => headers.map((_, i) => cellText(row[i])))]
  const worksheet = XLSX.utils.aoa_to_sheet(data)

  worksheet['!cols'] = headers.map((header, colIndex) => {
    const maxLen = Math.max(
      header.length,
      ...rows.map((row) => cellText(row[colIndex]).length),
    )
    return { wch: Math.min(Math.max(maxLen + 2, 12), 48) }
  })

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31) || 'Export')
  const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }) as ArrayBuffer
  const blob = new Blob([arrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  triggerDownload(blob, withExtension(filename, 'xlsx'))
}

/** Download a tabular dataset as a multi-page PDF table. */
export function downloadPdf(
  filename: string,
  headers: string[],
  rows: ExportRow[],
  options?: { title?: string },
) {
  const title = options?.title?.trim() || stripExtension(filename).replace(/[-_]/g, ' ')
  const orientation = headers.length > 5 ? 'landscape' : 'portrait'
  const doc = new jsPDF({ orientation, unit: 'pt', format: 'a4' })
  const margin = 40

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(15, 23, 42)
  doc.text(title, margin, 36)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(68, 81, 106)
  doc.text(
    `Generated ${new Date().toLocaleString()} · ${rows.length} row${rows.length === 1 ? '' : 's'}`,
    margin,
    52,
  )

  autoTable(doc, {
    startY: 64,
    head: [headers],
    body: rows.map((row) => headers.map((_, i) => cellText(row[i]))),
    styles: {
      font: 'helvetica',
      fontSize: 8,
      cellPadding: 5,
      textColor: [15, 23, 42],
      lineColor: [217, 225, 239],
      lineWidth: 0.4,
      overflow: 'linebreak',
      valign: 'middle',
    },
    headStyles: {
      fillColor: [47, 102, 200],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: margin, right: margin, top: margin, bottom: margin },
    didDrawPage: (data) => {
      const pageCount = doc.getNumberOfPages()
      doc.setFontSize(8)
      doc.setTextColor(140, 151, 173)
      doc.text(
        `Page ${data.pageNumber} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - margin,
        doc.internal.pageSize.getHeight() - 18,
        { align: 'right' },
      )
    },
  })

  doc.save(withExtension(filename, 'pdf'))
}

/** Download the same table in CSV, Excel, or PDF based on format. */
export function downloadTableExport(
  format: ExportFormat | ExportFormatKey,
  filename: string,
  headers: string[],
  rows: ExportRow[],
  options?: { title?: string; sheetName?: string },
) {
  const normalized = toExportFormat(format)
  if (normalized === 'Excel') {
    downloadExcel(filename, headers, rows, options?.sheetName ?? options?.title ?? 'Export')
    return
  }
  if (normalized === 'PDF') {
    downloadPdf(filename, headers, rows, { title: options?.title })
    return
  }
  downloadCsv(filename, headers, rows)
}
