import {
  Tabs,
  TabsTrigger,
  TabsContent,
  TabsList,
  TabsTriggerIcon,
  TabsTriggerText,
} from "@/registry/default/annui/focus-tabs";
import { TerminalIcon, CodeIcon } from "lucide-react";

const ComponentInstall = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tabs defaultValue="cli">
      <TabsList>
        <TabsTrigger value="cli">
          <TabsTriggerIcon>
            <TerminalIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>CLI</TabsTriggerText>
        </TabsTrigger>
        <TabsTrigger value="manual">
          <TabsTriggerIcon>
            <CodeIcon />
          </TabsTriggerIcon>
          <TabsTriggerText>Manual</TabsTriggerText>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

const CLIInstall = ({ children }: { children: React.ReactNode }) => {
  return <TabsContent value="cli">{children}</TabsContent>;
};

const ManualInstall = ({ children }: { children: React.ReactNode }) => {
  return <TabsContent value="manual">{children}</TabsContent>;
};

export { ComponentInstall, CLIInstall, ManualInstall };
