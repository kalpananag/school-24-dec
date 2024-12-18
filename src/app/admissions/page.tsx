'use client'
import React from "react";
import styled from "styled-components";

// Global Styles (CSS Variables)
const theme = {
  primaryColor: "#4e7ff2", // Vibrant Blue
  secondaryColor: "#FF9F00", // Golden Accent
  backgroundColor: "#f8f8f8", // Light Background
  textColor: "#333", // Dark Text for readability
  lightTextColor: "#777", // Light Text for Less Emphasis
  buttonColor: "#2a72d7", // Button Color
};

// Section Styles
const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: ${theme.primaryColor};
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.lightTextColor};
`;

const Section = styled.section`
  background-color: white;
  padding: 40px;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
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

const StepList = styled.ol`
  padding-left: 20px;
  margin-bottom: 20px;
`;

const StepItem = styled.li`
  font-size: 1.1rem;
  color: ${theme.textColor};
  margin: 10px 0;
  position: relative;
  &:before {
    content: "🔹";
    position: absolute;
    left: -20px;
    color: ${theme.secondaryColor};
  }
`;

const Button = styled.a`
  display: inline-block;
  background-color: ${theme.buttonColor};
  color: white;
  font-size: 1.1rem;
  padding: 12px 30px;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  text-align: center;
  &:hover {
    background-color: ${theme.secondaryColor};
  }
`;

const ContactSection = styled.section`
  text-align: center;
`;

const ContactInfo = styled.p`
  font-size: 1.1rem;
  color: ${theme.textColor};
`;

const SocialLinks = styled.div`
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: ${theme.primaryColor};
  font-size: 1.3rem;
  margin: 0 15px;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover {
    color: ${theme.secondaryColor};
  }
`;

const AdmissionsPage: React.FC = () => {
  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Title>Admissions</Title>
        <Subtitle>We're excited to welcome new students to our community!</Subtitle>
      </Header>

      {/* Admissions Process Section */}
      <Section>
        <SectionTitle>How to Apply</SectionTitle>
        <Content>
          We have a simple 4-step admissions process to guide you through your
          application. Please follow these steps to apply to Shri Vishwakarma Middle School.
        </Content>
        <StepList>
          <StepItem>Step 1: Complete the Online Application Form</StepItem>
          <StepItem>Step 2: Submit Required Documents (e.g., birth certificate, report cards)</StepItem>
          <StepItem>Step 3: Attend an Interview (Virtual or In-Person)</StepItem>
          <StepItem>Step 4: Receive Your Admission Decision</StepItem>
        </StepList>
        <Button href="#apply-now">Apply Now</Button>
      </Section>

      {/* Financial Aid Section */}
      <Section>
        <SectionTitle>Financial Aid & Scholarships</SectionTitle>
        <Content>
          We offer financial aid and scholarships for qualifying families. If
          you are interested in learning more about our financial aid options,
          please complete the application form or contact our admissions office.
        </Content>
        <Button href="#financial-aid">Learn More</Button>
      </Section>

      {/* Contact Section */}
      <ContactSection>
        <SectionTitle>Contact Admissions</SectionTitle>
        <Content>
          If you have any questions, please don't hesitate to reach out to our
          admissions team. We are here to help you through the entire process.
        </Content>
        <ContactInfo>
          Email: <strong>admissions@schoolname.com</strong>
        </ContactInfo>
        <ContactInfo>
          Phone: <strong>(123) 456-7890</strong>
        </ContactInfo>
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
      </ContactSection>
    </Container>
  );
};

export default AdmissionsPage;
