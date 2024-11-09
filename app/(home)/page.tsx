import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="absolute inset-0 flex items-center justify-center">
      <Button asChild>
        <Link href="/docs">Get Started</Link>
      </Button>
    </main>
  )
}
