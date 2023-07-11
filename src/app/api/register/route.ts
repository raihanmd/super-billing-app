import { prefix } from "@/constant/prefix";
import { getNanoid } from "@/utils/getNanoid";

export async function POST(req: Request) {
  const { userName, userPassword } = await req.json();

  const userId: String = prefix.USER + getNanoid(10);
}
