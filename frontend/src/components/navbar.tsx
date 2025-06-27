import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar position="sticky">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link className="flex gap-1" color="foreground" href="/">
            <Logo />
            <p className="font-bold text-inherit">Opinion Trading</p>
          </Link>
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
