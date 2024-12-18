'use client'
import React from "react";
import styled from "styled-components";

// Global Theme
const theme = {
  primaryColor: "#4e7ff2", // Vibrant Blue
  secondaryColor: "#FF9F00", // Orange Accent
  backgroundColor: "#f8f8f8", // Light Background
  textColor: "#333", // Dark Text
  headingColor: "#111", // Dark Heading
  buttonHoverColor: "#2a72d7", // Button Hover Effect
};

// Container for whole page
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
  color: ${theme.headingColor};
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${theme.primaryColor};
  font-weight: 600;
  margin-top: 10px;
`;

// Arts Gallery Section
const GallerySection = styled.section`
  margin-bottom: 60px;
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${theme.primaryColor};
  text-align: center;
  margin-bottom: 40px;
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  width: 100%;
`;

const GalleryCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  width: 100%;
  max-width: 350px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  border-radius: 8px;
  height: 250px;
  object-fit: cover;
`;

const GalleryTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.primaryColor};
  margin-top: 15px;
  text-align: center;
`;

// Performing Arts Section
const PerformingArtsSection = styled.section`
  margin-bottom: 60px;
  background-color: ${theme.primaryColor};
  color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
`;

const PerformingArtsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PerformingArtsDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

// Student Highlights Section
const HighlightsSection = styled.section`
  margin-bottom: 60px;
  width: 100%;
`;

const HighlightsTitle = styled.h2`
  font-size: 2.5rem;
  color: ${theme.primaryColor};
  text-align: center;
  margin-bottom: 40px;
`;

const HighlightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px;
  justify-items: center;
`;

const HighlightCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  text-align: center;
`;

const HighlightImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const HighlightText = styled.p`
  font-size: 1.1rem;
  color: ${theme.textColor};
  margin-top: 15px;
`;

// Get Involved Section
const GetInvolvedSection = styled.section`
  background-color: ${theme.secondaryColor};
  color: white;
  padding: 40px;
  text-align: center;
  border-radius: 8px;
`;

const GetInvolvedTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const GetInvolvedDescription = styled.p`
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const GetInvolvedButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  color: white;
  background-color: ${theme.primaryColor};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${theme.buttonHoverColor};
  }
`;

// Arts Page Component
const ArtsPage: React.FC = () => {
  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Title>Explore the Arts at Our School</Title>
        <Subtitle>Creativity, expression, and passion are at the heart of our arts programs.</Subtitle>
      </Header>

      {/* Arts Gallery Section */}
      <GallerySection>
        <SectionTitle>Art Gallery</SectionTitle>
        <GalleryContainer>
          <GalleryCard>
            <GalleryImage src="https://via.placeholder.com/350x250" alt="Art 1" />
            <GalleryTitle>Student Artwork 1</GalleryTitle>
          </GalleryCard>
          <GalleryCard>
            <GalleryImage src="https://via.placeholder.com/350x250" alt="Art 2" />
            <GalleryTitle>Student Artwork 2</GalleryTitle>
          </GalleryCard>
          <GalleryCard>
            <GalleryImage src="https://via.placeholder.com/350x250" alt="Art 3" />
            <GalleryTitle>Student Artwork 3</GalleryTitle>
          </GalleryCard>
        </GalleryContainer>
      </GallerySection>

      {/* Performing Arts Section */}
      <PerformingArtsSection>
        <PerformingArtsTitle>Performing Arts</PerformingArtsTitle>
        <PerformingArtsDescription>
          Our performing arts program includes theater, dance, and music. Students have the opportunity to perform on stage, learn instruments, and
          express themselves through various forms of performance.
        </PerformingArtsDescription>
      </PerformingArtsSection>

      {/* Student Highlights Section */}
      <HighlightsSection>
        <HighlightsTitle>Student Highlights</HighlightsTitle>
        <HighlightsContainer>
          <HighlightCard>
            <HighlightImage src="https://via.placeholder.com/350x200" alt="Highlight 1" />
            <HighlightText>
              "Jane Doe's painting was selected for a regional competition. Her abstract style continues to inspire her peers."
            </HighlightText>
          </HighlightCard>
          <HighlightCard>
            <HighlightImage src="https://via.placeholder.com/350x200" alt="Highlight 2" />
            <HighlightText>
              "John Smith's band performed at the annual spring concert, receiving praise from the local community for their musical talent."
            </HighlightText>
          </HighlightCard>
        </HighlightsContainer>
      </HighlightsSection>

      {/* Get Involved Section */}
      <GetInvolvedSection>
        <GetInvolvedTitle>Get Involved in the Arts</GetInvolvedTitle>
        <GetInvolvedDescription>
          Whether you are a student interested in pursuing the arts or a parent looking to support the program, there are many ways to get involved!
        </GetInvolvedDescription>
        <GetInvolvedButton>Learn More</GetInvolvedButton>
      </GetInvolvedSection>
    </Container>
  );
};

export default ArtsPage;
