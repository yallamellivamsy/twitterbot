const { Autohook } = require('twitter-autohook');
const T = require("./src/Twit.js");
const stream = T.stream("statuses/filter",{track: '@yallamellivamsy'});
const Bot_ID = '2356618602';
 
(async streamingFun => {
  const webhook = new Autohook({
    token: '2356618602-KmhsQakKPvWIjNPU4M0mexo3bCC3fXMPSi63QmI',
    token_secret: 'cRinIrTqhrCz7VUaVDSjkCt0C51MQyImSK4KP3936cGwI',
    consumer_key: "Y52FlgacfLPWHrbNWkuldzPGh",
    consumer_secret: "Raxul13dTIzWYCkjPIvXqvFXC9TzmmXqEMUONr7UytxCSa32Ko",
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
      //const senderScreenName = event.users[message.message_create.sender_id].screen_name;

    /*  const requestConfig = {
        url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
        oauth: {
          token: '2356618602-KmhsQakKPvWIjNPU4M0mexo3bCC3fXMPSi63QmI',
          token_secret: 'cRinIrTqhrCz7VUaVDSjkCt0C51MQyImSK4KP3936cGwI',
          consumer_key: "Y52FlgacfLPWHrbNWkuldzPGh",
          consumer_secret: "Raxul13dTIzWYCkjPIvXqvFXC9TzmmXqEMUONr7UytxCSa32Ko",
          env: "Dev",
          port: 5000,
        },
        json: {
          event: {
            type: 'message_create',
            message_create: {
              target: {
                recipient_id: 475032641,
              },
              message_data: {
                text: `Hi! 👋`,
              },
            },
          },
        },
      };
      await post(requestConfig);*/
      postMessage(event);
  }
  });
  
  // Starts a server and adds a new webhook
  await webhook.start();
  
  // Subscribes to a user's activity
  await webhook.subscribe({oauth_token:"2356618602-KmhsQakKPvWIjNPU4M0mexo3bCC3fXMPSi63QmI", oauth_token_secret:"cRinIrTqhrCz7VUaVDSjkCt0C51MQyImSK4KP3936cGwI"});
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