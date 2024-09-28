const convertPulsesToCSV = (pulses: CodeClimbers.Pulse[]): string => {
  const header = [
    'ID',
    'User ID',
    'Entity',
    'Type',
    'Category',
    'Project',
    'Branch',
    'Language',
    'Is Write',
    'Editor',
    'Operating System',
    'Machine',
    'User Agent',
    'Time',
    'Hash',
    'Origin',
    'Origin ID',
    'Created At',
    'Description',
  ].join(',')

  const rows = pulses.map((row) =>
    [
      row.id,
      row.userId,
      row.entity,
      row.type,
      row.category,
      row.project,
      row.branch,
      row.language,
      row.isWrite,
      row.editor,
      row.operatingSystem,
      row.machine,
      row.userAgent,
      row.time,
      row.hash,
      row.origin,
      row.originId,
      row.createdAt,
      row.description,
    ]
      .map((value) => (value === null ? '' : value?.toString()))
      .join(','),
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

export default {
  convertPulsesToCSV,
  downloadBlob,
}
