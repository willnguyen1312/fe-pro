import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/hello", async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const data = (await request.json()) as { name: string };
    const { name } = data;

    if (!name) {
      return HttpResponse.json(
        {
          message: "Please provide a name",
        },
        {
          // Status for bad data
          status: 400,
        }
      );
    }

    return HttpResponse.json({
      message: `Hello ${name}!`,
    });
  }),
];
