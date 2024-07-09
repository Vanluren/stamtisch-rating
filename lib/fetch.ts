type RequestOptions = RequestInit & {
  query: Record<string, string | number | boolean>;
};

const addQueryParams = (
  url: URL,
  query: Record<string, string | number | boolean>,
) => {
  for (const key in query) {
    url.searchParams.append(key, query[key].toString());
  }
};

export async function fetcher<Res>(
  endpoint: string,
  options: RequestOptions,
): Promise<Res> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint);

  if (options.query) addQueryParams(url, options.query);

  const apiResponse = await fetch(url.toString(), {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return apiResponse;
}
