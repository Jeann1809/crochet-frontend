export default function Step3AddressInfo({ formData, updateFormData, validationAttempted }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address_')) {
            const field = name.replace('address_', '');
            updateFormData({
                shippingAddress: {
                    ...formData.shippingAddress,
                    [field]: value
                }
            });
        } else {
            updateFormData({ [name]: value });
        }
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

            {/* Street Address */}
            <div>
                <label htmlFor="address_street" className="block text-sm font-medium text-custom-darkBlue mb-2">
                    Street Address <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="address_street"
                    name="address_street"
                    required
                    value={formData.shippingAddress?.street || ''}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                        validationAttempted && (!formData.shippingAddress?.street || formData.shippingAddress.street.trim() === '') ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                    }`}
                    placeholder="Enter your street address"
                />
                {validationAttempted && (!formData.shippingAddress?.street || formData.shippingAddress.street.trim() === '') ? (
                    <p className="text-red-500 text-sm mt-1">Street address is required</p>
                ) : (
                    <p className="text-sm text-custom-mediumBlue mt-1">
                        Please provide your street address for accurate delivery
                    </p>
                )}
            </div>

            {/* City and ZIP Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="address_city" className="block text-sm font-medium text-custom-darkBlue mb-2">
                        City <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="address_city"
                        name="address_city"
                        required
                        value={formData.shippingAddress?.city || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                            validationAttempted && (!formData.shippingAddress?.city || formData.shippingAddress.city.trim() === '') ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                        }`}
                        placeholder="Enter your city"
                    />
                    {validationAttempted && (!formData.shippingAddress?.city || formData.shippingAddress.city.trim() === '') ? (
                        <p className="text-red-500 text-sm mt-1">City is required</p>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="address_zip" className="block text-sm font-medium text-custom-darkBlue mb-2">
                        ZIP/Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="address_zip"
                        name="address_zip"
                        required
                        value={formData.shippingAddress?.zip || ''}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue placeholder-custom-mediumBlue ${
                            validationAttempted && (!formData.shippingAddress?.zip || formData.shippingAddress.zip.trim() === '') ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                        }`}
                        placeholder="Enter ZIP code"
                    />
                    {validationAttempted && (!formData.shippingAddress?.zip || formData.shippingAddress.zip.trim() === '') ? (
                        <p className="text-red-500 text-sm mt-1">ZIP code is required</p>
                    ) : null}
                </div>
            </div>

            {/* Country */}
            <div>
                <label htmlFor="address_country" className="block text-sm font-medium text-custom-darkBlue mb-2">
                    Country <span className="text-red-500">*</span>
                </label>
                <select
                    id="address_country"
                    name="address_country"
                    required
                    value={formData.shippingAddress?.country || ''}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-custom-mediumBlue focus:border-transparent transition-all duration-200 text-custom-darkBlue ${
                        validationAttempted && (!formData.shippingAddress?.country || formData.shippingAddress.country.trim() === '') ? 'border-red-300 focus:ring-red-500' : 'border-custom-lightGray focus:ring-custom-mediumBlue'
                    }`}
                >
                    <option value="">Select your country</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Other">Other</option>
                </select>
                {validationAttempted && (!formData.shippingAddress?.country || formData.shippingAddress.country.trim() === '') ? (
                    <p className="text-red-500 text-sm mt-1">Country is required</p>
                ) : (
                    <p className="text-sm text-custom-mediumBlue mt-1">
                        Please select your country for shipping calculations
                    </p>
                )}
            </div>

            {/* Address Format Example */}
            <div className="bg-custom-lightGray bg-opacity-30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-custom-darkBlue mb-2">
                    Address Format Example
                </h3>
                <div className="text-sm text-custom-mediumBlue space-y-1">
                    <p><strong>Street:</strong> 123 Main Street, Apt 4B</p>
                    <p><strong>City:</strong> New York</p>
                    <p><strong>ZIP:</strong> 10001</p>
                    <p><strong>Country:</strong> United States</p>
                </div>
            </div>
        </div>
    );
}
