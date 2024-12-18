'use client'
import React, { useState } from "react";
import styled from "styled-components";

// Global Theme (Colors, etc.)
const theme = {
  primaryColor: "#4e7ff2", // Vibrant Blue
  secondaryColor: "#FF9F00", // Orange Accent
  backgroundColor: "#f8f8f8", // Light Background
  textColor: "#333", // Dark Text for readability
  headingColor: "#111", // Dark Heading
  buttonHoverColor: "#2a72d7", // Button Hover Effect
};

// Section Container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Header Section
const Header = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: green;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${theme.primaryColor};
  font-weight: 600;
  margin-top: 10px;
`;

// Support Options Section
const SupportOptionsSection = styled.section`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: ${theme.primaryColor};
  margin-bottom: 40px;
`;

const SupportOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px;
  justify-items: center;
  width: 100%;
`;

const SupportCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  text-align: center;
  cursor: pointer;
  width: 100%;
  max-width: 350px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const SupportCardTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.primaryColor};
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const SupportCardDescription = styled.p`
  font-size: 1.1rem;
  color: ${theme.textColor};
  line-height: 1.5;
`;

// Donation Form Section
const DonationFormSection = styled.section`
  margin-top: 60px;
  background-color: ${theme.primaryColor};
  padding: 40px;
  border-radius: 8px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FormTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
  outline: none;
  &:focus {
    border-color: ${theme.primaryColor};
  }
`;

const Textarea = styled.textarea`
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
  height: 150px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.1rem;
  outline: none;
  &:focus {
    border-color: ${theme.primaryColor};
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: white;
  background-color: ${theme.secondaryColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${theme.buttonHoverColor};
  }
`;

// Success Stories Section
const SuccessStoriesSection = styled.section`
  margin-top: 60px;
`;

const StoriesTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: ${theme.primaryColor};
  margin-bottom: 30px;
`;

const StoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  justify-items: center;
  width: 100%;
`;

const StoryCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const StoryCardTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.primaryColor};
  font-weight: 700;
  margin-bottom: 15px;
`;

const StoryCardText = styled.p`
  font-size: 1.1rem;
  color: ${theme.textColor};
  line-height: 1.6;
  margin-bottom: 20px;
`;

// Main SupportUs Page Component
const SupportUsPage: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your support! Amount: $${donationAmount}\nMessage: ${message}`);
  };

  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Title>Support Our School</Title>
        <Subtitle>Your contributions help us create a better learning experience for all students!</Subtitle>
      </Header>

      {/* Ways to Support Section */}
      <SupportOptionsSection>
        <SectionTitle>Ways You Can Support</SectionTitle>
        <SupportOptionsContainer>
          <SupportCard>
            <SupportCardTitle>Donate</SupportCardTitle>
            <SupportCardDescription>
              Your donation makes a direct impact on the quality of education, resources, and activities available to our students.
            </SupportCardDescription>
          </SupportCard>
          <SupportCard>
            <SupportCardTitle>Volunteer</SupportCardTitle>
            <SupportCardDescription>
              Give your time and expertise! We welcome volunteers to assist with school events, tutoring, and extracurricular activities.
            </SupportCardDescription>
          </SupportCard>
          <SupportCard>
            <SupportCardTitle>Fundraising</SupportCardTitle>
            <SupportCardDescription>
              Join our fundraising efforts by participating in or hosting events that raise funds for our programs and initiatives.
            </SupportCardDescription>
          </SupportCard>
        </SupportOptionsContainer>
      </SupportOptionsSection>

      {/* Donation Form Section */}
      <DonationFormSection>
        <FormTitle>Make a Donation</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Donation Amount ($)"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
          />
          <Textarea
            placeholder="Message (Optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SubmitButton type="submit">Donate Now</SubmitButton>
        </Form>
      </DonationFormSection>

      {/* Success Stories Section */}
      <SuccessStoriesSection>
        <StoriesTitle>Success Stories</StoriesTitle>
        <StoriesContainer>
          <StoryCard>
            <StoryCardTitle>John Doe's Contribution</StoryCardTitle>
            <StoryCardText>
              "My donation helped fund new sports equipment and expand the school's after-school programs. It feels great to contribute to the success of the students!"
            </StoryCardText>
          </StoryCard>
          <StoryCard>
            <StoryCardTitle>Jane Smith's Volunteering</StoryCardTitle>
            <StoryCardText>
              "Volunteering at the annual school event was an incredible experience. I met other parents and saw firsthand the impact the school has on students' lives."
            </StoryCardText>
          </StoryCard>
        </StoriesContainer>
      </SuccessStoriesSection>
    </Container>
  );
};

export default SupportUsPage;
