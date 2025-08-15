export default function Step3AddressInfo({ formData, updateFormData, validationAttempted }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-custom-darkBlue">
                    Address Information
                </h2>
                <p className="text-custom-mediumBlue mt-2">
                    Where should we deliver your orders?
                </p>
            </div>

            {/* Address */}
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-custom-darkBlue mb-2">
                    Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="4"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue resize-none ${
                            validationAttempted && formData.address.trim() === '' ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                        }`}
                    placeholder="Enter your complete address including street, city, state/province, and postal code"
                />
                {validationAttempted && formData.address.trim() === '' ? (
                    <p className="text-red-500 text-sm mt-1">Address is required</p>
                ) : (
                    <p className="text-sm text-custom-mediumBlue mt-1">
                        Please provide your complete address for accurate delivery
                    </p>
                )}
            </div>

            {/* Address Format Example */}
            <div className="bg-custom-lightGray bg-opacity-30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-custom-darkBlue mb-2">
                    Address Format Example
                </h3>
                <div className="text-sm text-custom-mediumBlue space-y-1">
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                            Delivery Information
                        </h3>
                        <p className="text-sm text-blue-700 mt-1">
                            Your address will be used for order delivery. You can update this information anytime in your account settings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
