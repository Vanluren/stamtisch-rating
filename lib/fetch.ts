export async function fetcher<Res>(
  endpoint: string,
  options: RequestInit = {},
): Promise<{ [key: string]: Res }> {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint);

  const apiResponse = await fetch(url.toString(), {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return apiResponse;
}
