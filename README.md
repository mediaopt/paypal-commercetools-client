# PayPal client app

In here we explain how to use the client app and get payment methods to work.

## General properties

Each payment component takes a set of props that will be the same for everything. They are as follows:

- **createPaymentUrl**: `string`  
  _POST_-Request - we get a [_CreatePaymentResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to create a payment in commerce tools. Communicates with CommerceTools backend  
  See the examples in our [CoFe integration example repository]()
- **getSettingsUrl**: `string`  
  _POST_-Request - we get a [_GetSettingsResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to get settings of PayPal in commerce tools. Communicates with CommerceTools backend  
  See the examples in our [CoFe integration example repository]()
- **createOrderUrl**: `string`  
  _POST_-Request - we get a [_CreateOrderResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to create a PayPal order in commerce tools. Communicates with CommerceTools backend  
  See the examples in our [CoFe integration example repository]()
- **onApproveUrl**: `string`  
  _POST_-Request - we get a [_OnApproveResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to capture a PayPal order in commerce tools. Communicates with CommerceTools backend  
  See the examples in our [CoFe integration example repository]()
- **authorizeOrderUrl**: `string`  
  _POST_-Request - we get a [_OnApproveResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to authorize a PayPal order in commerce tools. Communicates with CommerceTools backend  
  See the examples in our [CoFe integration example repository]()
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
  The URL that gets called to the endpoint of the connect app to get the client token to use in PayPalHostedFieldsProvider component in commerce tools. Communicates with CommerceTools backend  
  See the examples in our [CoFe integration example repository]()
