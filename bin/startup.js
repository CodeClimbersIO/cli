// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process')

exec('bash $CODE_CLIMBER_BIN_PATH/run.sh', function (error, stdout, stderr) {
  console.log('stdout: ' + stdout)
  console.log('stderr: ' + stderr)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
