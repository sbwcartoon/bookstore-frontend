export async function POST({request}: { request: Request }) {
  return await fetch("http://localhost:8080/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(await request.json()),
  });
}
