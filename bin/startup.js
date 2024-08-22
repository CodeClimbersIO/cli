// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn } = require('child_process')

// node is often not in path for the service process
process.env.PATH = `${process.env.PATH}:${process.env.NODE_PATH}`

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  console.log('DEVELOPMENT: Starting the server')
  console.log(`process.env: ${JSON.stringify(process.env)}`)
}

const runScript = isProduction
  ? spawn('npx', ['codeclimbers', 'start', 'server'], {
      shell: true,
    })
  : spawn('node', [
      `${process.env.CODE_CLIMBER_BIN_PATH}/run.js`,
      'start',
      'server',
    ])

runScript.stdout.on('data', (data) => {
  process.stdout.write(data)
})

runScript.stderr.on('data', (data) => {
  process.stderr.write(data)
})

runScript.on('close', (code) => {
  console.log(`Child process exited with code ${code}`)
})

runScript.on('error', (error) => {
  console.error(`Error executing the script: ${error.message}`)
})
