import userService from "@/services/userService";
import { customResponse } from "@/utils/customResponse";

export async function POST(req: Request) {
  try {
    const { userName, userPassword } = await req.json();

    const user = await userService.login({ userName, userPassword });

    return customResponse({ statusCode: 200, payload: { name: user.userName, role: user.userRole }, message: "User valid for login." });
  } catch (err: any) {
    return customResponse({ statusCode: err.statusCode || 500, payload: err.payload || "Internal server error.", message: err.message || "Internal server error." });
  }
}
