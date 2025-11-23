import Image from "next/image";

interface AppLogoProps {
  width?: number;
  height?: number;
  isFullLogo?: boolean;
}

export default function AppLogo({
  width = 300,
  height = 300,
  isFullLogo = true,
}: AppLogoProps) {
  return (
    <Image
      src={
        isFullLogo ? "/images/overgive-logo.svg" : "/icons/ic-overgive-logo.svg"
      }
      width={width}
      height={height}
      alt="overgive-logo"
      priority
    />
  );
}
