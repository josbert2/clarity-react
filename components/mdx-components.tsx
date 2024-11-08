import { ComponentPreview } from "./component-preview";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { ComponentSource } from "./component-source";
import {
  Tab as FumadocsTab,
  Tabs as FumadocsTabs,
} from "fumadocs-ui/components/tabs";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/default/annui/focus-tabs";
import {
  ComponentInstall,
  CLIInstall,
  ManualInstall,
} from "@/components/component-install";

const components = {
  ComponentSource,
  ComponentPreview,
  Tabs: ({
    children,
    items,
    defaultValue,
    ...props
  }: React.ComponentProps<typeof FumadocsTabs>) => (
    <Tabs defaultValue={defaultValue ?? items?.[0]} {...props}>
      <TabsList>
        {items?.map((item) => (
          <TabsTrigger key={item} value={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  ),
  Tab: (props: React.ComponentProps<typeof FumadocsTab>) => (
    <TabsContent {...props} />
  ),
  Steps,
  Step,
  ComponentInstall,
  CLIInstall,
  ManualInstall,
};

export { components };
