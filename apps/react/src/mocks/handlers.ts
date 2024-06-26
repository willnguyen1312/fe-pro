import { http, HttpResponse, graphql } from "msw";

const movies: {
  title: string;
  id: string;
}[] = [];

const isTest = process.env.NODE_ENV === "test";

const timeouts: number[] = [1000];

export const handlers: any = [
  graphql.query("ListMovies", async () => {
    const timeout = timeouts[Math.floor(Math.random() * 5)];
    if (!isTest) {
      // Random number from 0 to 4
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }

    movies.push({
      title: `Movie ${movies.length + 1}`,
      id: `${movies.length + 1}`,
    });
    return HttpResponse.json({
      data: {
        movies,
      },
      errors: [
        // {
        //   message: "Error",
        // },
      ],
    });
  }),

  http.get("/api/hello", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return HttpResponse.json({
      message: `Hello back!`,
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
        },
      );
    }

    return HttpResponse.json({
      message: `Hello ${name}!`,
    });
  }),
];
