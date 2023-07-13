import bcrypt from "bcrypt";

import { prisma } from "@/connection/prisma";
import { ResponseError } from "@/error/responseError";
import { loginUserValidation, registerUserValidation } from "@/validation/userValidation";
import { validate } from "@/validation/validation";
import { prefix } from "@/constant/prefix";
import { getNanoid } from "@/utils/getNanoid";
import { getErrMessage, passwordIsValid } from "@/utils/passValidator";
import { IUserRequest } from "@/type";

const register = async (request: IUserRequest) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prisma.user.count({
    where: {
      name: user.userName,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username already exist", "Bad Request");
  }

  if (!passwordIsValid(user.userPassword)) {
    const errorMessage: any = getErrMessage(user.userPassword);
    throw new ResponseError(
      403,
      errorMessage.map((err: any) => err.message),
      "Forbidden"
    );
  }

  user.userId = prefix.USER + getNanoid(10);
  user.userPassword = await bcrypt.hash(user.userPassword, 10);

  const newUser = await prisma.user.create({
    data: {
      id: user.userId as string,
      name: user.userName.toLowerCase() as string,
      password: user.userPassword as string,
    },
    select: {
      name: true,
      role: true,
    },
  });

  return { userName: newUser.name, userRole: newUser.role };
};

const login = async (request: IUserRequest) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prisma.user.findUnique({
    where: {
      name: loginRequest.userName.toLowerCase() as string,
    },
    select: {
      name: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password incorrect", "Unauthorized");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.userPassword, user.password);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password incorrect", "Unauthorized");
  }

  return { userName: user.name, userRole: user.role };
};

export default { register, login };
