import { SVGProps } from "react";
import { type SetURLSearchParams } from "react-router-dom";

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
export type kind = "yes" | "no";
export interface placeTradeProps {
  onOpenChange: () => void;
  isOpen: boolean;
  id: string;
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

export type response = {
  message: string;
};

export type APIError = {
  message: string;
  error?: unknown;
};
