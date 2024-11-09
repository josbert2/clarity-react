"use client";

import {
  IconHoverButton,
  IconHoverButtonIcon,
  IconHoverButtonText,
} from "@/registry/default/annui/icon-hover-button";
import { PlusIcon } from "lucide-react";

export default function IconHoverButtonPrimary() {
  return (
    <IconHoverButton>
      <IconHoverButtonIcon>
        <PlusIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Primary</IconHoverButtonText>
    </IconHoverButton>
  );
}
