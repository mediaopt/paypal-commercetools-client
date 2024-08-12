# PayPal client app

This is a client app to integrate PayPal payment methods and package tracking into commercetools-based shop. It is dedicated to be used with [PayPal commercetools connector](https://github.com/mediaopt/paypal-commercetools-connector). An integration example in a commercetools frontend demo shop can be found in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration) and viewed at https://poc-mediaopt2.frontend.site. 

Some additional details on the integration of the client are also provided in the [docs folder on github](https://github.com/mediaopt/paypal-commercetools-client/tree/main/docs).

The client app is built with React and uses the [PayPal JS SDK](https://developer.paypal.com/sdk/js/).

In here we explain how to use the client app and get payment methods to work.

## Installation
Please refer to the [connector documentation](https://github.com/mediaopt/paypal-commercetools-connector) for the installation of the connector and if you use commercetools frontend for your storefront refer to [commercetools official documentation](https://commercetools.com/products/frontend). 

The client can be directly installed to the shop frontend using npm:

`npm i paypal-commercetools-client`

The client is react-based, so for other frameworks it is needed to load the React script in project stack.

And then the components are imported directly from the package, see for example the [payment form in CoFe integration](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/frontend/components/commercetools-ui/checkout/checkout-form/fields/formPayment.tsx).

## Usage

The client app provides a set of components to handle different payment methods. The components accept a set of props to configure the payment process. The general properties are the same for all payment methods, while some payment methods have also own specific properties. 

### General properties

#### API endpoints

For all Api endpoints it is **your** responsibility to develop this API. These endpoints are responsible for communication with commercetools backend. Our implementation can be found in the [CoFe integration example repository controllers folder](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/). The return types are provided in the [client types folder](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts).

| Property          | Type/request type | Request response                                                                                                | Description                                                                                               | Our implementation                                                                                                                                                            |
|-------------------|-------------------|-----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| createPaymentUrl  | string /POST      | [_CreatePaymentResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts) | The url that gets called to the endpoint of the connect app to create a payment in commercetools.         | [createPayment](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)        |
| getSettingsUrl    | string /POST      | [_GetSettingsResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)   | The url that gets called to the endpoint of the connect app to get settings of PayPal in commercetools.   | [getPayPalSettings](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/SettingsController.ts)  |
| createOrderUrl    | string /POST      | [_CreateOrderResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)   | The url that gets called to the endpoint of the connect app to create a PayPal order in commercetools.    | [createPayPalOrder](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)    |    
| onApproveUrl      | string /POST      | [_OnApproveResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)     | The url that gets called to the endpoint of the connect app to capture a PayPal order in commercetools.   | [capturePayPalOrder](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)   |
| authorizeOrderUrl | string /POST      | [_OnApproveResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)     | The url that gets called to the endpoint of the connect app to authorize a PayPal order in commercetools. | [authorizePayPalOrder](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts) |


#### other general properties
- **onApproveRedirectionUrl**: `string`
    If you want to redirect to a page in onApprove step then set it to this property. It is useful for the `buy now` process and its review page.
- **cartInformation**: `object`  
  Information about the customers cart to crate payments with.
  Structure:

  ```
  account: {
    email: string;
  };
  billing: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    city: string;
    country: string;
    postalCode: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    city: string;
    country: string;
    postalCode: string;
  };
  ```

- **purchaseCallback**: `(result: any) => void`  
   Function to execute after a successful purchase.
- **requestHeader**: `object`
  Information that you want to send to the server as a header.
  Structure for CoFe:

  ```
  "Frontastic-Session": string;
  "Commercetools-Frontend-Extension-Version": string;
  ```

- **shippingMethodId**: `string`  
  The id of the selected shipping. It will be sent back in the create purchase call to calculate the correct shipping costs.

- **options**: `object`
  options will pass to PayPalScriptProvider component and you can see the structure on PayPal documentation. [_ReactPayPalScriptOptions_](https://github.com/paypal/react-paypal-js/blob/main/src/types/scriptProviderTypes.ts).

### Vaulting properties

These properties are used when you want to set up vaulting during purchase.

- **enableVaulting**: `boolean`  
  Set `true` if you want to enable vaulting in the payment method.

- **getUserInfoUrl**: `string`  
   _POST_-Request - we get a [_GetUserInfoResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)  
   It is **your** responsibility to develop this API  
   The URL that gets called to the endpoint of the connect app to get some information related to vaulting for the logged-in user. Communicates with commercetools backend  
   See getUserInfo in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

#### Vaulting for purchase later

In addition to `Vaulting properties` we have the following properties to vault for purchase later.

- **createVaultSetupTokenUrl**: `string`  
   _POST_-Request - we get a [_CreateVaultSetupTokenResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)  
   It is **your** responsibility to develop this API  
   The URL that gets called to the endpoint of the connect app to create a vault setup token for the logged-in user. Communicates with commercetools backend  
   See createVaultSetupToken in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

- **approveVaultSetupTokenUrl**: `string`  
   _POST_-Request - we get a [_ApproveVaultSetupTokenResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)  
   It is **your** responsibility to develop this API  
   The URL that gets called to the endpoint of the connect app to approve a vault setup token for the logged-in user. Communicates with commercetools backend  
   See approveVaultSetupToken in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

### Payment specific properties

In addition, each payment component comes with its own specific properties.

#### PayPal

PayPal components props are based on PayPal props and you can see them on PayPal official documentation [_PayPalButtonsComponentOptions_](https://github.com/paypal/react-paypal-js/blob/main/src/types/paypalButtonTypes.ts).

- **paypalMessages**: `object`
  Pass this object here if you want to show the `PayPal Messages` in the PayPal component. In order to see the structure check the parameters of `PayPalMessages`.

#### PayPalMessages

PayPal messages props are based on PayPalMessages props and you can see them on PayPal official documentation [_PayPalMessagesComponentOptions_](https://github.com/paypal/react-paypal-js/blob/main/src/components/PayPalMessages.tsx).

#### ApplePay

- **applePayDisplayName**: `string`  
   Name of your store.

#### GooglePay

Have a look at [Google's specification](https://developers.google.com/pay/api/web/reference/request-objects) for a detailed explanation of the options

- **environment**: `string`  
   "TEST" or "PRODUCTION";
- **allowedCardNetworks**: `string[]`
  One or more card networks that you support, also supported by the Google Pay API.
- **allowedCardAuthMethods**: `string`  
   "PAN_ONLY" (cards on file) and "CRYPTOGRAM_3DS" (Android powered device token)
- **callbackIntents**: `string[]`  
   Specifies intents for PaymentDataCallback
- **apiVersion**: `number`  
   Major API version
- **apiVersionMinor**: `number`  
   Minor API version
- **totalPriceStatus**: `string`  
   "FINAL" or "ESTIMATED"
- **buttonColor**: `string`
- **buttonType**: `string`
- **buttonRadius**: `number`
- **buttonSizeMode**: `string`
- **verificationMethod**: `string`

#### CardFields

- **authenticateThreeDSOrderUrl**: `string`
  _POST_-Request
  Communicates with commercetools backend to get the 3d Secure validation results and returns an object with the _liability_shift_, _enrollment_status_, and _authentication_status_.  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

#### HostedFields

HostedFields are deprecated; CardFields is the preferred way to use advanced card payments.

- **getClientTokenUrl**: `string`  
  _POST_-Request - we get a [_ClientTokenResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The URL that gets called to the endpoint of the connect app to get the client token to use in PayPalHostedFieldsProvider component in commercetools. Communicates with commercetools backend  
  See getClientToken in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

#### PaymentTokens

If you want to get a list of vaulted payments you can use this component. It will also give you the avility to remove the vaulted account.

You need to pass properties that are mentioned in the `Vaulting properties` section and also pass the following specific property.

- **removePaymentTokenUrl**: `string`  
  _POST_-Request - we get a [_GetUserInfoResponse_](https://github.com/mediaopt/paypal-commercetools-client/blob/main/src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The URL that gets called to the endpoint of the connect app to remove a `Payment Token` in the PaymentTokens component in commercetools. Communicates with commercetools backend  
  See removePaymentToken in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

#### PayUponInvoice

It is **your** responsibility [to check the eligibility and enable Pay upon Invoice with Ratepay](https://developer.paypal.com/docs/checkout/apm/pay-upon-invoice/#link-eligibility) in the PayPal business account.

You need to pass general properties and also pass the following specific properties:

- **merchantId**: `string`  
  Identifier of the merchant, can be found in PayPal Account Settings > Business Information > PayPal Merchant ID.
- **pageId**: `string`
  Describes the type of the page at which checkout is called, the supported values can be found at [Modify the code](https://developer.paypal.com/docs/checkout/apm/pay-upon-invoice/fraudnet/#link-modifythecode) section of the [PayPal Pay Upon Invoice Documentation](https://developer.paypal.com/docs/checkout/apm/pay-upon-invoice/)
- invoiceBenefitsMessage:`string`  
  Optional parameter that allows to set custom message for describing the benefits of payment upon invoice. If **you** provide the custom value [**you** must inform the buyer that they have 30 days to pay Ratepay via bank transfer](https://developer.paypal.com/docs/checkout/apm/pay-upon-invoice/#link-howitworks).
- **customLocale**: `string`  
  Optional parameter that allows to set the Pay Upon Invoice interface language. Supported values are 'en' for English and 'de' for German.

## See also
A brief description of the integration of the client to commercetools frontend and the json with the payment methods properties can be found in the [docs folder](./docs).
For the workflows of the full integration including connector, client and commercetools frontend please refer to [connector documentation](https://github.com/mediaopt/paypal-commercetools-connector).

## Support

If you need support with the integration, please write a mail to support@mediaopt.de
