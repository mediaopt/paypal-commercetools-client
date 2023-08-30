import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { TestButtonMask } from "./TestButtonMask";

import { GeneralComponentsProps } from "../../types";

export const TestButton: React.FC<GeneralComponentsProps> = ({ clientId }) => {
  return (
    <RenderTemplate clientId={clientId}>
      <TestButtonMask />
    </RenderTemplate>
  );
};
