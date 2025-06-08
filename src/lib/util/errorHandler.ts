import {HttpError} from "$lib/exception/HttpError";
import type {httpStatus} from "$lib/status";

export async function throwIfHttpErrorByStatus(
  response: Response,
  checkStatus: httpStatus | null,
  alertMessage: string,
): Promise<void> {
  if (response.ok) {
    return
  }

  if (checkStatus === null || response.status === checkStatus) {
    alert(alertMessage);
    throw await HttpError.fromResponse(response);
  }
}
