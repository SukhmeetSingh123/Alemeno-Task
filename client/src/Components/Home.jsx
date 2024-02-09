import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Row, Col, Spinner, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchCourses, updateCourses } from '../redux/Courses/courses';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, courses } = useSelector((state) => state.courses);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [likedCourses, setLikedCourses] = useState([]);
    useEffect(() => {
        dispatch(fetchCourses());
    }, []);

    useEffect(() => {
        setFilteredCourses(
            courses.filter(course =>
                course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, courses]);

    const handleLiked = async(e, courseDetail) => {
        e.preventDefault();
        const updatedCourse = { ...courseDetail, likes: courseDetail.likes + 1 };
        await dispatch(updateCourses(updatedCourse)); 
        await dispatch(fetchCourses()); 
        setLikedCourses([...likedCourses, courseDetail._id]); 
    };
    
    
    const handleUnliked = async(e,courseDetail) => {
        e.preventDefault();
        const updatedCourse = { ...courseDetail, likes: courseDetail.likes - 1 };
        await dispatch(updateCourses(updatedCourse)); 
        await dispatch(fetchCourses()); 
        setLikedCourses(likedCourses.filter(courseId => courseId !== courseDetail._id));
    };

    const handleEnrollButton = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <Wrapper>
            <h1 style={{ margin: '2rem' }}>Courses List</h1>
            <Form.Group style={{ margin: '2rem', width: "50%" }} controlId="search">
                <Form.Control
                    type="text"
                    placeholder="Search by course or instructor"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </Form.Group>

            {loading ? (
                <LoadingSpinner animation="border" role="status" />
            ) : (
                <Row xs={1} sm={2} md={3} lg={4} style={{ gap: '20px' }}>
                    {filteredCourses.length === 0 && <p>No courses available....</p>}
                    {filteredCourses.map(course => (
                        <Col key={course._id}>
                            <CustomCard>
                                {course.thumbnail && <Card.Img variant="top" src={course.thumbnail} />}
                                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }} >
                                    <div>
                                        <Card.Title>{course.name}</Card.Title>
                                        <Card.Text>{course.description}</Card.Text>
                                        <Card.Text style={{ textDecoration: 'underline' }}>Instructor: {course.instructor}</Card.Text>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Button variant="primary" onClick={() => handleEnrollButton(course._id)}>Enroll Now</Button>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {likedCourses.includes(course._id) ? (
                                                <FaHeart
                                                    style={{ color: "red" }}
                                                    onClick={(e) => handleUnliked(e,course)}
                                                />
                                            ) : (
                                                <AiOutlineHeart
                                                    onClick={(e) => handleLiked(e,course)}
                                                />
                                            )}
                                            <span style={{ marginLeft: '0.25rem' }}> {course.likes}</span>
                                        </div>

                                    </div>
                                </Card.Body>


                            </CustomCard>
                        </Col>
                    ))}
                </Row>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.section`
   margin:2rem;
`;

const CustomCard = styled(Card)`
    border: none;
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


const LoadingSpinner = styled(Spinner)`
    margin: 20px auto;
    display: block;
`;

export default Home;
