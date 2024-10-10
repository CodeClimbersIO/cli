/*
 * these modules are not available on all platforms, so we have to import them conditionally
 * or we'll get build and runtime errors
 */
const getServiceLib = () => {
  const os = process.platform
  switch (os) {
    case 'darwin':
      return require('node-mac')
    case 'linux':
      return require('@codeclimbers/node-linux')
    case 'win32':
      return require('node-windows')
    default:
      throw new Error('Unsupported platform')
  }
}

export { getServiceLib }
