"use client"

import { type ReactNode } from "react"
import type { PageTree } from "fumadocs-core/server"
import { useTreeContext, useTreePath } from "fumadocs-ui/provider"

import type { SidebarComponents } from "./docs"
import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator,
} from "./docs/sidebar"
import { SidebarMenu } from "./ui/sidebar"

export function SidebarItems(props: {
  components?: Partial<SidebarComponents>
}) {
  const { root } = useTreeContext()

  return (
    <SidebarMenu {...props}>{renderSidebarList(root.children, 1)}</SidebarMenu>
  )
}

function PageTreeFolder({
  item,
  children,
  level,
}: {
  item: PageTree.Folder
  level: number
  children: ReactNode
}) {
  const path = useTreePath()

  return (
    <SidebarFolder
      defaultOpen={item.defaultOpen || path.includes(item)}
      level={level + 1}
    >
      {children}
    </SidebarFolder>
  )
}

function renderSidebarList(items: PageTree.Node[], level: number): ReactNode[] {
  return items.map((item, i) => {
    const id = `${item.type}_${i.toString()}`

    switch (item.type) {
      case "separator":
        return <SidebarSeparator key={id}>{item.name}</SidebarSeparator>
      case "folder":
        return (
          <PageTreeFolder key={id} item={item} level={level + 1}>
            {item.index ? (
              <SidebarFolderLink
                href={item.index.url}
                external={item.index.external}
              >
                {item.icon}
                {item.name}
              </SidebarFolderLink>
            ) : (
              <SidebarFolderTrigger>
                {item.icon}
                {item.name}
              </SidebarFolderTrigger>
            )}
            <SidebarFolderContent>
              {renderSidebarList(item.children, level + 1)}
            </SidebarFolderContent>
          </PageTreeFolder>
        )
      default:
        return (
          <SidebarItem
            key={item.url}
            href={item.url}
            external={item.external}
            icon={item.icon}
          >
            {item.name}
          </SidebarItem>
        )
    }
  })
}
