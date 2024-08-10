const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const creds = require("../creds.json");

const allowedDomain = "telusinternational.com";

const oauth2Client = new google.auth.OAuth2(
  (CLIENT_ID = creds.web.client_id),
  (CLIENT_SECRET = creds.web.client_secret),
  (REDIRECT_URI = creds.web.redirect_uri)
);

router.get("/auth", (req, res) => {
  const redirectUrl = req.query.redirectUrl || "/"; // Default to root if no redirectUrl provided
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    hd: allowedDomain,
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    state: redirectUrl, // Pass the redirect URL as state
  });
  res.send(url);
});

router.get("/redirect", async (req, res) => {
  const code = req.query;
  const authDetails = {
    code: decodeURIComponent(code.code),
    scope: decodeURIComponent(code.scope),
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
