import { Link, useLocation } from "react-router-dom";
import { HomeIcon, BriefcaseIcon, WalletIcon } from "@heroicons/react/24/solid";

export const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-xl bg-white dark:bg-black border-t border-gray-300 dark:border-zinc-700 shadow">
        <div className="flex justify-around items-center py-2">
          <TabButton
            to="/"
            label="Home"
            Icon={HomeIcon}
            active={currentPath === "/"}
          />
          <TabButton
            to="/portfolio"
            label="Portfolio"
            Icon={BriefcaseIcon}
            active={currentPath === "/portfolio"}
          />
          <TabButton
            to="/wallet"
            label="Wallet"
            Icon={WalletIcon}
            active={currentPath === "/wallet"}
          />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({
  to,
  label,
  Icon,
  active = false,
}: {
  to: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center text-xs transition ${
        active
          ? "text-slate-800 dark:text-slate-200"
          : "text-gray-500 dark:text-gray-400"
      } hover:text-slate-800 dark:hover:text-gray-200`}
    >
      <Icon className="h-6 w-6 mb-1" />
      {label}
    </Link>
  );
};
