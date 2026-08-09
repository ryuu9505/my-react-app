import Skeleton from '@components/common/Skeleton';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Frame = styled.span`
  position: relative;
  display: block;
  flex: none;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
`;

const SkeletonLayer = styled.span`
  position: absolute;
  inset: 0;
`;

// 스켈레톤을 페이드아웃시키지 않고 아래에 깔아둔다. 두 전환을 동기화하려 하면
// 그 사이에 깜빡임이 생긴다.
const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ $fit }) => $fit};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 250ms ease-out;
`;

export default function FadeInImage({
  src,
  fallbackSrc,
  alt = '',
  width,
  height,
  fit = 'cover',
  loading,
  fetchPriority,
  showSkeleton = true,
  skeletonRadius = '4px',
  renderError = null,
  className,
  style,
}) {
  const [status, setStatus] = useState('loading');
  const [usingFallback, setUsingFallback] = useState(false);

  const currentSrc = usingFallback ? fallbackSrc : src;

  // 이미지가 이미 브라우저 캐시에 있으면 React가 핸들러를 붙이기 전에 로드가 끝나
  // onLoad가 발화하지 않는다. 그러면 스켈레톤이 영구히 남으므로 마운트 시점에 직접 본다.
  const handleRef = useCallback((node) => {
    if (node?.complete && node.naturalWidth > 0) setStatus('loaded');
  }, []);

  const handleError = () => {
    if (!usingFallback && fallbackSrc && fallbackSrc !== src) {
      setUsingFallback(true);
      setStatus('loading');
      return;
    }
    setStatus('error');
  };

  if (status === 'error') {
    return (
      renderError ?? (
        <Frame
          $width={width}
          $height={height}
          className={className}
          style={style}
        />
      )
    );
  }

  return (
    <Frame $width={width} $height={height} className={className} style={style}>
      {showSkeleton && status === 'loading' && (
        <SkeletonLayer>
          <Skeleton width="100%" height="100%" radius={skeletonRadius} />
        </SkeletonLayer>
      )}
      <Image
        // 폴백으로 갈아탈 때 새 img를 만들어 complete를 다시 평가하게 한다.
        key={currentSrc}
        ref={handleRef}
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchpriority={fetchPriority}
        decoding="async"
        $fit={fit}
        $visible={status === 'loaded'}
        onLoad={() => setStatus('loaded')}
        onError={handleError}
      />
    </Frame>
  );
}
