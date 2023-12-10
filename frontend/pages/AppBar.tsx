import dynamic from "next/dynamic";
import styles from "./Home.module.css";
import { FC } from "react";
const DynamicWalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false, // Disable server-side rendering for this component
  }
);

const AppBar = () => {
  return (
    <div className={styles.AppHeader}>
      <img src="/solanaLogo.png" height={30} width={200} />
      <span>Wallet-Adapter Example</span>
      <DynamicWalletMultiButton />
    </div>
  );
};

export default AppBar;