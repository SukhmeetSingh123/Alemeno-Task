import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logedInUser,setIsCurrentlyLoggedIn } from '../redux/Auth/auth';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, errorMsg } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const responseData = await logedInUser({
            email: formData.email,
            password: formData.password,
            navigate
        })
        dispatch(responseData);
        if(errorMsg!=''){
            dispatch(setIsCurrentlyLoggedIn(true));
        }
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <Wrapper>
            {showAlert && (
                <Alert key={'danger'} variant={'danger'} style={{ width: '15rem' }}>
                    {errorMsg}
                </Alert>
            )}

            <Container>
                <Row className="justify-content-center align-items-center full-height">
                    <Col xs={12} md={6}>
                        <h2 className="text-center">Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className='buttonStyle'>
                                <Button variant="primary" type="submit" style={{ width: "8rem" }}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </div>
                        </Form>
                        <div className="text-center mt-3">
                            <p>Don't have an account? <span className="register-link" onClick={handleRegisterClick}>Register</span></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .full-height {
        min-height: 100vh;
    }

    .register-link {
        cursor: pointer;
        color: blue;
    }
`;

export default LoginPage;
