import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser,setIsCurrentlyLoggedIn } from '../redux/Auth/auth'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, authData ,errorMsg} = useSelector((state) => state.auth);

    const [showAlert, setShowAlert] = useState(false);
    const [showOtherAlert, setOtherShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    useEffect(() => {
        if (error) {
            setOtherShowAlert(true);
            const timer = setTimeout(() => {
                setOtherShowAlert(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);


    const validatePassword = (password, cpassword) => {
        if (password === cpassword) return true;
        setAlertMessage('Please check your entered password!');
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            setAlertMessage('');
        }, 2000);
        return false;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validatePassword(formData.password, formData.confirmPassword)) {
            return;
        }
        
        const responseData = await registerUser({
            name: formData.username,
            email: formData.email,
            password: formData.password,
            navigate
        })
        dispatch(responseData);
        if(!errorMsg){
            dispatch(setIsCurrentlyLoggedIn(true));
        }
    };
    return (
        <Wrapper>
            {showAlert && (
                <Alert key={"danger"} variant={"danger"} style={{ width: "20rem" }}>
                    {alertMessage}
                </Alert>
            )}
                {showOtherAlert && (
                <Alert key={'danger'} variant={'danger'} style={{ width: '15rem' }}>
                    {errorMsg}
                </Alert>
            )}
            <Container className='containerStyle'>
                <Row className="justify-content-center align-items-center full-height">
                    <Col xs={12} md={6}>
                        <h2 className="text-center">Register</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

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

                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className='buttonStyle'>
                                <Button variant="primary" type="submit" style={{ width: "8rem" }}>
                                    {loading ? 'Registering...' : 'Register'}
                                </Button>
                            </div>
                        </Form>
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
`
export default RegisterPage;
