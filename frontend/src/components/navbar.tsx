import { useNavigate } from "react-router-dom";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

import { ThemeSwitch } from "@/components/theme-switch";
import { ArrowBack, GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";
import { navbarProps } from "@/types";

export const Navbar = ({ showBackButton, title }: navbarProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <HeroUINavbar position="sticky">
      <NavbarContent justify="start">
        {showBackButton && (
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleBack}
          >
            <ArrowBack />
          </button>
        )}
        <NavbarBrand>
          {!showBackButton && <Logo />}
          <p className="font-bold text-inherit">{title}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex gap-1.5">
          <Link isExternal href={"/"} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
