// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertRecordsToCSV = (records: Record<string, any>[]): string => {
  console.log('records', records)
  const header = Object.keys(records[0]).join(',')
  const rows = records.map((row) =>
    Object.values(row).map((value) =>
      value === null ? '' : value?.toString(),
    ),
  )

  return [header, ...rows].join('\n')
}

const downloadBlob = (blob: Blob, filename = 'data.csv') => {
  const encodedUri = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = encodedUri
  a.download = filename
  a.click()
  window.URL.revokeObjectURL(encodedUri)
}

export { convertRecordsToCSV, downloadBlob }
