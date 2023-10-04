import { FC } from "react";

type ResultProps = {
  success?: boolean;
  message?: string;
};

export const Result: FC<React.PropsWithChildren<ResultProps>> = ({
  success = true,
  message,
  children,
}) => {
  return (
    <div className={!success ? "text-rose-600" : "text-green-700"}>
      {message ?? "Thank you for your purchase!"}

      <div>{children}</div>
    </div>
  );
};
