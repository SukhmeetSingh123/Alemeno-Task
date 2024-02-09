import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../redux/Auth/auth';
import { fetchCourses } from '../redux/Courses/courses';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const { courses } = useSelector((state) => state.courses);
  const { userDetail } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  
  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(fetchCourses());
    if (!authToken) {
      navigate('/login');
    }
  }, []);
  
  useEffect(() => {
    if (userDetail && userDetail.enrolledCourses) {
      const filteredCourses = [];
      userDetail.enrolledCourses.forEach(courseId => {
        const foundCourse = courses.find(course => course._id === courseId);
        if (foundCourse) {
          filteredCourses.push(foundCourse);
        }
      });
      setEnrolledCourses(filteredCourses);
    }
  }, [userDetail, courses]);

  const handleNavigation = (courseId) => {
    navigate(`/course/${courseId}`);
};
  return (
    <Container>
      <h1>Enrolled Courses</h1>
      {enrolledCourses.length === 0 && <p>No courses enrolled now.</p>}
      <Row>
        {enrolledCourses.map(course => (
          <Col key={course._id} xs={12} md={6} lg={4}>
            <StyledCard onClick={() => handleNavigation(course._id)}>
              <Card.Img variant="top" src={course.thumbnail} alt={course.name} />
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <p>Instructor: {course.instructor}</p>
              </Card.Body>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const StyledCard = styled(Card)`
border-radius: 10px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
transition: transform 0.3s ease; 

&:hover {
    transform: translateY(-5px); 
}

.card-body {
    padding: 20px;
    height: 250px; /* Set a fixed height for the card body */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-img-top {
    object-fit: cover; /* Ensure images maintain aspect ratio and cover the entire space */
    height: 150px; /* Set a fixed height for the image */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    &:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
}
`;
export default Dashboard;
