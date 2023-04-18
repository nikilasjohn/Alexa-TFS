/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require("ask-sdk-core");

const https = require('https');
let aToken = null;

const getRemoteData = (url) => new Promise((resolve, reject) => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer token',
      'Accept': '*/*'
    }
  };

  https.get(url, options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      resolve(JSON.parse(data));
    });
  }).on('error', (error) => {
    reject(error);
  });
});

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    
    async handle(handlerInput) {
        
        // This will get the accessToken from Forgerock
        aToken = handlerInput.requestEnvelope.context.System.user.accessToken;
        
        // Logs the accessToken response
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~${aToken}`);
        
        if (!aToken || aToken === '') {
          // If the access token is empty or undefined, return an error response
          return handlerInput.responseBuilder
            .speak('You need to link your TFS account and your Amazon account to use this skill.')
            .withLinkAccountCard()
            .getResponse();
        }
        else {
            const speakOutput = `Welcome to Toyota Financial Services Alexa skill, you can say when was my last payment or Help. Which would you like to try?`;
    
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

/*** This is where our custom intent handlers located
 * 
 ***/
 
const PayOffIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PayOffIntent';
    },
    async handle(handlerInput) {
    let speakOutput = 'This is the default message.';
    
    // Replace link with TFS API endpoint
    await getRemoteData('https://anypoint.mulesoft.com/mocking/api/v1/links/28cfbdf9-717f-42f8-a9d6-283e66c9f6af/financial-account-lookup/account?accountNumber=123')
      .then((data) => {
          console.log(data);
          speakOutput = `Your current payoff balance is ${data.currentPayoffAmount}.`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const PaymentAmountIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PaymentAmountIntent';
    },
    
    async handle(handlerInput) {
    let speakOutput = 'This is the default message.';
    
    // Replace link with TFS API endpoint
    await getRemoteData('https://anypoint.mulesoft.com/mocking/api/v1/links/28cfbdf9-717f-42f8-a9d6-283e66c9f6af/financial-account-lookup/account?accountNumber=123')
      .then((data) => {
          speakOutput = `Your current payment amount is ${data.totalPaymentDueAmount}.`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
}; 

const DueDateIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DueDateIntent';
    },
    async handle(handlerInput) {
    let speakOutput = 'This is the default message.';
    
    // Replace link with TFS API endpoint
    await getRemoteData('https://anypoint.mulesoft.com/mocking/api/v1/links/28cfbdf9-717f-42f8-a9d6-283e66c9f6af/financial-account-lookup/account?accountNumber=123')
      .then((data) => {
          speakOutput = `Your due date for your current bill is ${data.closeOutDate}.`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
}; 


const LastPaymentIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LastPaymentIntent';
    },
    async handle(handlerInput) {
    let speakOutput = 'This is the default message.';
    // Replace link with TFS API endpoint
    await getRemoteData('https://anypoint.mulesoft.com/mocking/api/v1/links/28cfbdf9-717f-42f8-a9d6-283e66c9f6af/financial-account-lookup/account?accountNumber=123')
      .then((data) => {
          speakOutput = `Your last payment amount was ${data.lastPaymentAmount}.`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


// Register the handlers and make them ready for use in Lambda
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    PayOffIntentHandler,
    PaymentAmountIntentHandler,
    DueDateIntentHandler,
    LastPaymentIntentHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(
    ErrorHandler)
  .lambda();