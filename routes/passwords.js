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

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const organization_id = req.cookies.user_id;
    db.query(`SELECT * FROM passwords WHERE organization_id=$1 AND id=$2;`, [organization_id, id])
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
    const organization_id = req.cookies.user_id;

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
    const organization_id = req.cookies.user_id;

    db.query(`
      UPDATE passwords
      SET website_url=$1, category=$2, username=$3, password=$4, organization_id=$5
      WHERE id=$6
      RETURNING *;
      `, [website, category, username, password, organization_id, id])
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
    console.log("body: ", req.body)
    const id = req.body.id;
    console.log("id: ", id)

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
