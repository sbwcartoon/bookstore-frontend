import {PUBLIC_API_HOST_URL} from "$env/static/public";

export async function POST({request}: { request: Request }) {
  return await fetch(`${PUBLIC_API_HOST_URL}/api/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(await request.json()),
  });
}
