import { useState } from "react";

function Notification(props) {
	return (
		// {/* <!-- Weather Notification Signup --> */}
		<div className="md:col-span-2">
			<div className="glass-effect rounded-xl p-6 h-full">
				<h2 className="text-xl font-semibold text-white mb-4">
					Daily Weather Alerts
				</h2>
				<p className="text-blue-100 text-sm mb-4">
					Get weather updates for your city delivered to your inbox every day.
				</p>

				<div id="notificationForm" className="space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-blue-100 mb-1">
							Name
						</label>
						<input
							type="text"
							id="name"
							required
							className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-700"
							value={props.userData.name}
							onChange={(e) =>
								props.setUserData((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-blue-100 mb-1">
							Email
						</label>
						<input
							type="email"
							id="email"
							required
							className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-700"
							value={props.userData.email}
							onChange={(e) =>
								props.setUserData((prev) => ({
									...prev,
									email: e.target.value,
								}))
							}
						/>
					</div>

					<div>
						<label
							htmlFor="notifCity"
							className="block text-sm font-medium text-blue-100 mb-1">
							City
						</label>
						<input
							type="text"
							id="notifCity"
							required
							className="w-full px-4 py-2 rounded-lg focus:outline-none text-gray-700"
							value={props.userData.city}
							onChange={(e) =>
								props.setUserData((prev) => ({ ...prev, city: e.target.value }))
							}
						/>
					</div>

					<button
						className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
						onClick={props.subscribeUser}>
						Subscribe
					</button>
				</div>

				<div
					id="formSuccess"
					className="hidden mt-4 bg-green-500 bg-opacity-20 text-white p-3 rounded-lg text-center">
					<p>Successfully subscribed!</p>
				</div>
			</div>
		</div>
	);
}

export default Notification;
