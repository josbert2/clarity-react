"use client";

import {
  IconHoverButton,
  IconHoverButtonIcon,
  IconHoverButtonText,
} from "@/registry/default/annui/icon-hover-button";
import { PlusIcon } from "lucide-react";

export default function IconHoverButtonOutline() {
  return (
    <IconHoverButton variant="outline">
      <IconHoverButtonIcon>
        <PlusIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Outline</IconHoverButtonText>
    </IconHoverButton>
  );
}
