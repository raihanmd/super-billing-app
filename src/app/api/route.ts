import { customResponse } from "@/utils/customResponse";

export async function GET(req: Request) {
  return customResponse({ statusCode: 200, payload: "Success", message: "Hello" });
}
