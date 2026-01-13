import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Databender - Boutique Strategy. Enterprise Delivery.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://databender.co/images/logo-color.png"
          alt="Databender"
          width={400}
          height={400}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
