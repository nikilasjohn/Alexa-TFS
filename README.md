## Table of Contents

- [Summary](#summary)
- [HighLevelDesign](#highleveldesign)
- [Intents](#intents)
  * [DueDateIntent](#duedateintent)
  * [PaymentAmountIntent](#PaymentAmountIntent)
  * [LastPaymentIntent](#LastPaymentIntent)
  * [PayOffIntent](#PayOffIntent)
  * [MakeAPaymentIntent](#MakeAPaymentIntent)
- [Execution](#Execution)
- [Reference](#reference)

## Summary

This project used to leverage Alexa skill to integrate with IDP provider to verify user account and get account details informations like
 - Payment Amount
 - Payoff Quote
 - Payment Due Date

This was completed by [Nikilas John](https://www.linkedin.com/in/nikilas-john/), Femie Arasu, Tisha Arora, Anurag Diwate, [Nihal Gopalam](https://www.linkedin.com/in/nihal-gopalam/), & Andrew Mendoza in collaboration with Toyota Financial Services and UTD

## HighLevelDesign

![](https://github.com/raamc21/alexa-ask-accountlinking/blob/main/Alexa-ASK.png)

This image is still accurate, but in the process of development, we replaced OpenAM with Okta

## Intents

``
An intent represents an action that fulfills a user's spoken request. Intents can optionally have arguments called slots. Intents are specified in a JSON structure called the intent schema
``

#### DueDateIntent

``
This intent used to provide the user with the due date of their next payment
``

#### PaymentAmountIntent

``
This intent used to provide the user with the total payment amount due
``

#### LastPaymentIntent

``
This intent used to provide the user with the date of their last payment
``

#### PayOffIntent

``
This intent used to provide payoff quote information about the user account
``

#### MakeAPaymentIntent

``
This intent used to ask the user how much they would like to pay on their bill and process it
``

## Execution

To run this program, it requires a basic Alexa Skill, follow these steps below to set one up:

1. Go to https://developer.amazon.com/alexa/console/ask and sign in
2. Click the 'Create Skill' icon
3. Name your skill
4. In 'Choose a type of experience', select 'Other'
5. In 'Choose a model', select 'Custom'
6. In 'Hosting services', select 'Provision your own'
7. On the Templates page, select 'Start from Scratch'
8. Review your selections, and then create your skill

The first screen you are greeted with is the Alexa Skill Development Console. Here we will set up the Interaction Model, to do this, follow these steps:
1. Go to the 'Interaction Model' tab on the left 
2. Select 'JSON editor'.
3. Drag and drop [this file](interactionModels/custom/en-US.json). 
4. Click 'Save Model' and then 'Build Model'.

While we are here, we are going to change our Skill invocation name:
1. Go to 'Invocations' on the left
2. Select 'Skill Invocation Name'
3. Replace your skill invocation name with something unique (For example, our team used 'toyota financial services test')
4. Click 'Save Model' and then 'Build Model'.

The next step is to create the Lambda function and link it to our Alexa skill.
1. Log into Lambda with your AWS account
2. Click the 'Functions' tab on the left and click the 'Create Function' icon on the right
3. Select 'Author from scratch' 
4. Give the function a name
5. In 'Runtime', select 'Node.js 14.x'
6. Keep 'Architecture' the same
7. Click 'Create function'
8. You should be at the Function Overview screen, now click the '+ Add trigger' button
9. In 'Select a source' search for 'Alexa', select it, and enter your Skill ID at the bottom (Skill ID can be found in the 'Endpoint' section of your Alexa skill).
10. Back in the Function Overview screen, click 'Copy ARN'
11. Go back to the Alexa Skill Development Console for your skill, and select 'Endpoint' on the left
12. Paste your Lambda function ARN into the 'Default Region' box
13. Click 'Save endpoints' at the top

After this, we now have to add our code to Lambda, so go to the overview screen of our Lambda function
1. In the 'Code' tab at the bottom, click 'Upload from' on the right and upload the ['lambdaZIP'](lambdaZIP.zip) file

Next, set up your Okta account linking with Alexa, and to do this, please follow these instructions:
1. On the 'Build' tab of the Alexa Development Console, click the 'Account linking' tab at the bottom left
2. Enable the 'Do you allow users to create an account or link to an existing account with you?' option at the top
3. Enter 'Your Web Authorization URI', 'Access Token URI', 'Your Client ID', and 'Your Secret'
4. Click 'Save' at the top

Finally, we can test the application:
1. Go to the 'Test' tab
2. On 'Skill testing is enabled in:', change this to 'Development'
3. In the Alexa Simulator box, type "open toyota financial services test"
4. If the response was "You need to link your TFS account and your Amazon account to use this skill.", this is expected and the setup is complete

## Reference
https://developer.okta.com/blog/2019/03/20/linking-your-alexa-skils-securely

