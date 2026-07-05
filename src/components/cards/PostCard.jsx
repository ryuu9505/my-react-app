import HoverImage from '@components/common/HoverImage';
import {
  Period,
  ProjectCard,
  ProjectContent,
  ProjectDescription,
  ProjectImageContainer,
  ProjectTitle,
} from '@styles/compositions/Project.styles';
import { formatDate } from '@utils/format';
import { toSafeHttpUrl } from '@utils/url';
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const cardLinkStyle = css`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const ExternalLink = styled.a`
  ${cardLinkStyle}
`;

const InternalLink = styled(Link)`
  ${cardLinkStyle}
`;

// 외부 블로그 글은 새 탭으로, 그 외에는 내부 포스트 상세 페이지로 연결한다.
export default function PostCard({ post }) {
  const externalUrl = toSafeHttpUrl(post.externalUrl);

  const body = (
    <>
      <ProjectImageContainer>
        <HoverImage
          baseImage={post.thumbnail?.url}
          alt={post.title}
          showButton={false}
        />
      </ProjectImageContainer>
      <ProjectContent>
        <ProjectTitle $fontSize="1.0rem">{post.title}</ProjectTitle>
        <ProjectDescription $fontSize="0.8rem">
          {post.subtitle}
        </ProjectDescription>
        <Period $fontSize="0.8rem" $fontWeight="100">
          {formatDate(post.createdAt)}
        </Period>
      </ProjectContent>
    </>
  );

  return (
    <ProjectCard $width="256px">
      {externalUrl ? (
        <ExternalLink
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {body}
        </ExternalLink>
      ) : (
        <InternalLink to={`/posts/${post.id}`}>{body}</InternalLink>
      )}
    </ProjectCard>
  );
}
