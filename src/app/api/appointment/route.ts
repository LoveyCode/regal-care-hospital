

export async function GET(_request: Request) {
  console.log("TEST LOG: This is the /api/appointment handler running!");
  return new Response(JSON.stringify({ message: "API is working!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}