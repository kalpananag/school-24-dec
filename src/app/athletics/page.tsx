'use client'
import React from "react";
import styled from "styled-components";

// Global Theme with brighter and more vibrant colors
const theme = {
  primaryColor: "#00B5E2", // Bright Cyan
  secondaryColor: "#FF3B30", // Vibrant Red
  accentColor: "#FF9F00", // Neon Orange
  backgroundColor: "#f8f8f8", // Light background
  darkTextColor: "#333",
  headingColor: "#111",
  buttonHoverColor: "#FF6347", // Tomato Color
  shadowColor: "rgba(0, 0, 0, 0.2)", // Slightly darker shadow
};

// Container for page content
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.backgroundColor};
`;

// Header Section
const Header = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: ${theme.headingColor};
  letter-spacing: -2px;
  text-transform: uppercase;
  background-image: linear-gradient(135deg, ${theme.primaryColor}, ${theme.accentColor});
  -webkit-background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: ${theme.secondaryColor};
  font-weight: 600;
  margin-top: 15px;
`;

// Sports Teams Section
const TeamsSection = styled.section`
  margin-bottom: 80px;
  width: 100%;
`;

const TeamsTitle = styled.h2`
  font-size: 2.8rem;
  color: ${theme.primaryColor};
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  justify-items: center;
  width: 100%;
`;

const TeamCard = styled.div`
  background: ${theme.primaryColor};
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 20px ${theme.shadowColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  width: 100%;
  max-width: 350px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    background-color: ${theme.secondaryColor};
  }
`;

const TeamImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const TeamTitle = styled.h3`
  font-size: 1.8rem;
  color: white;
  margin-top: 15px;
  text-transform: uppercase;
`;

const TeamDescription = styled.p`
  font-size: 1.1rem;
  color: white;
  line-height: 1.5;
  margin-top: 10px;
`;

// Facilities Section
const FacilitiesSection = styled.section`
  margin-bottom: 80px;
  padding: 40px;
  border-radius: 12px;
  background-image: linear-gradient(135deg, #00b5e2, #ff6347);
  color: white;
  text-align: center;
  width: 100%;
`;

const FacilitiesTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const FacilitiesDescription = styled.p`
  font-size: 1.4rem;
  margin-bottom: 20px;
`;

const FacilitiesImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

// Achievements Section
const AchievementsSection = styled.section`
  margin-bottom: 80px;
  width: 100%;
`;

const AchievementsTitle = styled.h2`
  font-size: 3rem;
  color: ${theme.primaryColor};
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
`;

const AchievementsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const AchievementCard = styled.div`
  background: ${theme.accentColor};
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 6px 20px ${theme.shadowColor};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  width: 300px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const AchievementImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`;

const AchievementTitle = styled.h3`
  font-size: 1.6rem;
  color: white;
  margin-top: 15px;
`;

const AchievementDescription = styled.p`
  font-size: 1.1rem;
  color: white;
  line-height: 1.5;
  margin-top: 10px;
`;

// Get Involved Section
const GetInvolvedSection = styled.section`
  background-color: ${theme.secondaryColor};
  color: white;
  padding: 40px;
  text-align: center;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 40px;
`;

const GetInvolvedTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 20px;
`;

const GetInvolvedDescription = styled.p`
  font-size: 1.4rem;
  margin-bottom: 20px;
`;

const GetInvolvedButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: white;
  background-color: ${theme.primaryColor};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.buttonHoverColor};
  }
`;

// Athletics Page Component
const AthleticsPage: React.FC = () => {
  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Title>Welcome to Our School's Athletics Program</Title>
        <Subtitle>Get involved, stay active, and experience the thrill of competition!</Subtitle>
      </Header>

      {/* Sports Teams Section */}
      <TeamsSection>
        <TeamsTitle>Our Sports Teams</TeamsTitle>
        <TeamsContainer>
          <TeamCard>
            <TeamImage src="https://via.placeholder.com/350x200" alt="Football Team" />
            <TeamTitle>Football</TeamTitle>
            <TeamDescription>
              Our football team competes at the highest levels, with regular league wins and enthusiastic support from the school community.
            </TeamDescription>
          </TeamCard>
          <TeamCard>
            <TeamImage src="https://via.placeholder.com/350x200" alt="Basketball Team" />
            <TeamTitle>Basketball</TeamTitle>
            <TeamDescription>
              Fast-paced and energetic, our basketball team has brought home numerous regional championships.
            </TeamDescription>
          </TeamCard>
          <TeamCard>
            <TeamImage src="https://via.placeholder.com/350x200" alt="Soccer Team" />
            <TeamTitle>Soccer</TeamTitle>
            <TeamDescription>
              The soccer team is known for their skill and teamwork, consistently dominating the league.
            </TeamDescription>
          </TeamCard>
        </TeamsContainer>
      </TeamsSection>

      {/* Facilities Section */}
      <FacilitiesSection>
        <FacilitiesTitle>Our Amazing Facilities</FacilitiesTitle>
        <FacilitiesDescription>
          From indoor courts to outdoor fields, we provide state-of-the-art facilities for all our athletes.
        </FacilitiesDescription>
        <FacilitiesImage src="https://via.placeholder.com/1200x400" alt="Athletic Facilities" />
      </FacilitiesSection>

      {/* Achievements Section */}
      <AchievementsSection>
        <AchievementsTitle>Our Achievements</AchievementsTitle>
        <AchievementsContainer>
          <AchievementCard>
            <AchievementImage src="https://via.placeholder.com/300x200" alt="Championship" />
            <AchievementTitle>Regional Champions</AchievementTitle>
            <AchievementDescription>
              Our football team won the regional championship last year, with an undefeated season.
            </AchievementDescription>
          </AchievementCard>
          <AchievementCard>
            <AchievementImage src="https://via.placeholder.com/300x200" alt="Track" />
            <AchievementTitle>Track Excellence</AchievementTitle>
            <AchievementDescription>
              Our track team earned top placements in several state-level competitions, breaking school records.
            </AchievementDescription>
          </AchievementCard>
        </AchievementsContainer>
      </AchievementsSection>

      {/* Get Involved Section */}
      <GetInvolvedSection>
        <GetInvolvedTitle>Join the Athletic Program</GetInvolvedTitle>
        <GetInvolvedDescription>
          Whether you're an athlete or a fan, there's always room for more support. Join us on the field and help us grow!
        </GetInvolvedDescription>
        <GetInvolvedButton>Get Started</GetInvolvedButton>
      </GetInvolvedSection>
    </Container>
  );
};

export default AthleticsPage;
