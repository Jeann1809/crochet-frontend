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

            {/* Name Input - Full Width */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-custom-darkBlue mb-2">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                        validationAttempted && (!formData.name || formData.name.trim() === '') ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                    }`}
                    placeholder="Enter your full name"
                />
                {validationAttempted && (!formData.name || formData.name.trim() === '') && (
                    <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
            </div>
        </div>
    );
}
