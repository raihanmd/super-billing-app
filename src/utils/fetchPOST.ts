import { IOptionsFetch } from "../type";

export const fetchPOST = async (url: string, data: object | Array<object>, options: IOptionsFetch = { component: "server" }) => {
  try {
    const res = await fetch(options?.component === "client" ? url : process.env.NEXTAUTH_URL + url, {
      method: "POST",
      //@ts-ignore
      headers: {
        "API-Key": process.env.API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error: any) {
    throw new Error(`Error in fetchPOST for ${url}: ${error.message}`);
  }
};
