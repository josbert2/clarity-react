import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "focus-tabs-demo",
    type: "registry:example",
    registryDependencies: ["focus-tabs"],
    files: [
      {
        path: "example/focus-tabs-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
