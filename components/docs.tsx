import { type FC, type HTMLAttributes, type ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { PageTree } from "fumadocs-core/server"
import { SearchOnly, TreeContextProvider } from "fumadocs-ui/provider"

import { getSidebarTabs, type TabOptions } from "../lib/get-sidebar-tabs"
import { SidebarItems } from "./docs.client"
import { Sidebar, type SidebarProps } from "./docs/sidebar"
import { RootToggle, type Option } from "./layout/root-toggle"
import { LargeSearchToggle } from "./layout/search-toggle"
import { ThemeToggle } from "./layout/theme-toggle"
import { type LinkItemType } from "./links"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Icons } from "./ui/icon"
import { Separator } from "./ui/separator"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarTrigger,
} from "./ui/sidebar"

interface SidebarOptions extends SidebarProps {
  enabled: boolean
  component: ReactNode

  collapsible?: boolean
  components?: Partial<SidebarComponents>

  /**
   * Root Toggle options
   */
  tabs?: Option[] | TabOptions | false

  banner?: ReactNode
  footer?: ReactNode

  /**
   * Hide search trigger
   *
   * @defaultValue false
   */
  hideSearch?: boolean
}

export interface SidebarComponents {
  Item: FC<{ item: PageTree.Item }>
  Folder: FC<{ item: PageTree.Folder; level: number }>
  Separator: FC<{ item: PageTree.Separator }>
}

export interface DocsLayoutProps {
  tree: PageTree.Root

  sidebar?: Partial<SidebarOptions>

  containerProps?: HTMLAttributes<HTMLDivElement>

  children?: ReactNode
}

export function DocsLayout({
  sidebar: { tabs: tabOptions, components: sidebarComponents, ...sidebar } = {},
  ...props
}: DocsLayoutProps): ReactNode {
  // const Aside = collapsible ? CollapsibleSidebar : Sidebar
  if (props.tree === undefined) notFound()

  let tabs: Option[] = []
  if (Array.isArray(tabOptions)) {
    tabs = tabOptions
  } else if (typeof tabOptions === "object") {
    tabs = getSidebarTabs(props.tree, tabOptions)
  } else if (tabOptions !== false) {
    tabs = getSidebarTabs(props.tree)
  }

  return (
    <TreeContextProvider tree={props.tree}>
      <Sidebar {...sidebar}>
        <SidebarHeader>
          {tabs.length > 0 ? <RootToggle options={tabs} /> : null}
          <SearchOnly>
            <LargeSearchToggle className="rounded-lg max-md:hidden" />
          </SearchOnly>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarItems components={sidebarComponents} />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterItems />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">AnnUI</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <BreadcrumbLink href="#">Documentation</BreadcrumbLink>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 gap-4 [&_article]:gap-2 [&_article]:pt-6 [&_article]:md:pt-6 [&_.-mb-3]:-mb-1">
          {props.children}
        </div>
      </SidebarInset>
    </TreeContextProvider>
  )
}

function SidebarFooterItems() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-row items-center">
          <ThemeToggle className="p-0 md:order-first" />
          <Link
            className="ml-auto [&_svg]:size-5 [&_svg]:fill-current hover:bg-secondary hover:text-secondary-foreground rounded-md p-1.5"
            href="https://github.com/annui-org/annui"
            target="_blank"
          >
            <Icons.Github />
          </Link>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export { getSidebarTabs, type TabOptions, type LinkItemType }
