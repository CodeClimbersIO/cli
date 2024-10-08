// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn } = require('child_process')

// node is often not in path for the service process
process.env.PATH = `${process.env.PATH}:${process.env.NODE_PATH}`

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  console.log('DEVELOPMENT: Starting the server')
  console.log(`process.env: ${JSON.stringify(process.env)}`)
}

isProduction
  ? spawn('npx', ['codeclimbers@latest', 'start', 'server'], {
      shell: true,
      stdio: 'inherit',
    })
  : spawn(
      'node',
      [`${process.env.CODE_CLIMBER_BIN_PATH}/run.js`, 'start', 'server'],
      {
        shell: true,
        stdio: 'inherit',
      },
    )
