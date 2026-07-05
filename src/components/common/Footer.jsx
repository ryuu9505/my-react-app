import { socialData } from '@assets/data';
import { IconButton } from '@styles/IconStyles';
import { FooterContainer, FooterIconList } from '@styles/layout/FooterStyles';
import React from 'react';

function Footer() {
  return (
    <FooterContainer>
      <FooterIconList>
        {socialData.map(({ id, icon, href }) => (
          <IconButton key={id} icon={icon} href={href} />
        ))}
      </FooterIconList>
      <div>
        Copyright © {new Date().getFullYear()} Unblind. All rights reserved.
      </div>
    </FooterContainer>
  );
}

export default Footer;
