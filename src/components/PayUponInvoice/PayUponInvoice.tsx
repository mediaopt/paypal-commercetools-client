import { FC, useEffect, useState } from "react";
import loadScript from "../../app/loadScript";

const fraudnetFncls = "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99";
const fraudnetUrl = "https://c.paypal.com/da/r/fb.js";
const fraudnetParams = (
  fraudnetSessionId: string,
  merchantId: string,
  pageId: string,
) => {
  return {
    f: fraudnetSessionId.substring(0, 32),
    s: `${merchantId} ${pageId}`,
    sandbox: true,
  };
};

//!!!!noscript to embed
// <noscript>
//   <img src="https://c.paypal.com/v1/r/d/b/ns?f=<32_character_GUID>
//     &s=<merchant_id>_<page_id>
//     &js=0&r=1" />
// </noscript>

export const PayUponInvoice: FC<{
  fraudnetSessionId: string;
  merchantId: string;
  pageId?: string;
}> = ({ fraudnetSessionId, merchantId, pageId = "checkout-page" }) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    if (Boolean(document.querySelector('script[src="' + fraudnetUrl + '"]')))
      return;
    const fraudNetConfigScipt = document.createElement("script");
    fraudNetConfigScipt.setAttribute("fncls", fraudnetFncls);
    fraudNetConfigScipt.type = "application/json";
    fraudNetConfigScipt.text = JSON.stringify(
      fraudnetParams(fraudnetSessionId, merchantId, pageId),
    );
    document.body.appendChild(fraudNetConfigScipt);
    loadScript(fraudnetUrl).then((res) => {
      res
        ? setScriptsLoaded(true)
        : console.log("something goes wrong with fraudNet");
    });
  }, []);
  return scriptsLoaded ? <>All fine</> : <>Something wrong</>;
};
