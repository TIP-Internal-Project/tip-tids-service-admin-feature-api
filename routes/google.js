const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  (CLIENT_ID = process.env.CLIENT_ID),
  (CLIENT_SECRET = process.env.CLIENT_SECRET),
  (REDIRECT_URI = process.env.REDIRECT_URI)
);

router.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  res.send(url);
});

router.get("/redirect", async (req, res) => {
  const code = req.query;
  const authDetails = {
    code: decodeURIComponent(code.code),
    scope: decodeURIComponent(code.scope).replaceAll("+", " "),
    authuser: code.authUser,
    hd: code.hd,
    prompt: code.prompt,
  };
  const token = await oauth2Client.getToken(authDetails);
  const access_token = JSON.parse(JSON.stringify(token)).tokens.access_token;
  const refresh_token = JSON.parse(JSON.stringify(token)).tokens.refresh_token;
  res.send({ access_token: access_token, refresh_token: refresh_token });
});

router.post("/getUserInfo", (req, res) => {
  oauth2Client.setCredentials(req.body);
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  oauth2.userinfo.get((err, response) => {
    if (err) res.status(400).send(err);
    if (response != null) {
      res.send(response.data);
    }
  });
});

module.exports = router;
