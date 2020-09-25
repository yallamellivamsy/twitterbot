
import { Autohook } from "twitter-autohook";

const my_user_name = require("../config").userName;

export default async function initWebhook(oauth_token, oauth_token_secret) {
  try {
    const webhook = new Autohook();

    // Removes existing webhooks
    await webhook.removeWebhooks();

    // Listens to incoming activity
    webhook.on("event", event => console.log("Something happened:", event));

    // Starts a server and adds a new webhook
    await webhook.start();

    // Subscribes to a user's activity
    await webhook.subscribe({ oauth_token, oauth_token_secret });
  } catch (e) {
    console.log(e);
  }
}

  initWebhook(
    "process.env.TWITTER_2356618602-KmhsQakKPvWIjNPU4M0mexo3bCC3fXMPSi63QmI",
    "cRinIrTqhrCz7VUaVDSjkCt0C51MQyImSK4KP3936cGwI"
  );