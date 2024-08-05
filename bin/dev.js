#!/usr/bin/env node --watch --watch-path=./packages --watch-path=./bin --watch-preserve-output --loader=ts-node/esm --no-warnings
// eslint-disable-next-line node/shebang, unicorn/prefer-top-level-await
;(async () => {
  const oclif = await import('@oclif/core')
  const { exec } = await import('child_process')

  console.log('=== BUILDING CLI (build:command) ===')
  exec('npm run build:command', (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    oclif.execute({
      development: true,
      dir: __dirname,
    })
  })
})()
