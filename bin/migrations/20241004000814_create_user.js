exports.up = function(knex) {
  return knex.transaction(async (trx) => {
    // Insert into accounts_user
    await trx('accounts_user').insert({});
    const [row] = await trx.raw('SELECT last_insert_rowid() as id');
    const userId = row.id;
    // Insert into accounts_user_settings
    await trx('accounts_user_settings').insert({
      user_id: userId
    });
  });
};

exports.down = function(knex) {
  // return knex.transaction(async (trx) => {
  //   // Remove the last inserted user_settings
  //   await trx('accounts_user_settings')
  //     .where('user_id', knex.raw('(SELECT MAX(id) FROM accounts_user)'))
  //     .del();

  //   // Remove the last inserted user
  //   await trx('accounts_user')
  //     .where('id', knex.raw('(SELECT MAX(id) FROM accounts_user)'))
  //     .del();
  // });
};