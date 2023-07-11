import { NextResponse } from "next/server";

interface IResponse {
  statusCode: number;
  payload: string | Array<object> | object;
  message: string;
}

export const customResponse = ({ statusCode, payload, message }: IResponse) => {
  return NextResponse.json(
    {
      statusCode,
      payload,
      message,
    },
    {
      status: statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      },
    }
  );
};
