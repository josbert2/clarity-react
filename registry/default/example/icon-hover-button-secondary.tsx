"use client";

import {
  IconHoverButton,
  IconHoverButtonIcon,
  IconHoverButtonText,
} from "@/registry/default/annui/icon-hover-button";
import { PlusIcon } from "lucide-react";

export default function IconHoverButtonSecondary() {
  return (
    <IconHoverButton variant="secondary">
      <IconHoverButtonIcon>
        <PlusIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Secondary</IconHoverButtonText>
    </IconHoverButton>
  );
}
