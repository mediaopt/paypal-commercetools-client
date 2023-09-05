# PayPal client app

In here we explain how to use the client app and get payment methods to work.

## General properties

Each payment component takes a set of props that will be the same for everything. They are as follows:

- **clientId**: `string`  
  The client Id from PayPal.
- **createPaymentUrl**: `string`  
  _POST_-Request - we get a [_CreatePaymentResponse_](src/types/index.ts)  
  It is **your** responsibility to develop this API  
  The url that gets called to the endpoint of the connect app to create a payment in commerce tools. Communicates with CommerceTools backend  
  See the examples in our [CoFe integration example repository]()
- **sessionValue**: `string`  
  The session value is to be able to connect to the cart. We send it in the header of requests with the value of **sessionKey**
- **sessionKey**: `string`  
  The key for the session to be used in conjunction with the session value.
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

## Payment specific properties

In addition, each payment component comes with its own specific properties.

### PayPal

PayPal components props are based on PayPal props and you can see them on PayPal official documentations [_PayPalButtonsComponentOptions_](https://developer.paypal.com/sdk/js/reference/#buttons).
