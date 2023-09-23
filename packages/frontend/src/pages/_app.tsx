import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, aurora, gnosis, localhost, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { Toaster } from "react-hot-toast";
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

        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}