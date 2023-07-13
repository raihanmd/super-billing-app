import { customResponse } from "@/utils/customResponse";
import { ResponseError } from "@/error/responseError";
import userService from "@/services/userService";

export async function POST(req: Request) {
  try {
    const { userName, userPassword } = await req.json();

    if (!userName || !userPassword) {
      throw new ResponseError(403, "Invalid format body JSON", "Forbidden");
    }

    const newUser = await userService.register({ userName, userPassword });

    return customResponse({ statusCode: 201, payload: { userName: newUser.userName, userRole: newUser.userRole }, message: "Data added successfully." });
  } catch (err: any) {
    return customResponse({ statusCode: err.statusCode || 500, payload: err.payload || "Internal server error.", message: err.message || "Internal server error." });
  }
}
