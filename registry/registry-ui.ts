import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "focus-tabs",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-tabs",
      "@radix-ui/react-use-controllable-state",
      "framer-motion",
    ],
    files: [
      {
        path: "annui/focus-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "icon-hover-button",
    type: "registry:ui",
    dependencies: ["framer-motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "annui/icon-hover-button.tsx",
        type: "registry:ui",
      },
    ],
  },
];
