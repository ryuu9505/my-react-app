import styled from 'styled-components';

const DividerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 12px;
  margin-bottom: 16px;
`;

const DividerLine = styled.div`
  width: 100%;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.border};
  margin: 0 ${({ $margin }) => $margin};
`;

export default function Divider({ visible = true, margin = '128px' }) {
  if (!visible) return null;
  return (
    <DividerWrapper>
      <DividerLine $margin={margin} />
    </DividerWrapper>
  );
}
