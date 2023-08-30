import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { PayPalMask } from "./PayPalMask";

import { GeneralComponentsProps } from "../../types";

export const PayPal: React.FC<GeneralComponentsProps> = ({ clientId }) => {
  return (
    <RenderTemplate clientId={clientId}>
      <PayPalMask />
    </RenderTemplate>
  );
};
