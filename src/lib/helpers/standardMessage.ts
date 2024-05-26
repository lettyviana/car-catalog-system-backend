import { NextResponse } from "next/server";
import { TResponse } from "../types";

export const Response = ({ object, status, headers }: TResponse) => {
  return NextResponse.json(object, {
    status,
    headers,
  });
};
