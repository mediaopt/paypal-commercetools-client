import { NotificationType } from "./Notifications";

export const errorFunc = (
  err: Record<string, unknown>,
  isLoading: (active: boolean) => void,
  notify: (type: NotificationType, text: string) => void,
) => {
  isLoading(false);
  console.log(err);
  notify("Error", (err.cause as string) ?? "An error occurred.");
  console.error(err);
};
