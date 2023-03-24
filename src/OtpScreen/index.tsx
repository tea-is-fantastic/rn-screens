import React from 'react';
import OtpParent from './OtpParent';
import OtpChild from './OtpChild';

export interface IOtpScreen {
  digits?: number;
}

export const createOtpScreen = (child: IOtpScreen): React.FC => {
  return props => (
    <OtpParent {...props}>
      <OtpChild {...child} />
    </OtpParent>
  );
}
