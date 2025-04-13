import React from "react";

import { t } from "i18next";
import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title={t("pageNotFound.message")}
      primaryButtonProps={{
        label: t("pageNotFound.backToHome"),
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default PageNotFound;
