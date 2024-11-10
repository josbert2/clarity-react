import { Registry } from "@/registry/schema"

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
  {
    name: "adaptive-container",
    type: "registry:ui",
    dependencies: ["react-use-measure", "framer-motion"],
    files: [
      {
        path: "annui/adaptive-container.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-00",
    type: "registry:ui",
    registryDependencies: ["dropdown-menu"],
    files: [
      {
        path: "annui/dropdown-menu-00.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "vercel-tabs",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-tabs",
      "@radix-ui/react-use-controllable-state",
      "framer-motion",
    ],
    files: [
      {
        path: "annui/vercel-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
]
