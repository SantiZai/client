"use client";

import { SERVICES } from "@/lib/models";
import { faCar, faBurn, faShieldAlt, faShower, faUtensils, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const SwitchServiceIcon = ({ service }: { service: SERVICES }) => {
  const [icon, setIcon] = useState<IconDefinition>();

  useEffect(() => {
    switch (service) {
      case SERVICES.buffet:
        setIcon(faUtensils);
        break;
      case SERVICES.showers:
        setIcon(faShower);
        break;
      case SERVICES.parking:
        setIcon(faCar);
        break;
      case SERVICES.grills:
        setIcon(faBurn);
        break;
      case SERVICES.security:
        setIcon(faShieldAlt);
        break;
    }
  }, [service]);

  return <FontAwesomeIcon icon={icon!} className="mr-2" />;
};

export default SwitchServiceIcon;
