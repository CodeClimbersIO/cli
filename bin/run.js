#!/usr/bin/env node
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
;(async () => {
  const oclif = await import('@oclif/core')
  await oclif.execute({ dir: __dirname })
})()
