import { http, HttpResponse, graphql } from "msw";

const movies: {
  title: string;
  id: string;
}[] = [];

const isTest = process.env.NODE_ENV === "test";

export const handlers: any = [
  graphql.query("ListMovies", async () => {
    if (!isTest) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    movies.push({
      title: `Movie ${movies.length + 1}`,
      id: `${movies.length + 1}`,
    });
    return HttpResponse.json({
      data: {
        movies,
      },
    });
  }),

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
