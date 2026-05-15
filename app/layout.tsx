import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Canetaço — Assinatura eletrônica com WhatsApp",
    template: "%s · Canetaço",
  },
  description:
    "Plataforma brasileira de assinatura eletrônica de documentos com validade jurídica, notificação por email e WhatsApp, conformidade LGPD.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://canetaco.com.br"),
  openGraph: {
    title: "Canetaço — Assinatura eletrônica com WhatsApp",
    description:
      "Assine e colete assinaturas com validade jurídica, em minutos. Notificação por email e WhatsApp.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
