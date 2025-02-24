import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import axios from 'axios';

const UserForm = ({ open, onClose, user }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open) {
            if (user) {
                setName(user.name);
                setEmail(user.email);
                setPhoneNumber(user.phone_number);
            } else {
                setName('');
                setEmail('');
                setPhoneNumber('');
            }
            setErrors({});
        }
    }, [open, user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (user) {
                await axios.put(`${process.env.REACT_APP_API_URL}/users/${user.id}/`, {
                    name,
                    email,
                    phone_number: phoneNumber,
                });
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/users/`, {
                    name,
                    email,
                    phone_number: phoneNumber,
                });
            }
            onClose();
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            as={Form}
            onSubmit={handleSubmit}
            closeIcon
        >
            <Modal.Header>Add New User</Modal.Header>
            <Modal.Content>
                {errors.non_field_errors && (
                    <Message negative>
                        <Message.Header>There were some errors with your submission</Message.Header>
                        <ul>
                            {errors.non_field_errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Message>
                )}
                <Form.Input
                    fluid
                    label='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name ? { content: errors.name[0], pointing: 'below' } : null}
                    required
                />
                <Form.Input
                    fluid
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email ? { content: errors.email[0], pointing: 'below' } : null}
                    required
                />
                <Form.Input
                    fluid
                    label="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={errors.phone_number ? { content: errors.phone_number[0], pointing: 'below' } : null}
                    required
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    type="submit"
                    primary
                    loading={submitting}
                >
                    Submit
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default UserForm;
