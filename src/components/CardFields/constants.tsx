export const CARD_FIELDS_INPUTS: string =
  "w-full p-3 mt-1.5 mb-4 h-10 text-base bg-white text-neutral-700 border border-gray-300 rounded box-border resize-y";

export const CARD_FIELDS_BUTTON: string =
  "float-right text-center whitespace-nowrap inline-block font-normal align-middle select-none cursor-pointer text-white text-base rounded py-1.5 px-3 bg-sky-500 border-sky-500";

const ACTIONS: Record<string, string> = {
  YYPOSSIBLE: "threeDSAction_1",
  YYYES: "threeDSAction_2",
  YNNO: "threeDSAction_3",
  YRNO: "threeDSAction_4",
  YAPOSSIBLE: "threeDSAction_5",
  YUUNKNOWN: "threeDSAction_6",
  YUNO: "threeDSAction_7",
  YCUNKNOWN: "threeDSAction_8",
  YNO: "threeDSAction_9",
  NNO: "threeDSAction_10",
  UNO: "threeDSAction_11",
  UUNKNOWN: "threeDSAction_12",
  BNO: "threeDSAction_13",
  UNKNOWN: "threeDSAction_14",
};

export const getActionIndex = (
  enrollmentStatus: string,
  authenticationStatus: string,
  liabilityShift: string
): string => {
  const selector = enrollmentStatus.concat(
    authenticationStatus,
    liabilityShift
  );
  return ACTIONS[selector];
};
