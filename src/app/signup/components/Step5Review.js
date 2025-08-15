export default function Step5Review({ formData, onSubmit, isSubmitting, submitError, submitSuccess }) {
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
                        <span className="text-sm font-medium text-custom-mediumBlue">Full Name:</span>
                        <p className="text-custom-darkBlue">{formData.name || 'Not provided'}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">Street Address:</span>
                        <p className="text-custom-darkBlue">{formData.shippingAddress?.street || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">City:</span>
                        <p className="text-custom-darkBlue">{formData.shippingAddress?.city || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">ZIP/Postal Code:</span>
                        <p className="text-custom-darkBlue">{formData.shippingAddress?.zip || 'Not provided'}</p>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-custom-mediumBlue">Country:</span>
                        <p className="text-custom-darkBlue">{formData.shippingAddress?.country || 'Not provided'}</p>
                    </div>
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
            <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-custom-darkBlue mb-3 flex items-center">
                    <svg className="h-5 w-5 mr-2 text-custom-mediumBlue" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Terms and Conditions
                </h3>
                <p className="text-custom-darkBlue text-sm">
                    By creating an account, you agree to our terms of service and privacy policy.
                </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-custom-mediumBlue hover:bg-custom-navyBlue focus:ring-custom-mediumBlue'
                    }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </div>

            {/* Success Message */}
            {submitSuccess && (
                <div className="bg-custom-lightBlue border border-white text-white px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {submitSuccess}
                    </div>
                </div>
            )}

            {/* Error Message */}
            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {submitError}
                    </div>
                </div>
            )}
        </div>
    );
}
