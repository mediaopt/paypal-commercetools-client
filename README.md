# PayPal client app

In here we explain how to use the client app and get payment methods to work.

## General properties

Each payment component takes a set of props that will be the same for everything. They are as follows:

- **createPaymentUrl**: `string`  
  _POST_-Request - we get a [_CreatePaymentResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to create a payment in commercetools. Communicates with commercetools backend  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)
- **getSettingsUrl**: `string`  
  _POST_-Request - we get a [_GetSettingsResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to get settings of PayPal in commercetools. Communicates with commercetools backend  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)
- **createOrderUrl**: `string`  
  _POST_-Request - we get a [_CreateOrderResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to create a PayPal order in commercetools. Communicates with commercetools backend  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)
- **onApproveUrl**: `string`  
  _POST_-Request - we get a [_OnApproveResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to capture a PayPal order in commercetools. Communicates with commercetools backend  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)
- **authorizeOrderUrl**: `string`  
  _POST_-Request - we get a [_OnApproveResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to authorize a PayPal order in commercetools. Communicates with commercetools backend  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)
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

## Vaulting properties

These properties are used when you want to set up vaulting during purchase.

- **enableVaulting**: `boolean`  
  Set `true` if you want to enable vaulting in the payment method.

- **getUserInfoUrl**: `string`  
   _POST_-Request - we get a [_GetUserInfoResponse_](src/types/index.ts)  
   It is **your** responsibility to develop this API  
   The URL that gets called to the endpoint of the connect app to get some information related to vaulting for the logged-in user. Communicates with commercetools backend  
   See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

### Vaulting for purchase later

In addition to `Vaulting properties` we have the following properties to vault for purchase later.

- **createVaultSetupTokenUrl**: `string`  
   _POST_-Request - we get a [_CreateVaultSetupTokenResponse_](src/types/index.ts)  
   It is **your** responsibility to develop this API  
   The URL that gets called to the endpoint of the connect app to create a vault setup token for the logged-in user. Communicates with commercetools backend  
   See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

- **approveVaultSetupTokenUrl**: `string`  
   _POST_-Request - we get a [_ApproveVaultSetupTokenResponse_](src/types/index.ts)  
   It is **your** responsibility to develop this API  
   The URL that gets called to the endpoint of the connect app to approve a vault setup token for the logged-in user. Communicates with commercetools backend  
   See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

## Payment specific properties

In addition, each payment component comes with its own specific properties.

### PayPal

PayPal components props are based on PayPal props and you can see them on PayPal official documentation [_PayPalButtonsComponentOptions_](https://github.com/paypal/react-paypal-js/blob/main/src/types/paypalButtonTypes.ts).

- **paypalMessages**: `object`
  Pass this object here if you want to show the `PayPal Messages` in the PayPal component. In order to see the structure check the parameters of `PayPalMessages`.

### PayPalMessages

PayPal messages props are based on PayPalMessages props and you can see them on PayPal official documentation [_PayPalMessagesComponentOptions_](https://github.com/paypal/react-paypal-js/blob/main/src/components/PayPalMessages.tsx).

### HostedFields

- **getClientTokenUrl**: `string`  
  _POST_-Request - we get a [_ClientTokenResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The URL that gets called to the endpoint of the connect app to get the client token to use in PayPalHostedFieldsProvider component in commercetools. Communicates with commercetools backend  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

### PaymentTokens

If you want to get a list of vaulted payments you can use this component. It will also give you the avility to remove the vaulted account.

You need to pass properties that are mentioned in the `Vaulting properties` section and also pass the following specific property.

- **removePaymentTokenUrl**: `string`  
  _POST_-Request - we get a [_GetUserInfoResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The URL that gets called to the endpoint of the connect app to remove a `Payment Token` in the PaymentTokens component in commercetools. Communicates with commercetools backend  
  See the examples in our [CoFe integration example repository](https://github.com/mediaopt/paypal-commercetools-cofe-integration/blob/main/packages/poc/backend/payment-paypal/actionControllers/PayPalController.ts)

### PayUponInvoice

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

## Support

If you need support with the integration, please write a mail to support@mediaopt.de
