export default function Step5Review({ formData }) {
    const formatPhone = (phone) => {
        if (!phone) return 'Not provided';
        return phone;
    };

    const maskPassword = (password) => {
        return '•'.repeat(password.length);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-custom-darkBlue">
                    Review Your Information
                </h2>
                <p className="text-custom-mediumBlue mt-2">
                    Please review all the information before creating your account
                </p>
            </div>

            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-custom-darkBlue mb-3 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-custom-mediumBlue" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">First Name:</span>
                        <p className="text-custom-darkBlue">{formData.firstName || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">Last Name:</span>
                        <p className="text-custom-darkBlue">{formData.lastName || 'Not provided'}</p>
                    </div>

                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-custom-darkBlue mb-3 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-custom-mediumBlue" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contact Information
                </h3>
                <div className="space-y-2">
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">Email Address:</span>
                        <p className="text-custom-darkBlue">{formData.email || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">Phone Number:</span>
                        <p className="text-custom-darkBlue">{formatPhone(formData.phone)}</p>
                    </div>
                </div>
            </div>

            {/* Address Information */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-custom-darkBlue mb-3 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-custom-mediumBlue" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Address Information
                </h3>
                <div>
                    <span className="text-sm font-medium text-custom-mediumBlue">Full Address:</span>
                    <p className="text-custom-darkBlue whitespace-pre-line">{formData.address || 'Not provided'}</p>
                </div>
            </div>

            {/* Password Information */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-custom-darkBlue mb-3 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-custom-mediumBlue" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Password Information
                </h3>
                <div className="space-y-2">
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">Password:</span>
                        <p className="text-custom-darkBlue font-mono">{maskPassword(formData.password)}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">Password Strength:</span>
                        <p className="text-custom-darkBlue">
                            {formData.password && formData.password.length >= 8 ? 'Strong' : 'Weak'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                            Account Creation
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">
                            By clicking "Create Account", you agree to our Terms of Service and Privacy Policy. 
                            Your account will be created immediately upon successful submission.
                        </p>
                    </div>
                </div>
            </div>

            {/* Data Summary */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                            Ready to Create Account
                        </h3>
                        <p className="text-sm text-green-700 mt-1">
                            All required information has been provided. Your customer account will be created.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
