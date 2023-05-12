export const createResponse = (status: number, text: string): Response =>
  new Response(
    JSON.stringify({
      message: text,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
