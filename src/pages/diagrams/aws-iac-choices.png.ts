import type { APIRoute } from "astro";
import sharp from "sharp";
import diagram from "../../../public/diagrams/aws-iac-choices.svg?raw";

export const GET: APIRoute = async () => {
  const png = await sharp(Buffer.from(diagram), { density: 144 })
    .resize(1200, 630, { fit: "contain", background: "#fbfaf7" })
    .png()
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
