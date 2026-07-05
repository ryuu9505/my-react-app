import getLabel from '@utils/getLabel';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiTistory } from 'react-icons/si';
import styled from 'styled-components';

export const Icon = styled.a`
  color: ${({ theme }) => theme.colors.iconLight};
  font-size: 2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  tistory: SiTistory,
};

export function IconButton({ icon, href }) {
  const IconComponent = iconMap[icon];
  if (!IconComponent) return null;
  const label = getLabel(icon);
  return (
    <Icon
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <IconComponent />
    </Icon>
  );
}
