'use client'
import React from "react";
import styled from "styled-components";

// Global Styles (CSS Variables for customization)
const theme = {
  primaryColor: "#4e7ff2", // vibrant blue
  secondaryColor: "#FF9F00", // golden accent color
  backgroundColor: "#f8f8f8", // light background
  textColor: "#333", // dark text for readability
  lightTextColor: "#777", // light text for less emphasis
  headerHeight: "120px",
};

// Header Section
const Header = styled.header`
  background-color: ${theme.primaryColor};
  color: white;
  padding: 40px 20px;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 40px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.secondaryColor};
  margin-top: 10px;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${theme.backgroundColor};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-bottom: 40px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${theme.primaryColor};
  margin-bottom: 20px;
  font-weight: 700;
`;

const Content = styled.p`
  font-size: 1.1rem;
  color: ${theme.textColor};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  color: ${theme.textColor};
  margin: 10px 0;
  padding-left: 20px;
  position: relative;
  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${theme.secondaryColor};
  }
`;

const Footer = styled.footer`
  background-color: ${theme.primaryColor};
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1rem;
  margin-top: 40px;
  border-radius: 8px;
`;

const SocialLinks = styled.div`
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.2rem;
  margin: 0 10px;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: ${theme.secondaryColor};
  }
`;

const SchoolPage: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <Header>
        Welcome to Shri Vishwakarma Middle School
        <Subtitle>Inspiring Curiosity. Fostering Excellence. Shaping Future Leaders.</Subtitle>
      </Header>

      {/* Main Content */}
      <MainContent>
        {/* Mission Section */}
        <Section>
          <Title>Our Mission</Title>
          <Content>
            At Shri Vishwakarma Middle School, we believe in nurturing students' potential, fostering curiosity, and guiding them toward becoming lifelong learners and responsible global citizens.
          </Content>
        </Section>

        {/* Curriculum Section */}
        <Section>
          <Title>Curriculum Highlights</Title>
          <h3>Core Subjects</h3>
          <List>
            <ListItem>English Language Arts</ListItem>
            <ListItem>Mathematics</ListItem>
            <ListItem>Science</ListItem>
            <ListItem>Social Studies</ListItem>
          </List>

          <h3>Elective Subjects</h3>
          <List>
            <ListItem>Art</ListItem>
            <ListItem>Music</ListItem>
            <ListItem>Physical Education</ListItem>
            <ListItem>Technology & Coding</ListItem>
            <ListItem>Foreign Languages (Spanish/French)</ListItem>
          </List>
        </Section>

        {/* Important Announcements */}
        <Section>
          <Title>Important Announcements</Title>
          <List>
            <ListItem>
              <strong>Holiday Break:</strong> School will be closed from December
              22 to January 5. Enjoy the holidays!
            </ListItem>
            <ListItem>
              <strong>Parent-Teacher Conferences:</strong> January 10–12, 2024.
              Please schedule your meeting online.
            </ListItem>
            <ListItem>
              <strong>Science Fair Registration:</strong> Deadline for sign-ups
              is January 15, 2024.
            </ListItem>
          </List>
        </Section>
      </MainContent>

      {/* Footer Section */}
      <Footer>
        <p>&copy; {new Date().getFullYear()} Shri Vishwakarma Middle School. All Rights Reserved.</p>
        <p>Follow us on social media!</p>
        <SocialLinks>
          <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </SocialLink>
          |
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </SocialLink>
          |
          <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </SocialLink>
        </SocialLinks>
      </Footer>
    </div>
  );
};

export default SchoolPage;
