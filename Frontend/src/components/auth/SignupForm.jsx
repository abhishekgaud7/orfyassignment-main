import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const SignupForm = ({ onSignupSuccess, onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic here
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onSignupSuccess(formData.email);
        }, 1000);
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const headerStyle = {
        fontSize: '28px',
        fontWeight: '700',
        color: 'var(--primary-color)',
        marginBottom: '8px'
    };

    const linkStyle = {
        color: 'var(--primary-color)',
        fontWeight: '600',
        textDecoration: 'none',
        cursor: 'pointer'
    };

    const footerStyle = {
        border: '1px dashed #e0e0e0',
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
        marginTop: '32px',
        color: '#888',
        fontSize: '14px'
    };

    return (
        <div style={containerStyle}>
            <div>
                <h2 style={headerStyle}>Create your Productr Account</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    label="Email"
                    name="email"
                    placeholder="Acme@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    label="Mobile Number"
                    name="mobile"
                    placeholder="+91 9876543210"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Signing up...' : 'Sign Up'}
                </Button>
            </form>

            <div style={footerStyle}>
                Already have an account? <br />
                <a onClick={onNavigateToLogin} style={linkStyle}>Login Here</a>
            </div>
        </div>
    );
};

export default SignupForm;
