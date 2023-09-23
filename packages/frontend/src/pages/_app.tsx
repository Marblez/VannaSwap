import Header from '@/components/Header';
import '@/styles/globals.css';
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
  midnightTheme
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import type { AppProps } from 'next/app';
import { Toaster } from "react-hot-toast";
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
const toastOptions = {
  style: {
    background: "rgba(0, 0, 0)",
    color: "#ffffff",
  },
  success: {
    className: "border border-green-500",
    iconTheme: {
      primary: "#10B981",
      secondary: "white",
    },
  },
  error: {
    className: "border border-red-500",
    iconTheme: {
      primary: "#EF4444",
      secondary: "white",
    },
  },
  loading: { className: "border border-yello-300" },
};

const { chains, publicClient } = configureChains(
  [localhost],
  [
    publicProvider()
  ]
);

const projectId = 'bd6e720a3734a20119883ca10029d9c5';

const { wallets } = getDefaultWallets({
  appName: 'Vanna Swap',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Vanna Swap',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={midnightTheme()} chains={chains} appInfo={demoAppInfo}>
        <Toaster position="top-right" toastOptions={toastOptions} />
        <Header />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}