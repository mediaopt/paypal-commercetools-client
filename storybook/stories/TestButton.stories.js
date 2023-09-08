import { TestButton } from "../../src/components/TestButton";
import { params, options } from "./constants";

export default {
  title: "Components/TestButton",
  component: TestButton,
};

export const Main = {
  args: {
    ...params,
    ...options,
  },
};
