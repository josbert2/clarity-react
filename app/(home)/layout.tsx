import type { ReactNode } from "react"

export default function Layout({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  )
}
