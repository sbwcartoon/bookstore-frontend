import {redirect} from "@sveltejs/kit";
import {httpStatus} from "$lib/status";

export const load = async () => {
  throw redirect(httpStatus.TEMPORARY_REDIRECT, "/books");
}
