import React from 'react';
import { FaCertificate } from 'react-icons/fa';
import styled from 'styled-components';

const StyledCertBadge = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0px;
  width: 150px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
  }

  .cert-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #000000;
    z-index: 2;
  }

  img {
    width: 128px;
    height: 128px;
    object-fit: contain;
    border-radius: 12px;
    background: #fff;
    padding: 4px 8px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    padding: 10px;
    .cert-icon {
      width: auto;
      height: auto;
      font-size: 0.8rem;
      top: 4px;
      left: 4px;
    }
    img {
      width: 60px;
      height: 60px;
      padding: 2px 4px;
    }
  }
`;

export default function CertBadge({ img, url, alt = 'cert badge' }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <StyledCertBadge>
        <span className="cert-icon">
          <FaCertificate />
        </span>
        <img src={img} alt={alt} />
      </StyledCertBadge>
    </a>
  );
}
