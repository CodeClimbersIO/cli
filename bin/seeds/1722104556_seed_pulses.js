/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const timestamp = Math.floor(new Date().getTime() / 1000)
  const sixteenMinutes = 16 * 60
  // Deletes ALL existing entries
  await knex('activities_pulse').del()
  await knex('activities_pulse').insert([
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: '',
      time: timestamp,
    },
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: '<<LAST_PROJECT>>',
      time: timestamp,
    },
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: 'Project',
      time: timestamp - sixteenMinutes,
    },
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: 'Project 2',
      time: timestamp,
    },
  ])
}
