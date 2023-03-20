import React from "react";
import MobileParent from "./MobileParent";
import MobileChild from './MobileChild';
import type { CountryCode } from '@tisf/rn-providers';

export interface IMobileScreen {
  countries?: CountryCode[];
  social?: boolean;
}

export const createMobileScreen = (child: IMobileScreen): React.FC => {
  return props => (
    <MobileParent {...props}>
      <MobileChild {...child} />
    </MobileParent>
  );
}
