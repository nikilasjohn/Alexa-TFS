## Table of Contents

- [Summary](#summary)
- [HighLevelDesign](#highleveldesign)
- [Intents](#intents)
  * [AccessTokenIntent](#accesstokenintent)
  * [WelcomeIntent](#welcomeintent)
  * [AccountSummaryIntent](#accountsummaryintent)
  * [payoffquoteintent](#payoffquoteintent)
  * [paymentdueintent](#paymentdueintent)
- [Reference](#reference)

## Summary

This project used to leverage alexa skill to integrate with IDP provider to verify user account and get account details informations like
 - Account Summary
 - Payoff Quote
 - Payment Due
 
## HighLevelDesign

![](https://github.com/raamc21/alexa-ask-accountlinking/blob/main/Alexa-ASK.png)

## Intents

``
An intent represents an action that fulfills a user's spoken request. Intents can optionally have arguments called slots. Intents are specified in a JSON structure called the intent schema
``

#### AccessTokenIntent

``
This intent used to integrate forgerock open AM for user identity verification
``

#### WelcomeIntent

``
This intent used to address welcome name with customer first name and last name
``

#### AccountSummaryIntent

``
This intent used to provide account summary information about the user and provides balance history , next payment date, payment due etc
``

#### PayOffQuoteIntent

``
This intent used to provide payoff quote information about the user account
``

#### PaymentDueIntent

``
This intent used to provide next payment due date and amount for the user
``


## Reference
https://awskarthik82.medium.com/account-linking-amazon-alexa-and-forgerock-openam-using-oauth2-authorization-grant-17a54730abc5
