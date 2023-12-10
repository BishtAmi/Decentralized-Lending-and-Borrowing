import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import React from "react";
import styles from "../pages/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";

const DynamicWalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

export const AppBar: FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.AppHeader}>
      <img src="" height={30} width={170} />
      <span>Web3 Credit</span>
      {isClient && <DynamicWalletMultiButton />}
    </div>
  );
};
