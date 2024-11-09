import "./global.css"

import type { ReactNode } from "react"
import { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider"

import { fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/registry/default/lib/utils"

export const metadata: Metadata = {
  title: {
    default: "AnnUI",
    template: "%s | AnnUI",
  },
  description: "AnnUI is a UI library like ShadcnUI",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "liorael",
      url: "https://github.com/liorael",
    },
  ],
  creator: "liorael",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
