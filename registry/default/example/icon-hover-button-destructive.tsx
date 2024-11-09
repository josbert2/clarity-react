"use client";

import {
  IconHoverButton,
  IconHoverButtonIcon,
  IconHoverButtonText,
} from "@/registry/default/annui/icon-hover-button";
import { PlusIcon } from "lucide-react";

export default function IconHoverButtonDestructive() {
  return (
    <IconHoverButton variant="destructive">
      <IconHoverButtonIcon>
        <PlusIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Destructive</IconHoverButtonText>
    </IconHoverButton>
  );
}
