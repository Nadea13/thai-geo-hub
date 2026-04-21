import { NextRequest, NextResponse } from "next/server";
import geoData from "@/data/geo-data.json";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q")?.toLowerCase();

  if (!q) return NextResponse.json([]);

  const filtered = geoData
    .filter((item: any) => 
      item.province.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q) ||
      item.subdistrict.toLowerCase().includes(q) ||
      item.zipcode.includes(q)
    )
    .slice(0, 10);

  return NextResponse.json(filtered);
}
