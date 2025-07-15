import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface event {
  id: number;
  title: string;
  imgUrl: string;
  traders: number;
  description?: string;
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

export interface exitTradeProps {
  onOpenChange: () => void;
  isOpen: boolean;
}

export interface navbarProps {
  showBackButton: boolean;
  title: string;
}

export type LoginInput = {
  email: string;
};

export type LoginResponse = {
  message: string;
};

export type APIError = {
  message: string;
  error?: unknown;
};
