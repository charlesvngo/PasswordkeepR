const express = require('express');
const { cookie } = require('request');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user_id = req.cookies.user_id;
    let query = `SELECT organizations.id FROM organizations JOIN users ON organizations.id = organization_id WHERE users.id=$1;`
    console.log(query);
    db.query(query, [user_id])
      .then(data => {
        const organization_id = data.rows;
        res.json({ organization_id });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
