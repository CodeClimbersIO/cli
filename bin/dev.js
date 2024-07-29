#!/usr/bin/env node --watch --watch-path=./src --watch-path=./bin --loader=ts-node/esm
// eslint-disable-next-line node/shebang, unicorn/prefer-top-level-await
;(async () => {
  const oclif = await import('@oclif/core')
  await oclif.execute({ development: true, dir: __dirname })
})()
