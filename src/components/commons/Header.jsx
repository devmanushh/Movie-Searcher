import { t } from "i18next";
import { Typography } from "neetoui";
import { NavLink } from "react-router-dom";

const Header = () => (
  <nav className="fixed top-0 flex w-full items-center justify-between bg-white px-6 py-4 shadow-md">
    <div className="flex items-center space-x-8">
      <Typography className="text-2xl font-medium">
        <span className="text-blue-600">{t("logoName.cine")}</span>
        <span className="ml-1 text-gray-800">{t("logoName.searcher")}</span>
      </Typography>
      <div className="flex space-x-3">
        <NavLink
          exact
          activeClassName="font-semibold text-blue-600"
          className="text-gray-800"
          to="/"
        >
          {t("navigation.home")}
        </NavLink>
        <NavLink
          exact
          activeClassName="font-semibold text-blue-600"
          className="text-gray-800"
          to="/favourites"
        >
          {t("navigation.favourites")}
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Header;
