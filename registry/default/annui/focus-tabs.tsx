"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { AnimatePresence, motion } from "framer-motion";
import { createContext } from "@/registry/default/lib/context";

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, onValueChange, defaultValue, ...props }, ref) => {
  const [activeTab, setActiveTab] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  return (
    <TabsProvider value={{ activeTab, setActiveTab }}>
      <TabsPrimitive.Root
        ref={ref}
        value={activeTab}
        onValueChange={setActiveTab}
        {...props}
      />
    </TabsProvider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-8 items-center justify-center gap-2",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, value, ...props }, ref) => {
  const [isFirstRender, setIsFirstRender] = React.useState(true);

  React.useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <TabProvider value={{ value, isFirstRender }}>
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "group h-full inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground",
          className
        )}
        value={value}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
    </TabProvider>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsTriggerIcon = React.forwardRef<
  React.ElementRef<"span">,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("[&>svg]:w-4 [&>svg]:h-4", className)}
    {...props}
  />
));
TabsTriggerIcon.displayName = TabsPrimitive.Trigger.displayName;

const TabsTriggerText = React.forwardRef<
  React.ElementRef<typeof motion.div>,
  React.ComponentPropsWithoutRef<typeof motion.div> & {
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  const { activeTab } = useTabsContext();
  const { value, isFirstRender } = useTabContext();

  const isActive = value === activeTab;

  const variants = {
    initial: {
      width: isFirstRender && isActive ? "auto" : 0,
      opacity: isFirstRender && isActive ? 1 : 0,
    },
    animate: { width: "auto", opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={ref}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="initial"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn("overflow-hidden", className)}
          {...props}
        >
          <span className="ml-1">{children}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
TabsTriggerText.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

interface TabsContextValue {
  activeTab: string | undefined;
  setActiveTab: (value: string) => void;
}

interface TabContextValue {
  value: string | undefined;
  isFirstRender: boolean;
}

const [TabsProvider, useTabsContext] = createContext<TabsContextValue>({
  activeTab: undefined,
  setActiveTab: () => {},
});

const [TabProvider, useTabContext] = createContext<TabContextValue>({
  value: undefined,
  isFirstRender: true,
});

export {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
  TabsTriggerText,
  TabsTriggerIcon,
};

export { useTabsContext, useTabContext };
