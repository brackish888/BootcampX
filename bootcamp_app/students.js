const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '1234',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE '${process.argv[2]}%'
LIMIT ${process.argv[3]};`)
  .then(res => {
    for (const student of res.rows)
      console.log(`${student.name} has an id of ${student.id} and was in the ${student.cohort} cohort`);
  })
  .catch(err => console.error('query error', err.stack));