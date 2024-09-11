import React from 'react';
import {
  TechStackSection,
  SectionTitle,
  TechList,
  TechCard,
  TechIcon,
  TechName,
  TextContent
} from './TechStackStyles';
import { FaJava } from 'react-icons/fa';
import { SiSpring, SiMysql, SiRedis, SiMongodb, SiApachehadoop, SiApachespark } from 'react-icons/si';

function TechStack() {
  const techs = [
    { name: 'Java', icon: <FaJava /> },
    { name: 'Spring', icon: <SiSpring /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'Redis', icon: <SiRedis /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Hadoop', icon: <SiApachehadoop /> },
    { name: 'Spark', icon: <SiApachespark /> },
  ];

  return (
    <TechStackSection id="tech-stack">
      <SectionTitle>Tech Stack</SectionTitle>
        <TextContent>
            더 적합한 기술이 있다면 적극적으로 도입합니다.
        </TextContent>
      <TechList>
        {techs.map((tech, index) => (
          <TechCard key={index}>
            <TechIcon>{tech.icon}</TechIcon>
            <TechName>{tech.name}</TechName>
          </TechCard>
        ))}
      </TechList>
    </TechStackSection>
  );
}

export default TechStack;