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

This project used to leverage alexa skill to integrate with IDP provider to verify user account and get account details informations like
 - Payment Amount
 - Payoff Quote
 - Payment Due Date
 
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

## Summary

To run this program, it requires an Alexa Skill with the code endpoint being hosted on AWS Lambda

1. Go to https://developer.amazon.com/alexa/console/ask and sign in

## Reference
https://awskarthik82.medium.com/account-linking-amazon-alexa-and-forgerock-openam-using-oauth2-authorization-grant-17a54730abc5
