import {
  Section as StyledSection,
  SectionTitle as StyledSectionTitle,
} from '@styles/compositions/Section.styles';
import React from 'react';
import { useTheme } from 'styled-components';

function resolveColors(theme, colorScheme) {
  if (colorScheme === 'dark') {
    return {
      background: theme.colors.backgroundDark,
      color: theme.colors.textDark,
    };
  }
  if (colorScheme === 'light') {
    return {
      background: theme.colors.backgroundLight,
      color: theme.colors.textLight,
    };
  }
  return { background: theme.colors.background, color: theme.colors.text };
}

export const Section = ({
  children,
  colorScheme = 'default',
  visible = true,
  padding,
  ...props
}) => {
  const theme = useTheme();
  if (!visible) return null;

  const { background, color } = resolveColors(theme, colorScheme);

  return (
    <StyledSection
      $background={background}
      $color={color}
      $padding={padding}
      {...props}
    >
      {children}
    </StyledSection>
  );
};

export const SectionTitle = ({
  children,
  colorScheme = 'default',
  ...props
}) => {
  const theme = useTheme();
  const { color } = resolveColors(theme, colorScheme);

  return (
    <StyledSectionTitle $color={color} {...props}>
      {children}
    </StyledSectionTitle>
  );
};
