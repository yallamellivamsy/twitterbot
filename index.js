const { Autohook } = require('twitter-autohook');
const T = require("./src/Twit.js");
const config = require("./config");
const stream = T.stream("statuses/filter",{track: config.userName});
const Bot_ID = '2356618602';
 
(async streamingFun => {
  const webhook = new Autohook({
    token: config.twitterApp.access_token,
    token_secret: config.twitterApp.access_token_secret,
    consumer_key: config.twitterApp.consumer_key,
    consumer_secret: config.twitterApp.consumer_secret,
    env: "Dev",
    port: 5000,
  });
  
  // Removes existing webhooks
  await webhook.removeWebhooks();
  
  // Listens to incoming activity
  webhook.on('event', event => {
    //sendMessage(event);
    console.log('Something happened')
    if (event.direct_message_events) {
      postMessage(event);
  }
  });
  
  // Starts a server and adds a new webhook
  await webhook.start();
  
  // Subscribes to a user's activity
  await webhook.subscribe({oauth_token:config.twitterApp.access_token, oauth_token_secret:config.twitterApp.access_token_secret});
})();

function sendMessage(event){
  console.log('Something happened')
  if (event.direct_message_events) {
    //await sayHi(event);
    postMessage(event);
  }
}
function postMessage(event){
   // We check that the message is a direct message
   if (!event.direct_message_events) {
    return;
  }

  // Messages are wrapped in an array, so we'll extract the first element
  const message = event.direct_message_events.shift();

  console.log(message.message_create.message_data.text);
  // We check that the message is valid
  if (typeof message === 'undefined' || typeof message.message_create === 'undefined') {
    return;
  }
 
  // We filter out message you send, to avoid an infinite loop
  if (message.message_create.sender_id === Bot_ID) {
    console.log(message.message_create.sender_id)
    console.log(Bot_ID)
    console.log("Both are same")
    
    return 0;
  }
  //console.log(event);
  var senderID = message.message_create.sender_id;
  console.log(senderID);

  T.post('direct_messages/events/new', {
    event: {
        type: "message_create",
        message_create: {
            target: {
                recipient_id: senderID
            },
            message_data: {
                text: message.message_create.message_data.text
            }
        }
    }
}, (error, event)=>{
        if(error){
          console.log(error)
        }
        else{
           console.log(event);
         }
})
}