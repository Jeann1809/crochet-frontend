export default function Step1PersonalInfo({ formData, updateFormData, validationAttempted }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-custom-darkBlue">
                    Tell us about yourself
                </h2>
                <p className="text-custom-mediumBlue mt-2">
                    Let's start with your basic information
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-custom-darkBlue mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                            validationAttempted && formData.firstName.trim() === '' ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                        }`}
                        placeholder="Enter your first name"
                    />
                    {validationAttempted && formData.firstName.trim() === '' && (
                        <p className="text-red-500 text-sm mt-1">First name is required</p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-custom-darkBlue mb-2">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                            validationAttempted && formData.lastName.trim() === '' ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                        }`}
                        placeholder="Enter your last name"
                    />
                    {validationAttempted && formData.lastName.trim() === '' && (
                        <p className="text-red-500 text-sm mt-1">Last name is required</p>
                    )}
                </div>
            </div>


        </div>
    );
}
