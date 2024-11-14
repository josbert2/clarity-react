"use client"

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PointerEventHandler,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import type {
  CollapsibleContentProps,
  CollapsibleTriggerProps,
} from "@radix-ui/react-collapsible"
import { type ScrollAreaProps } from "@radix-ui/react-scroll-area"
import { cva } from "class-variance-authority"
import Link, { type LinkProps } from "fumadocs-core/link"
import { useOnChange } from "fumadocs-core/utils/use-on-change"
import { useSidebar } from "fumadocs-ui/provider"
import { ChevronRight, ExternalLink, SidebarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { isActive } from "../../lib/is-active"
import { buttonVariants } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { ScrollArea, ScrollViewport } from "../ui/scroll-area"
import {
  Sidebar as ShadCNSidebar,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../ui/sidebar"

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Open folders by default if their level is lower or equal to a specific level
   * (Starting from 1)
   *
   * @defaultValue 0
   */
  defaultOpenLevel?: number

  /**
   * Prefetch links
   *
   * @defaultValue true
   */
  prefetch?: boolean
}

interface InternalContext {
  defaultOpenLevel: number
  prefetch: boolean
}

const itemVariants = cva(
  "flex flex-row items-center gap-2.5 rounded-md px-3 py-2 text-fd-muted-foreground/90 transition-all duration-200 [overflow-wrap:anywhere] md:px-2.5 md:py-2 [&_svg]:size-4 hover:translate-x-0.5",
  {
    variants: {
      active: {
        true: "bg-fd-primary font-medium text-fd-primary translate-x-0.5",
        false: "hover:bg-fd-accent hover:text-fd-accent-foreground",
      },
    },
  }
)

const Context = createContext<InternalContext | undefined>(undefined)
const FolderContext = createContext<
  | {
      open: boolean
      setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
  | undefined
>(undefined)

export function CollapsibleSidebar(props: SidebarProps) {
  const { collapsed } = useSidebar()
  const [hover, setHover] = useState(false)
  const timerRef = useRef(0)
  const closeTimeRef = useRef(0)

  useOnChange(collapsed, () => {
    setHover(false)
    closeTimeRef.current = Date.now() + 150
  })

  const onEnter: PointerEventHandler = useCallback((e) => {
    if (e.pointerType === "touch" || closeTimeRef.current > Date.now()) return
    window.clearTimeout(timerRef.current)
    setHover(true)
  }, [])

  const onLeave: PointerEventHandler = useCallback((e) => {
    if (e.pointerType === "touch") return
    window.clearTimeout(timerRef.current)

    timerRef.current = window.setTimeout(
      () => {
        setHover(false)
        closeTimeRef.current = Date.now() + 150
      },
      Math.min(e.clientX, document.body.clientWidth - e.clientX) > 100 ? 0 : 500
    )
  }, [])

  return (
    <>
      <SidebarCollapseTrigger
        className={cn(
          "fixed bottom-3 start-2 z-20 transition-opacity max-md:hidden",
          (!collapsed || hover) && "opacity-0"
        )}
      />
      <Sidebar
        {...props}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        className={cn(
          "transition-[flex,margin,opacity,transform]",
          collapsed &&
            "md:-me-[var(--fd-sidebar-offset)] md:flex-initial md:translate-x-[calc(var(--fd-sidebar-offset)*-1)] rtl:md:translate-x-[var(--fd-sidebar-offset)]",
          collapsed && hover && "md:translate-x-0",
          collapsed && !hover && "md:z-10 md:opacity-0",
          props.className
        )}
        style={
          {
            "--fd-sidebar-offset": "calc(var(--fd-sidebar-width) - 30px)",
          } as object
        }
      />
    </>
  )
}

export function Sidebar({
  defaultOpenLevel = 0,
  prefetch = true,
  ...props
}: SidebarProps) {
  const context = useMemo<InternalContext>(() => {
    return {
      defaultOpenLevel,
      prefetch,
    }
  }, [defaultOpenLevel, prefetch])

  return (
    <Context.Provider value={context}>
      <ShadCNSidebar>{props.children}</ShadCNSidebar>
    </Context.Provider>
  )
}

export function SidebarViewport(props: ScrollAreaProps) {
  return (
    <ScrollArea {...props} className={cn("h-full", props.className)}>
      <ScrollViewport
        style={{
          maskImage: "linear-gradient(to bottom, transparent 2px, white 16px)",
        }}
      >
        {props.children}
      </ScrollViewport>
    </ScrollArea>
  )
}

export function SidebarSeparator(props: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <SidebarGroupLabel
      {...props}
      className="text-[11px] uppercase tracking-wider text-fd-muted-foreground/60 font-semibold pt-4 pb-2"
    >
      {props.children}
    </SidebarGroupLabel>
  )
}

export function SidebarItem({
  icon,
  ...props
}: LinkProps & {
  icon?: ReactNode
}) {
  const pathname = usePathname()
  const active =
    props.href !== undefined && isActive(props.href, pathname, false)
  const { prefetch } = useInternalContext()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          {...props}
          data-active={active}
          className={cn(
            itemVariants({ active }),
            "group/item transition-all duration-200"
          )}
          prefetch={prefetch}
        >
          {icon ??
            (props.external ? <ExternalLink className="shrink-0" /> : null)}
          <span className="flex-1 truncate">{props.children}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function SidebarFolder({
  level,
  defaultOpen,
  ...props
}: {
  children: ReactNode
  defaultOpen?: boolean
  level: number
}) {
  const { defaultOpenLevel } = useInternalContext()
  const shouldExtend = defaultOpen ?? defaultOpenLevel >= level
  const [open, setOpen] = useState(shouldExtend)

  useOnChange(shouldExtend, (v) => {
    if (v) setOpen(v)
  })

  return (
    <Collapsible
      className="group/collapsible"
      open={open}
      onOpenChange={setOpen}
    >
      <FolderContext.Provider
        value={useMemo(() => ({ open, setOpen }), [open])}
      >
        {props.children}
      </FolderContext.Provider>
    </Collapsible>
  )
}

export function SidebarFolderTrigger(props: CollapsibleTriggerProps) {
  return (
    <SidebarMenuItem>
      <CollapsibleTrigger
        className={cn(
          itemVariants({ active: false }),
          "w-full pe-3 md:pe-2 group/trigger"
        )}
        asChild
        {...props}
      >
        <SidebarMenuButton>
          {props.children}
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
    </SidebarMenuItem>
  )
}

export function SidebarFolderLink(props: LinkProps) {
  const { setOpen } = useFolderContext()
  const { prefetch } = useInternalContext()

  const pathname = usePathname()
  const active =
    props.href !== undefined && isActive(props.href, pathname, false)

  useLayoutEffect(() => {
    if (active) {
      setOpen(true)
    }
  }, [active, setOpen])

  return (
    <Link
      {...props}
      data-active={active}
      className={cn(
        itemVariants({ active }),
        "w-full pe-3.5 md:pe-1.5 h-8",
        props.className
      )}
      onClick={(e) => {
        if (
          // clicking on icon
          (e.target as HTMLElement).hasAttribute("data-icon") ||
          active
        ) {
          setOpen((prev) => !prev)
          e.preventDefault()
        }
      }}
      prefetch={prefetch}
    >
      {props.children}
      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
    </Link>
  )
}

export function SidebarFolderContent(props: CollapsibleContentProps) {
  return (
    <CollapsibleContent forceMount {...props}>
      <SidebarMenuSub className="ml-3 border-l-[1.5px] border-fd-border/50 pl-3 pr-1.5 [&>li>a]:rounded-r-md [&>li>button]:rounded-r-md">
        {props.children}
      </SidebarMenuSub>
    </CollapsibleContent>
  )
}

export function SidebarCollapseTrigger(
  props: ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { setCollapsed } = useSidebar()

  return (
    <button
      type="button"
      aria-label="Collapse Sidebar"
      {...props}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: "icon",
        }),
        props.className
      )}
      onClick={() => {
        setCollapsed((prev) => !prev)
      }}
    >
      <SidebarIcon />
    </button>
  )
}

function useFolderContext() {
  const ctx = useContext(FolderContext)

  if (!ctx) throw new Error("Missing sidebar folder")
  return ctx
}

function useInternalContext(): InternalContext {
  const ctx = useContext(Context)
  if (!ctx) throw new Error("<Sidebar /> component required.")

  return ctx
}
