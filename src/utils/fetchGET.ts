import { IOptionsFetch } from "../type";

export const fetchGET = async (url: string, options: IOptionsFetch) => {
  try {
    const res = await fetch(options?.component === "client" ? url : process.env.NEXTAUTH_URL + url, { next: { revalidate: 10 } });

    return await res.json();
  } catch (error) {
    return error;
  }
};
