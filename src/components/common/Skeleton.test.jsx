import theme from '@styles/theme/theme';
import { render } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it } from 'vitest';

import Skeleton from './Skeleton';

function renderSkeleton(props) {
  return render(
    <ThemeProvider theme={theme}>
      <Skeleton {...props} />
    </ThemeProvider>
  );
}

describe('Skeleton', () => {
  it('보조기기에는 노출하지 않는다', () => {
    const { container } = renderSkeleton();

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('레이아웃에 끼지 않는 span으로 렌더링한다', () => {
    const { container } = renderSkeleton();

    expect(container.firstChild.tagName).toBe('SPAN');
  });

  it('지정한 크기와 모서리를 그대로 쓴다', () => {
    const { container } = renderSkeleton({
      width: '64px',
      height: '64px',
      radius: '50%',
    });

    expect(container.firstChild).toHaveStyle({
      width: '64px',
      height: '64px',
      borderRadius: '50%',
    });
  });
});
