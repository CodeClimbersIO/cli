/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('activities_pulse').del()
  await knex('activities_pulse').insert([
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: '',
    },
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: '<<LAST_PROJECT>>',
    },
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: 'Project',
    },
    {
      user_id: '1',
      entity: 'Unknown',
      type: 'VSCode',
      category: 'Coding',
      project: 'Project 2',
    },
  ])
}
