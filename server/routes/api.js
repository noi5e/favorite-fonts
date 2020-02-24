const express = require("express");
let router = new express.Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");

const db = require("../../db");

router.post("/get_user_faves", (request, response) => {
  (async () => {
    const client = await db.connect();

    try {
      const jsonWebToken = request.headers.authorization.split(" ")[1];

      const userID = await jwt.verify(
        jsonWebToken,
        process.env.JWT_KEY,
        (error, decodedToken) => {
          return decodedToken.sub;
        }
      );

      const userTokenIsValidQuery = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [userID]
      );

      if (userTokenIsValidQuery.rows.length > 0) {
        const faveFontsQuery = await client.query(
          "SELECT * FROM font_likes WHERE parent_id = $1",
          [userID]
        );

        response
          .status(200)
          .send(faveFontsQuery.rows.map(font => ({ family: font.font_id })));
      } else {
        response.status(401).end();
      }
    } finally {
      client.release();
    }
  })().catch(error => {
    console.log(error);
    response.status(500).end();
  });
});

router.get("/get_all_fonts", (request, response) => {
  const fetchGoogleFonts = async () => {
    try {
      const result = await axios.get(
        "https://www.googleapis.com/webfonts/v1/webfonts",
        {
          params: {
            key: process.env.GOOGLE_FONTS_DEVELOPER_API_KEY,
            sort: "popularity"
          }
        }
      );

      response.send(
        result.data.items.map(item => ({ family: item.family, liked: false }))
      );
    } catch (error) {
      console.log("Fetching fonts from Google API: " + error);
      response
        .status(502)
        .send({ error: "Unable to fetch fonts from Google API!" });
    }
  };

  fetchGoogleFonts();
});

router.post("/toggle_font_fave", (request, response) => {
  (async () => {
    const client = await db.connect();

    try {
      const jsonWebToken = request.headers.authorization.split(" ")[1];

      const userID = await jwt.verify(
        jsonWebToken,
        process.env.JWT_KEY,
        (error, decodedToken) => {
          return decodedToken.sub;
        }
      );

      const fontName = request.body.fontName;

      const userTokenIsValidQuery = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [userID]
      );

      if (userTokenIsValidQuery.rows.length > 0) {
        const fontIsLikedQuery = await client.query(
          "SELECT * FROM font_likes WHERE parent_id = $1 AND font_id = $2",
          [userID, fontName]
        );

        if (fontIsLikedQuery.rows.length > 0) {
          await client.query(
            "DELETE FROM font_likes WHERE parent_id = $1 AND font_id = $2",
            [userID, fontName]
          );

          response.status(200).send({
            liked: false,
            font: fontName
          });
        } else {
          await client.query(
            "INSERT INTO font_likes(font_id, parent_id) VALUES($1, $2)",
            [fontName, userID]
          );

          response.status(200).send({
            liked: true,
            font: fontName
          });
        }
      } else {
        response.status(401).end();
      }
    } finally {
      client.release();
    }
  })().catch(error => {
    console.log(error);
    response.status(500).end();
  });
});

module.exports = router;
