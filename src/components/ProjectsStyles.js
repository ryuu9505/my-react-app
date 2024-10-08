import styled from 'styled-components';

// 섹션 전체 컨테이너 스타일
export const ProjectsSection = styled.section`
  width: 100%;
  padding: 0px 20px;
  padding-top: 120px;
  padding-bottom: 200px;
  background-color: ${({ theme }) => theme.colors.background}; // 화이트 배경
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight}; // 진한 그레이 텍스트 색상
`;

// 섹션 제목 스타일
export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 40px;
`;

// 텍스트 컨텐츠 스타일
export const TextContent = styled.div`
    margin-top: 40px;
    font-size: 1.6rem;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.pr};
    margin-bottom: 40px;
`;

// 프로젝트 리스트 스타일
export const ProjectList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

// 프로젝트 카드 스타일
export const ProjectCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

// 이미지 컨테이너 추가
export const ProjectImageContainer = styled.div`
  width: 100%;  // 부모 요소의 너비를 100%로 설정
  aspect-ratio: 3 / 1;  // 컨테이너의 비율을 3:1로 설정
  overflow: hidden;  // 이미지가 넘치지 않도록 숨김
  position: relative;  // 포지션을 상대적으로 설정하여 자식 요소 위치 조정
`;

// 프로젝트 이미지 스타일 업데이트
export const ProjectImage = styled.img`
  width: 100%;  // 이미지의 너비를 컨테이너에 맞춤
  height: 100%;  // 이미지 높이를 컨테이너에 맞춤
  object-fit: cover;  // 이미지가 비율에 맞게 잘리도록 설정
  position: absolute;  // 이미지 위치를 절대값으로 설정하여 컨테이너에 맞춤
  top: 0;
  left: 0;
  border-radius: 8px 8px 0 0;
`;

// 프로젝트 내용 스타일
export const ProjectContent = styled.div`
  padding: 20px;
  text-align: left;
`;

// 프로젝트 제목 스타일
export const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0px;
`;

// 프로젝트 설명 스타일
export const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

// 도메인 스타일
export const ProjectDomain = styled.a`
  display: inline;
  font-size: 0.9rem; // 도메인 주소의 글씨 크기 설정
  color: #646464;
  margin-bottom: 10px;
  text-decoration: underline;

  &:hover {
    color: #000000
  }
`;

// 도메인 및 아이콘을 감싸는 컨테이너 스타일
export const ProjectLinksContainer = styled.div`
//   align-items: center;  // 수직 정렬
//   margin: 8px 0;  // 위아래 여백 설정
`;

// 프로젝트 링크 스타일
export const ProjectLink = styled.a`
  display: inline-block;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin-right: 4px;
  margin-top: 4px;
  
  &:hover {
    // background: linear-gradient(145deg, #0064d9, #6fb3ff); /* 호버 시 그라데이션 방향 변경 */
    // box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(255, 255, 255, 0.6); /* 호버 시 그림자 강도 증가 */
    transform: translateY(-2px); /* 호버 시 살짝 떠오르는 효과 */
  }

  &:active {
    // box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2), inset -2px -2px 5px rgba(255, 255, 255, 0.5); /* 클릭 시 움푹 들어간 효과 */
    transform: translateY(0px); /* 클릭 시 원래 위치로 복귀 */
  }

`;

// 프로젝트 태그를 감싸는 컨테이너 스타일
export const ProjectTagsContainer = styled.div`
  margin-top: 10px;  /* 위쪽 여백 */
  margin-bottom: 10px;  /* 아래쪽 여백 */
  display: flex;  /* 플렉스박스 사용 */
  flex-wrap: wrap;  /* 여러 줄로 감싸기 */
  gap: 5px;  /* 태그 사이의 간격 */
`;

// 프로젝트 태그 스타일
export const ProjectTag = styled.a`
  background: ${({ theme }) => theme.colors.primary};
  color: white;  /* 흰색 텍스트 */
  padding: 3px 8px;  /* 내부 여백 */
  border-radius: 4px;  /* 테두리 둥글게 */
  font-size: 0.8rem;  /* 글씨 크기 */
  cursor: default;  /* 마우스 커서 설정 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2), -2px -2px 5px rgba(255, 255, 255, 0.5); /* 입체감을 위한 그림자 */
  transition: all 0.3s ease;  /* 전환 효과 */

  &:hover {
    // background: linear-gradient(145deg, #0064d9, #6fb3ff); /* 호버 시 그라데이션 방향 변경 */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(255, 255, 255, 0.6); /* 호버 시 그림자 강도 증가 */
    transform: translateY(-2px); /* 호버 시 살짝 떠오르는 효과 */
  }

  &:active {
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2), inset -2px -2px 5px rgba(255, 255, 255, 0.5); /* 클릭 시 움푹 들어간 효과 */
    transform: translateY(0px); /* 클릭 시 원래 위치로 복귀 */
  }
`;