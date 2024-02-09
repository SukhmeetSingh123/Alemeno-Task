import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourses } from '../redux/Courses/courses';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { updateLoginUser,setErrorMsg } from '../redux/Auth/auth';
import { useNavigate } from 'react-router-dom';
const SingleCourseDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { courses } = useSelector((state) => state.courses);
  const { errorMsg,isCurrentlyLogenInValue } = useSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  const course = courses.find(course => course._id === id);
  const handleEnrollButton = (courseId) => {
    if (isCurrentlyLogenInValue) {
      dispatch(updateLoginUser({courseId,navigate}));
    }else{
      navigate('/login')
    }
  }

  useEffect(() => {
    if (errorMsg) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(setErrorMsg(''))
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  return (
    <Container>
      {showAlert && <Alert variant="danger">{errorMsg}</Alert>}
      {!showAlert && !course && <div>No Course Found...</div>}
      {course && (
        <>
          <Title>{course.name}</Title>
          <Row>
            <Col md={6}>
              <CourseCard>
                <Card.Img variant="top" src={course.thumbnail} />
                <Card.Body>
                  <Card.Title>{course.name}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text style={{ color: course.enrollmentStatus === 'Open' ? 'green' : 'red' }}>
                    Enrollment Status: {course.enrollmentStatus}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleEnrollButton(course._id)} disabled={course.enrollmentStatus !== 'Open'}>
                    Enroll Now
                  </Button>
                </Card.Body>
              </CourseCard>
            </Col>
            <Col md={6}>
              <DetailsCard>
                <Card.Body>
                  <Card.Title>Instructor: {course.instructor}</Card.Title>
                  <Card.Text>Duration: {course.duration}</Card.Text>
                  <Card.Text>Schedule: {course.schedule}</Card.Text>
                  <Card.Text>Location: {course.location}</Card.Text>
                  <Card.Text>Likes: {course.likes}</Card.Text>
                </Card.Body>
              </DetailsCard>
            </Col>
          </Row>
          <Row>
            <Col>
              <Prerequisites>
                <h2>Prerequisites</h2>
                <ul style={{ listStyleType: 'disc' }}>
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </Prerequisites>
            </Col>
          </Row>
          <Row>
            <Col>
              <Syllabus>
                <h2>Syllabus</h2>
                {course.syllabus.map((item, index) => (
                  <CourseCard key={index}>
                    <Card.Body>
                      <Card.Title>Week {item.week}</Card.Title>
                      <Card.Text><strong>Topic:</strong> {item.topic}</Card.Text>
                      <Card.Text><strong>Content:</strong> {item.content}</Card.Text>
                    </Card.Body>
                  </CourseCard>
                ))}
              </Syllabus>
            </Col>
          </Row>
        </>
      )}
      
    </Container>
  );
};

const Title = styled.h1`
    margin-top: 20px;
    margin-bottom: 40px;
`;

const CourseCard = styled(Card)`
    margin-bottom: 20px;
`;

const DetailsCard = styled(Card)`
    margin-bottom: 20px;
`;

const Prerequisites = styled.div`
    margin-bottom: 20px;

    ul {
        list-style-type: none;
        padding-left: 0;
    }
`;

const Syllabus = styled.div`
    margin-bottom: 20px;
`;

export default SingleCourseDetail;
