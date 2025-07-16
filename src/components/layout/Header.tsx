import AlarmIcon from "@/app/_assets/AlarmIcon";
import Logo from "@/app/_assets/Logo";
import SettingsIcon from "@/app/_assets/SettingsIcon";
import Link from "next/link";

type HeaderButtonType = "alarm" | "settings" | "main";
interface HeaderButtonProps {
  type: HeaderButtonType;
}

const HeaderButton = ({ type }: HeaderButtonProps) => {
  const link = {
    alarm: {
      href: "/alarm",
      icon: <AlarmIcon />,
    },
    settings: {
      href: "/settings",
      icon: <SettingsIcon />,
    },
    main: {
      href: "/",
      icon: <Logo />,
    },
  };

  return (
    <Link href={link[type].href} className="flex items-center cursor-pointer">
      {link[type].icon}
    </Link>
  );
};

const Header = () => {
  return (
    <header className="sticky z-10 w-full min-w-80 top-0 px-5 pt-[3.125rem] pb-[0.625rem] bg-white">
      <div className="flex justify-between items-center">
        <HeaderButton type="alarm" />
        <HeaderButton type="main" />
        <HeaderButton type="settings" />
      </div>
    </header>
  );
};

export default Header;
