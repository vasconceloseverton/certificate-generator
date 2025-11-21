'use client';

import { useState } from 'react';

export default function CertificateForm() {
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        date: '',
        instructor: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate certificate');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate-${formData.name.replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err) {
            setError('An error occurred while generating the certificate.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
            <h2 className="text-2xl font-bold text-center text-gray-800">Generate Certificate</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input
                        type="text"
                        name="course"
                        id="course"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Advanced Python"
                        value={formData.course}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Completion Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">Instructor Name</label>
                    <input
                        type="text"
                        name="instructor"
                        id="instructor"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Jane Smith"
                        value={formData.instructor}
                        onChange={handleChange}
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 text-white font-semibold rounded-md shadow-md transition-all duration-300 ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg'
                        }`}
                >
                    {loading ? 'Generating...' : 'Download Certificate'}
                </button>
            </form>
        </div>
    );
}
