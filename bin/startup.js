// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn } = require('child_process')

const runScript = spawn('bash', [`${process.env.CODE_CLIMBER_BIN_PATH}/run.sh`])
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
