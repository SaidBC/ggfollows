"use client";

import { QRCodeSVG } from "qrcode.react";

export default function WalletQr({ address }: { address: string }) {
  return (
    <QRCodeSVG
      value={address}
      size={150}
      bgColor="transparent"
      fgColor="#b9ff66"
      level="H"
    />
  );
}
