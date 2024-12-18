'use client'
import React from "react";
import styled from "styled-components";

// Global Theme (Colors, etc.)
const theme = {
  primaryColor: "#4e7ff2", // Vibrant Blue
  secondaryColor: "#FF9F00", // Bright Orange
  accentColor: "#FF4081", // Pink Accent
  backgroundColor: "#f8f8f8", // Light Grey
  textColor: "#333", // Dark Text for readability
  headingColor: "#111", // Dark Heading
  hoverColor: "#2a72d7", // Hover Effect Blue
  gradientBackground: "linear-gradient(135deg, #4e7ff2, #FF9F00)", // Gradient Background
};

// Section Container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: ${theme.backgroundColor};
`;

// Header Section with Gradient Background
const Header = styled.header`
  background: ${theme.gradientBackground};
  color: white;
  padding: 60px 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -1px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${theme.gradientBackground};
  font-weight: 600;
  margin-top: 10px;
`;

// Cards Container for Clubs, Activities, and Sports
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  color: ${theme.primaryColor};
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const CardContent = styled.p`
  font-size: 1.1rem;
  color: ${theme.textColor};
  line-height: 1.5;
  margin-bottom: 20px;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${theme.primaryColor};
  }
`;

// Testimonial Section with Background Image
const TestimonialSection = styled.section`
  margin-top: 60px;
  background: url("https://source.unsplash.com/random/1600x900?students") center/cover no-repeat;
  color: green;
  padding: 60px 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const TestimonialTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
`;

const TestimonialQuote = styled.p`
  font-size: 1.4rem;
  font-style: italic;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
`;

// Events Section with Interactive Hover Effects
const EventsSection = styled.section`
  margin-top: 60px;
  text-align: center;
`;

const EventsTitle = styled.h2`
  font-size: 2.5rem;
  color: ${theme.primaryColor};
  font-weight: 700;
  margin-bottom: 30px;
`;

const EventList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 30px;
`;

const EventCard = styled.div`
  background: ${theme.primaryColor};
  padding: 20px;
  border-radius: 12px;
  width: 250px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  color: white;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const EventTitle = styled.h4`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const EventDate = styled.p`
  font-size: 1.1rem;
  color: #f9f9f9;
`;

// Main StudentLife Page Component
const StudentLifePage: React.FC = () => {
  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Title>Student Life at Shri Vishwakarma Middle School</Title>
        <Subtitle>Discover the exciting opportunities, clubs, and experiences our students have every day!</Subtitle>
      </Header>

      {/* Clubs & Activities Section */}
      <section>
        <h2 style={{ fontSize: "2.5rem", color: theme.primaryColor, textAlign: "center", marginBottom: "30px" }}>
          Clubs & Activities
        </h2>
        <CardsContainer>
          <Card>
            <CardTitle>Student Government</CardTitle>
            <CardContent>
              Get involved in shaping the student experience through leadership, teamwork, and decision-making!
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Science Club</CardTitle>
            <CardContent>
              Explore the wonders of science through experiments, projects, and fascinating field trips.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Debate Team</CardTitle>
            <CardContent>
              Hone your public speaking and critical thinking skills while engaging in lively debates on various topics.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Photography Club</CardTitle>
            <CardContent>
              Learn photography techniques, work on creative projects, and display your work in our school exhibitions.
            </CardContent>
          </Card>
        </CardsContainer>
      </section>

      {/* Sports & Athletics Section */}
      <section>
        <h2 style={{ fontSize: "2.5rem", color: theme.primaryColor, textAlign: "center", marginBottom: "30px" }}>
          Sports & Athletics
        </h2>
        <CardsContainer>
          <Card>
            <CardTitle>Basketball</CardTitle>
            <CardContent>
              Show off your skills on the court and compete with fellow students in local tournaments.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Soccer</CardTitle>
            <CardContent>
              Join the soccer teams and compete in friendly games, improving your technique and fitness.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Track & Field</CardTitle>
            <CardContent>
              Whether running sprints or jumping hurdles, we offer an exciting track experience for all levels.
            </CardContent>
          </Card>
        </CardsContainer>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection>
        <TestimonialTitle>What Our Students Say</TestimonialTitle>
        <TestimonialQuote>
          "Being part of the drama club changed my life! I made new friends, gained confidence, and learned valuable skills."
        </TestimonialQuote>
        <TestimonialAuthor>- Apoorva, 8th Grade</TestimonialAuthor>
      </TestimonialSection>

      {/* Upcoming Events Section */}
      <EventsSection>
        <EventsTitle>Upcoming Events</EventsTitle>
        <EventList>
          <EventCard>
            <EventTitle>Back to School Bash</EventTitle>
            <EventDate>August 20, 2024</EventDate>
          </EventCard>
          <EventCard>
            <EventTitle>Homecoming Dance</EventTitle>
            <EventDate>September 30, 2024</EventDate>
          </EventCard>
          <EventCard>
            <EventTitle>Winter Talent Show</EventTitle>
            <EventDate>December 15, 2024</EventDate>
          </EventCard>
        </EventList>
      </EventsSection>
    </Container>
  );
};

export default StudentLifePage;
