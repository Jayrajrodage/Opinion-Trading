import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface eventCardProps {
  id: number;
  title: string;
  imageUrl: string;
  traders: number;
}

export interface placeTradeProps {
  onOpenChange: () => void;
  isOpen: boolean;
  initialKind: "yes" | "no";
}

export interface rechargeProps {
  onOpenChange: () => void;
  isOpen: boolean;
}
