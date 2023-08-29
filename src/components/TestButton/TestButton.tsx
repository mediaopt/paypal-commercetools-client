import React from "react";

import { RenderTemplate } from "../RenderTemplate";
import { TestButtonMask } from "./TestButtonMask";

export const TestButton: React.FC = () => {
  return (
    <RenderTemplate>
      <TestButtonMask />
    </RenderTemplate>
  );
};
