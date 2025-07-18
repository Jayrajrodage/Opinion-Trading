import { useNavigate } from "react-router-dom";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

import Logout from "./logout";

import { ThemeSwitch } from "@/components/theme-switch";
import { ArrowBack, GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";
import { navbarProps } from "@/types";

export const Navbar = ({ showBackButton, title }: navbarProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    const from = localStorage.getItem("from");

    if (!from) {
      navigate(-1);

      return;
    }

    navigate(from);
    localStorage.removeItem("from");
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
        <NavbarItem className="flex gap-2">
          <Link isExternal href={"/"} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {localStorage.getItem("auth") && <Logout />}
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
