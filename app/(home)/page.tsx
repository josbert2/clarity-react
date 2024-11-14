import Link from "next/link"

import { Button } from "@/components/ui/button"

import { BecomeSponsor, Feature } from "./page.client"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-lg bg-gradient-to-r from-gray-400 via-gray-500 to-gray-700 opacity-50 blur-xl" />
          <h1 className="relative text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
            AnnUI
          </h1>
        </div>

        <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-400">
          AnnUI is a collection of re-usable components that you can copy and
          paste into your web apps.
        </p>

        <div className="flex gap-4">
          <Button size="lg" asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="https://github.com/annui-org/annui">GitHub</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500">✓</span>
            Open Source
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500">✓</span>
            MIT License
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500">✓</span>
            Customizable
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-32">
        {features.map((feature) => (
          <Feature key={feature.title} {...feature} />
        ))}
      </div>

      <div className="mt-32">
        <BecomeSponsor />
      </div>
    </div>
  )
}

const features = [
  {
    title: "Highly Customizable",
    description:
      "Inherits shadcn/ui's design philosophy with Radix UI's powerful declarative components",
  },
  {
    title: "Great Developer Experience",
    description:
      "Declarative API design, reduced boilerplate code, improved development efficiency",
  },
  {
    title: "Accessibility First",
    description:
      "Built on Radix UI's accessibility support with beautiful animations",
  },
  {
    title: "Theme System",
    description:
      "Built-in light/dark modes with support for custom theme colors and styles",
  },
  {
    title: "TypeScript First",
    description:
      "Complete TypeScript type support with intelligent code suggestions",
  },
  {
    title: "Responsive Design",
    description:
      "Optimized for different devices ensuring great cross-platform experience",
  },
]
