const express = require('express');
const { cookie } = require('request');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const organization_id = req.cookies.user_id;
    db.query(`SELECT * FROM passwords WHERE organization_id=$1;`, [organization_id])
      .then(data => {
        const passwords = data.rows;
        res.json({ passwords });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const website = req.body.website;
    const category = req.body.category;
    const username = req.body.username;
    const password = req.body.password;

    // Need to grab organization_id from cookie
    const organization_id = 1;

    db.query(`
      INSERT INTO passwords (organization_id, website_url, category, username, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `
      , [organization_id, website, category, username, password])
      .then(data => {
        const passwords = data.rows;
        res.json({ passwords });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/delete", (req, res) => {

    // Need to grab organization_id from cookie
    const organization_id = 1;

    db.query(`
      DELETE FROM passwords WHERE id=$1
      `, [id])
      .then(data => {
        const passwords = data.rows;
        res.json({ passwords });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;

};
