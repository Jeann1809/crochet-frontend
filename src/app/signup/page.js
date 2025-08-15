"use client";

import { useState } from 'react';
import Link from 'next/link';
import Step1PersonalInfo from './components/Step1PersonalInfo';
import Step2ContactInfo from './components/Step2ContactInfo';
import Step3AddressInfo from './components/Step3AddressInfo';
import Step4PasswordInfo from './components/Step4PasswordInfo';
import Step5Review from './components/Step5Review';
import ProductBubblesBackground from '../components/ProductBubblesBackground';

export default function SignupPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [validationAttempted, setValidationAttempted] = useState({
        step1: false,
        step2: false,
        step3: false,
        step4: false
    });
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        role: 'customer',
        password: '',
        confirmPassword: ''
    });

    const totalSteps = 5;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            // Mark current step as validation attempted
            setValidationAttempted(prev => ({
                ...prev,
                [`step${currentStep}`]: true
            }));
            
            // Validate current step before proceeding
            if (validateCurrentStep()) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const validateCurrentStep = () => {
        switch (currentStep) {
            case 1:
                if (!formData.firstName.trim() || !formData.lastName.trim()) {
                    alert('Please fill in both First Name and Last Name fields.');
                    return false;
                }
                break;
            case 2:
                if (!formData.email.trim()) {
                    alert('Please enter your email address.');
                    return false;
                }
                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    alert('Please enter a valid email address.');
                    return false;
                }
                break;
            case 3:
                if (!formData.address.trim()) {
                    alert('Please enter your address.');
                    return false;
                }
                break;
            case 4:
                if (!formData.password) {
                    alert('Please enter a password.');
                    return false;
                }
                if (formData.password.length < 8) {
                    alert('Password must be at least 8 characters long.');
                    return false;
                }
                if (!formData.confirmPassword) {
                    alert('Please confirm your password.');
                    return false;
                }
                if (formData.password !== formData.confirmPassword) {
                    alert('Passwords do not match. Please try again.');
                    return false;
                }
                break;
        }
        return true;
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateFormData = (newData) => {
        setFormData(prev => ({
            ...prev,
            ...newData
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Final validation before submission
        if (!validateAllFields()) {
            return;
        }
        
        // Handle registration logic here
        console.log('Registration data:', formData);
    };

    const validateAllFields = () => {
        // Check all required fields
        if (!formData.firstName.trim()) {
            alert('Please fill in your First Name.');
            return false;
        }
        if (!formData.lastName.trim()) {
            alert('Please fill in your Last Name.');
            return false;
        }
        if (!formData.email.trim()) {
            alert('Please enter your email address.');
            return false;
        }
        if (!formData.address.trim()) {
            alert('Please enter your address.');
            return false;
        }
        if (!formData.password) {
            alert('Please enter a password.');
            return false;
        }
        if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return false;
        }
        
        return true;
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1PersonalInfo formData={formData} updateFormData={updateFormData} validationAttempted={validationAttempted.step1} />;
            case 2:
                return <Step2ContactInfo formData={formData} updateFormData={updateFormData} validationAttempted={validationAttempted.step2} />;
            case 3:
                return <Step3AddressInfo formData={formData} updateFormData={updateFormData} validationAttempted={validationAttempted.step3} />;
            case 4:
                return <Step4PasswordInfo formData={formData} updateFormData={updateFormData} validationAttempted={validationAttempted.step4} />;
            case 5:
                return <Step5Review formData={formData} />;
            default:
                return null;
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Personal Information';
            case 2:
                return 'Contact Information';
            case 3:
                return 'Address Information';
            case 4:
                return 'Password Setup';
            case 5:
                return 'Review & Submit';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue flex items-center justify-center px-4 py-8 relative">
            <ProductBubblesBackground />
            <div className="max-w-2xl w-full space-y-6 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Create Account
                    </h1>
                    <p className="text-custom-darkBlue text-lg">
                        {getStepTitle()}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-custom-darkBlue">
                            Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm text-custom-mediumBlue">
                            {Math.round((currentStep / totalSteps) * 100)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-custom-lightGray rounded-full h-2">
                        <div 
                            className="bg-custom-mediumBlue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit}>
                        {renderStep()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-6 py-3 border border-custom-mediumBlue text-custom-mediumBlue rounded-lg hover:bg-custom-mediumBlue hover:text-white transition-all duration-200"
                                >
                                    ← Previous
                                </button>
                            )}
                            
                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="ml-auto px-6 py-3 bg-custom-mediumBlue text-white rounded-lg hover:bg-custom-navyBlue transition-all duration-200"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="ml-auto px-6 py-3 bg-custom-mediumBlue text-white rounded-lg hover:bg-custom-navyBlue transition-all duration-200"
                                >
                                    Create Account
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Sign In Link */}
                <div className="text-center">
                    <p className="text-white">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-custom-darkBlue hover:text-custom-navyBlue transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        href="/"
                        className="text-white hover:text-custom-darkBlue transition-colors font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
