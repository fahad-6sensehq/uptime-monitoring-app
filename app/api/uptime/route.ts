import { NextResponse } from "next/server";
import { MOCK_DATA } from "../../../lib/uptime";

export async function GET() {
  return NextResponse.json(MOCK_DATA);
}
