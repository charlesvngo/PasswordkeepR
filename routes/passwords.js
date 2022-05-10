const express = require('express');
const { cookie } = require('request');
const router  = express.Router();

module.exports = (db) => {

    router.get("/:id", (req, res) => {
      const id = req.params.id;
      console.log("id: ", id);
      db.query(`SELECT * FROM passwords WHERE id=$1;`, [id])
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

  router.get("/", (req, res) => {
    const user_id = req.cookies.user_id;
    db.query(
      `SELECT passwords.id AS id, organizations.id AS organization_id, username, password, website_url, category
      FROM passwords
      JOIN organizations ON organizations.id = passwords.organization_id
      JOIN users ON organizations.id = users.organization_id
      WHERE users.id=$1;`, [user_id])
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
    console.log("req.body: ", req.body)

    // Need to fix this
    const organization_id = req.body.organization_id;

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

  router.post("/edit", (req, res) => {

    const website = req.body.website;
    const category = req.body.category;
    const username = req.body.username;
    const password = req.body.password;
    const id = req.body.id;

    db.query(`
      UPDATE passwords
      SET website_url=$1, category=$2, username=$3, password=$4
      WHERE id=$5
      RETURNING *;
      `, [website, category, username, password, id])
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

    // Need to grab the unqiue password id, hardcoded for now
    const id = req.body.id;

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
