import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function TrainStatus() {
    const [trainNumber, setTrainNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [trainStatus, setTrainStatus] = useState(null);
    const [error, setError] = useState('');
    const { isDarkMode } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setTrainStatus(null);
        
        try {
            const response = await axios.get(`${API_BASE_URL}/api/train-status`, {
                params: { trainNumber }
            });
            
            console.log('API response:', response.data);
            
            if (!response.data) {
                throw new Error('No train data found. Please check the train number and try again.');
            }
            
            setTrainStatus(response.data);
        } catch (err) {
            console.error('Error fetching train status:', err);
            setError(err.response?.data?.error || err.message || 'Failed to fetch train status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-theme-secondary rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-theme-primary mb-2">Train Routes</h2>
                <p className="text-theme-secondary">Track your train's schedule and route</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="trainNumber" className="block text-sm font-medium text-gray-300 mb-2">
                        Train Number
                    </label>
                    <div className="relative">
                        <i className="fas fa-train absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            id="trainNumber"
                            value={trainNumber}
                            onChange={(e) => setTrainNumber(e.target.value)}
                            className="bg-theme-primary text-theme-primary placeholder:text-theme-secondary pl-10 pr-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)] transition-all duration-200"
                            placeholder="Enter train number"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4a6cf7] hover:bg-[#3b63f7] text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            <span>Checking Status...</span>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-search"></i>
                            <span>Check Status</span>
                        </>
                    )}
                </button>
            </form>

            {error && (
                <div className="mt-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
                    <p className="flex items-center">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {error}
                    </p>
                </div>
            )}

            {trainStatus && !error && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-theme-primary mb-4">Train Information</h3>
                    <div className={`rounded-lg p-6 space-y-4 ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'bg-[#2a3147] text-white' : 'bg-white text-gray-900'}`}>
                        <div>
                            <p className={`text-sm ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Train Number</p>
                            <p className="font-medium">{trainStatus.trainNumber}</p>
                        </div>
                        <div>
                            <p className={`text-sm ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Train Name</p>
                            <p className="font-medium">{trainStatus.trainName}</p>
                        </div>
                        <div>
                            <p className={`text-sm ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>From</p>
                            <p className="font-medium">{trainStatus.origin} ({trainStatus.stationFrom})</p>
                        </div>
                        <div>
                            <p className={`text-sm ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>To</p>
                            <p className="font-medium">{trainStatus.destination} ({trainStatus.stationTo})</p>
                        </div>
                        <div>
                            <p className={`text-sm ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Journey Classes</p>
                            <p className="font-medium">{trainStatus.journeyClasses?.join(', ')}</p>
                        </div>
                        <div>
                            <p className={`text-sm mb-2 ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Schedule</p>
                            <div className="overflow-x-auto">
                                <table className={`min-w-full text-xs ${typeof isDarkMode !== 'undefined' && isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    <thead>
                                        <tr className={typeof isDarkMode !== 'undefined' && isDarkMode ? 'bg-[#232b3a]' : 'bg-gray-100'}>
                                            <th className="px-4 py-2 text-left whitespace-nowrap">Station</th>
                                            <th className="px-4 py-2 text-left">Arrival</th>
                                            <th className="px-4 py-2 text-left">Departure</th>
                                            <th className="px-4 py-2 text-left">Distance (km)</th>
                                            <th className="px-4 py-2 text-left">Day</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trainStatus.schedule?.map((stop, idx) => (
                                            <tr key={idx} className={typeof isDarkMode !== 'undefined' && isDarkMode ? (idx % 2 === 0 ? 'bg-[#232b3a]' : '') : (idx % 2 === 0 ? 'bg-gray-50' : '')}>
                                                <td className="px-4 py-2 text-left whitespace-nowrap">{stop.stationName} ({stop.stationCode})</td>
                                                <td className="px-4 py-2 text-left">{stop.arrivalTime}</td>
                                                <td className="px-4 py-2 text-left">{stop.departureTime}</td>
                                                <td className="px-4 py-2 text-left">{stop.distance}</td>
                                                <td className="px-4 py-2 text-left">{stop.dayCount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrainStatus;