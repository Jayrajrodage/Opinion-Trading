import { AxiosError } from "axios";
import { SVGProps } from "react";
import { type Control, type UseFormHandleSubmit } from "react-hook-form";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface event {
  id: string;
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
  onClose: () => void;
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

export type BalanceInput = {
  amount: number;
};

export type response = {
  message: string;
};

export type APIError = {
  message: string;
  error?: unknown;
};

export interface loginCardProps {
  handleSubmit: UseFormHandleSubmit<LoginInput, LoginInput>;
  onSubmit: (data: LoginInput) => void;
  control: Control<LoginInput, any, LoginInput>;
}

export interface placeTradeFooterProps {
  isOpen: boolean;
  searchParams: URLSearchParams;
}

export interface balance {
  availableBalance: number;
  lockedBalance: number;
}

export interface ApiErrorResponse {
  message: string[];
}

export interface ApiError extends AxiosError<ApiErrorResponse> {}
