import {
  Laptop,
  Calculator,
  ChartLineUp,
  Briefcase,
  Megaphone,
  Lightning,
  Scales,
  Flask,
  GraduationCap,
  BookOpen,
  FileText,
  Books,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";

/** Single icon family (Phosphor), outline weight, for the whole product per the
 *  brief's "consistent outline style" requirement. */
const registry: Record<string, ComponentType<IconProps>> = {
  Laptop,
  Calculator,
  ChartLineUp,
  Briefcase,
  Megaphone,
  Lightning,
  Scales,
  Flask,
  GraduationCap,
  BookOpen,
  FileText,
  Books,
};

export function CategoryIcon({
  name,
  ...props
}: { name: string } & IconProps) {
  const Icon = registry[name] ?? Books;
  return <Icon weight="duotone" {...props} />;
}
