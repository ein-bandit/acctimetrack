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

// deno-lint-ignore no-explicit-any
export const createDataResponse = (status: number, data: any): Response =>
  new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
