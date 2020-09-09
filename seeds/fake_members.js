
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('members').del()
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {id: 1, address: '123456', role: 'admin'},
        {id: 2, address: '234567', role: 'members'}
      ]);
    });
};
