"use client";

import {
  IconHoverButton,
  IconHoverButtonIcon,
  IconHoverButtonText,
} from "@/registry/default/annui/icon-hover-button";
import { PlusIcon } from "lucide-react";

export default function IconHoverButtonLink() {
  return (
    <IconHoverButton variant="link">
      <IconHoverButtonIcon>
        <PlusIcon />
      </IconHoverButtonIcon>
      <IconHoverButtonText>Link</IconHoverButtonText>
    </IconHoverButton>
  );
}
