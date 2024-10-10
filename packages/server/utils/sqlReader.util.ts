import { readFile } from 'fs/promises'
import { dirname, join } from 'path'

// Initialize a cache object
const cache: Record<string, string> = {}

// Utility function to read file content and return it as a string
const getFileContentAsString = async (
  fileName: string,
  additionalPath = 'queries',
) => {
  try {
    // Dynamically determine the directory of the caller
    // Create a new Error and use its stack trace
    const err = new Error()
    const stack = err.stack || ''
    // Find the second entry in the stack trace, which should correspond to the caller
    const caller = stack.split('\n')[2] || ''
    // Extract the file path from the caller string
    const match = caller.match(/\((?:file:\/\/)?(.*?):\d+:\d+\)$/)
    if (!match) {
      throw new Error('Could not determine caller file path')
    }
    const callerPath = match[1]
    const callerDir = dirname(callerPath)

    // Generate a unique cache key based on the caller directory and file name
    const cacheKey = `${callerDir}:${additionalPath}:${fileName}`

    // Check if the result is already in the cache
    if (cache[cacheKey]) {
      return cache[cacheKey] // Return the cached result
    }

    // Resolve the file path relative to the caller file's directory
    const resolvedPath = join(callerDir, additionalPath, fileName)
    // Read and return the file content
    const content = await readFile(resolvedPath, 'utf8')
    cache[cacheKey] = content // Store the result in the cache
    return content
  } catch (error) {
    console.error('Error reading file:', error)
    throw error // Re-throw the error to handle it in the calling function
  }
}

export { getFileContentAsString }
