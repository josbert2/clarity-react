import { Registry } from "@/registry/schema";

export const lib: Registry = [
  {
    name: "utils",
    type: "registry:lib",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "context",
    type: "registry:lib",
    dependencies: ["react"],
    files: [
      {
        path: "lib/context.ts",
        type: "registry:lib",
      },
    ],
  },
];
