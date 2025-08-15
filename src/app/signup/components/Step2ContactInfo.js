export default function Step2ContactInfo({ formData, updateFormData, validationAttempted }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-custom-darkBlue">
                    Contact Information
                </h2>
                <p className="text-custom-mediumBlue mt-2">
                    How can we reach you?
                </p>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-custom-darkBlue mb-2">
                    Email Address <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                            validationAttempted && formData.email.trim() === '' ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                        }`}
                    placeholder="Enter your email address"
                />
                {validationAttempted && formData.email.trim() === '' ? (
                    <p className="text-red-500 text-sm mt-1">Email address is required</p>
                ) : (
                    <p className="text-sm text-custom-mediumBlue mt-1">
                        We'll use this for account verification and communications
                    </p>
                )}
            </div>

            {/* Phone Number */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-custom-darkBlue mb-2">
                    Phone Number
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-custom-lightGray rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue"
                    placeholder="Enter your phone number (optional)"
                />
                <p className="text-sm text-custom-mediumBlue mt-1">
                    Optional - for delivery updates and customer support
                </p>
            </div>

            {/* Contact Preferences */}
            <div className="bg-custom-lightGray bg-opacity-30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-custom-darkBlue mb-2">
                    Contact Preferences
                </h3>
                <p className="text-sm text-custom-mediumBlue">
                    We'll primarily contact you via email. Phone number is optional and will only be used for important updates.
                </p>
            </div>
        </div>
    );
}
