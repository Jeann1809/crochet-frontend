"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/navbar';
import Link from 'next/link';

export default function CartPage() {
	const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

	if (cartItems.length === 0) {
		return (
			<div className="mt-20 min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
				<Navbar />
				<div className="pt-20 flex items-center justify-center px-4">
					<div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center max-w-md w-full font-inter">
						<img src="/shopping-cart-svgrepo-com.svg" alt="Shopping Cart" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" />
						<h2 className="text-2xl font-bold text-custom-darkBlue mb-2 font-quicksand">Your cart is empty</h2>
						<p className="text-custom-mediumBlue mb-6 text-sm sm:text-base">Looks like you haven&apos;t added any items to your cart yet.</p>
						<Link
							href="/shop"
							className="inline-block bg-custom-mediumBlue text-white px-5 py-3 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors font-quicksand"
						>
							Start Shopping
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mt-10 min-h-screen bg-gradient-to-br from-custom-lightBlue to-custom-mediumBlue">
			<Navbar />
			<div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 sm:pb-12">
				{/* Playful Title */}
				<div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8 text-center">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-custom-lightBlue mb-2 sm:mb-4 font-dancing-script">Shopping Cart</h1>
					<p className="text-lg sm:text-2xl text-custom-darkBlue font-semibold font-quicksand">Let&apos;s see what you&apos;ve picked!</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-lg shadow-md overflow-hidden font-inter">
							{cartItems.map((item) => (
								<div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-6 border-b border-gray-100 last:border-b-0 gap-4">
									{/* Product Image */}
									<div className="flex-shrink-0 w-24 h-24 sm:w-20 sm:h-20">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover rounded-lg"
										/>
									</div>

									{/* Product Info */}
									<div className="flex-1 min-w-0 w-full">
										<h3 className="text-base sm:text-lg font-semibold text-custom-darkBlue mb-1 font-quicksand">
											{item.name}
										</h3>
										<p className="text-custom-mediumBlue text-sm mb-2 line-clamp-2">
											{item.description}
										</p>
										<p className="text-lg sm:text-xl font-bold text-custom-darkBlue font-quicksand">
											${item.price}
										</p>
									</div>

									{/* Controls + Total + Remove */}
									<div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 sm:gap-6">
										{/* Quantity Controls */}
										<div className="flex items-center space-x-3">
											<button
												onClick={() => updateQuantity(item.id, item.quantity - 1)}
												className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-custom-lightGray text-custom-darkBlue hover:bg-custom-mediumBlue hover:text-white transition-colors flex items-center justify-center font-quicksand"
											>
												-
											</button>
											<span className="w-10 sm:w-12 text-center font-semibold text-custom-darkBlue font-quicksand">
												{item.quantity}
											</span>
											<button
												onClick={() => updateQuantity(item.id, item.quantity + 1)}
												className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-custom-lightGray text-custom-darkBlue hover:bg-custom-mediumBlue hover:text-white transition-colors flex items-center justify-center font-quicksand"
											>
												+
											</button>
										</div>

										{/* Total Price */}
										<div className="text-right">
											<p className="text-base sm:text-lg font-bold text-custom-darkBlue font-quicksand">
												${(item.price * item.quantity).toFixed(2)}
											</p>
										</div>

										{/* Remove Button */}
										<button
											onClick={() => removeFromCart(item.id)}
											className="text-red-500 hover:text-red-700 transition-colors p-2"
											aria-label="Remove item"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
											</svg>
										</button>
									</div>
								</div>
							))}
						</div>

						{/* Clear Cart Button */}
						<div className="mt-4 text-right">
							<button
								onClick={clearCart}
								className="text-custom-mediumBlue hover:text-custom-navyBlue transition-colors font-medium font-quicksand"
							>
								Clear Cart
							</button>
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-24 font-inter">
							{/* Order Process Clarification */}
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
								<div className="flex items-start">
									<svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									<div>
										<h3 className="text-sm font-semibold text-blue-800 mb-1 font-quicksand">How Our Ordering Works</h3>
										<p className="text-xs text-blue-700">
											This website doesn&apos;t process payments directly. When you place an order, we&apos;ll receive it and send you an email with shipping details and payment instructions.
										</p>
									</div>
								</div>
							</div>

							<h2 className="text-xl font-bold text-custom-darkBlue mb-4 font-quicksand">Order Summary</h2>
							
							{/* Subtotal */}
							<div className="flex justify-between items-center py-2 border-b border-gray-200">
								<span className="text-custom-mediumBlue">Subtotal</span>
								<span className="font-semibold text-custom-darkBlue font-quicksand">${getCartTotal().toFixed(2)}</span>
							</div>
							
							{/* Shipping */}
							<div className="flex justify-between items-center py-2 border-b border-gray-200">
								<span className="text-custom-mediumBlue">Shipping</span>
								<span className="font-semibold text-custom-darkBlue font-quicksand">Determined by destination</span>
							</div>
							
							{/* Total */}
							<div className="flex justify-between items-center py-3 border-b border-gray-200">
								<span className="text-lg font-bold text-custom-darkBlue font-quicksand">Total</span>
								<span className="text-xl font-bold text-custom-darkBlue font-quicksand">
									${getCartTotal().toFixed(2)}
								</span>
							</div>

							{/* Checkout Button */}
							<Link
								href="/checkout"
								className="w-full bg-custom-mediumBlue text-white py-3 px-6 rounded-lg font-semibold hover:bg-custom-navyBlue transition-colors mt-6 block text-center font-quicksand"
							>
								Place Order
							</Link>

							{/* Continue Shopping */}
							<Link
								href="/shop"
								className="block text-center text-custom-mediumBlue hover:text-custom-navyBlue transition-colors mt-4 font-medium font-quicksand"
							>
								Continue Shopping
							</Link>

							{/* Checkout Info */}
							<div className="mt-6 pt-6 border-t border-gray-200">
								<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
									<div className="flex items-start">
										<svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<div>
											<h3 className="text-sm font-semibold text-blue-800 mb-1 font-quicksand">Checkout Options</h3>
											<p className="text-xs text-blue-700">
												You can checkout as a guest or login to your account. We&apos;ll handle both scenarios seamlessly!
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Checkout Bar */}
				<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between sm:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
					<div>
						<p className="text-xs text-gray-500">Total</p>
						<p className="text-lg font-bold text-custom-darkBlue font-quicksand">${(getCartTotal() + 5.99).toFixed(2)}</p>
					</div>
					<Link href="/checkout" className="bg-custom-mediumBlue text-white py-3 px-5 rounded-lg font-semibold hover:bg-custom-navyBlue active:bg-custom-navyBlue transition-colors font-quicksand">
						Checkout
					</Link>
				</div>
			</div>
		</div>
	);
}
