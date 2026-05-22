"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRouter } from "next/navigation";

type StartBioScanButtonProps = {
  children?: ReactNode;
  className?: string;
  contentName?: string;
  style?: CSSProperties;
};

export default function StartBioScanButton({
  children = "Start My BioScan",
  className,
  contentName = "start_bioscan_cta",
  style,
}: StartBioScanButtonProps) {
  const router = useRouter();

  function handleClick() {
    window.ttq?.track("Contact", { content_name: contentName });
    router.push("/login");
  }

  return (
    <button type="button" className={className} style={style} onClick={handleClick}>
      {children}
    </button>
  );
}
