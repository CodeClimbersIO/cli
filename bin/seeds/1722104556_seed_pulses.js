/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const timestamp = Math.floor(new Date().getTime() / 1000)
  const sixteenMinutes = 16 * 60
  await knex('activities_pulse').del()

  const NOW = new Date()
  const TWO_MINUTES_AGO = new Date(NOW.getTime() - 2 * 60 * 1_000)
  const TWO_HOURS_AGO = new Date(NOW.getTime() - 2 * 60 * 60 * 1_000)

  const ONE_DAY_AGO = new Date(NOW.getTime() - 24 * 60 * 60 * 1_000)
  ONE_DAY_AGO.setHours(0, 0, 0, 0)
  const THREE_DAYS_AGO = new Date(NOW.getTime() - 3 * 24 * 60 * 60 * 1_000)
  THREE_DAYS_AGO.setHours(0, 0, 0, 0)
  const FIVE_DAYS_AGO = new Date(NOW.getTime() - 5 * 24 * 60 * 60 * 1_000)
  FIVE_DAYS_AGO.setHours(0, 0, 0, 0)

  const createPulse = (args) => ({
    user_id: '1',
    entity: 'Unknown',
    type: 'VSCode',
    user_agent: 'unknown',
    category: 'Coding',
    project: 'Project',
    time: TWO_MINUTES_AGO.toISOString(),
    created_at: args.time ?? TWO_MINUTES_AGO.toISOString(),
    ...args,
  })

  const CHOME_ACTIVIES = 12
  const VSCODE_ACTIVITES = 12

  const pulses = [
    createPulse({ entity: 'NEW', project: '', time: NOW.toISOString() }),
    createPulse({
      entity: 'NEW',
      project: '<<LAST_PROJECT>>',
      time: NOW.toISOString(),
    }),
  ]

  for (let i = 0; i < CHOME_ACTIVIES; i++) {
    pulses.push(
      createPulse({
        type: 'Chome',
        category: 'Browsing',
        project: 'Top Secret',
        user_agent: 'chrome-chrome_extension',
        time: THREE_DAYS_AGO.toISOString(),
      }),
    )
  }

  for (let i = 0; i < VSCODE_ACTIVITES; i++) {
    pulses.push(
      createPulse({
        type: 'VSCode',
        category: 'Coding',
        project: 'Top Secret',
        user_agent: 'vscode',
        time: ONE_DAY_AGO.toISOString(),
      }),
    )
  }

  for (let i = 0; i < 15; i++) {
    pulses.push(createPulse({ time: TWO_HOURS_AGO.toISOString() }))
  }

  for (let i = 0; i < 10; i++) {
    pulses.push(createPulse({ time: ONE_DAY_AGO.toISOString() }))
  }

  for (let i = 0; i < 30; i++) {
    pulses.push(createPulse({ time: THREE_DAYS_AGO.toISOString() }))
  }

  for (let i = 0; i < 20; i++) {
    pulses.push(createPulse({ time: FIVE_DAYS_AGO.toISOString() }))
  }

  pulses.push(
    createPulse({
      entity: 'NEW',
      project: 'Latest Project',
      time: NOW.toISOString(),
    }),
  )

  await knex('activities_pulse').insert(pulses)
}
