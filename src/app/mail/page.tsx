'use client';

import Link from 'next/link';
import { useState } from 'react';

const sampleMessages = [
    {
        id: 1,
        from: 'FitnessFriend123',
        subject: 'Great progress this week!',
        received: '2024-12-15',
        read: false,
    },
    {
        id: 2,
        from: 'HealthyEater',
        subject: 'Recipe recommendation',
        received: '2024-12-14',
        read: true,
    },
    {
        id: 3,
        from: 'StayFitWithAI Team',
        subject: 'Welcome to StayFitWithAI!',
        received: '2024-12-01',
        read: true,
    },
];

export default function MailPage() {
    const [activeTab, setActiveTab] = useState('inbox');
    const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
    const [messages] = useState(sampleMessages);

    const toggleSelect = (id: number) => {
        setSelectedMessages(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedMessages.length === messages.length) {
            setSelectedMessages([]);
        } else {
            setSelectedMessages(messages.map(m => m.id));
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <div className="w-48 flex-shrink-0">
                        <Link
                            href="/mail/compose"
                            className="block w-full bg-[#0073CF] text-white text-center py-2 px-4 rounded font-medium hover:bg-[#005AA7] mb-4"
                        >
                            Compose Message
                        </Link>

                        <nav className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <button
                                onClick={() => setActiveTab('inbox')}
                                className={`w-full text-left px-4 py-3 border-b border-gray-100 ${activeTab === 'inbox' ? 'text-[#0073CF] bg-[#E8F4FC] font-medium' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Inbox
                            </button>
                            <button
                                onClick={() => setActiveTab('sent')}
                                className={`w-full text-left px-4 py-3 border-b border-gray-100 ${activeTab === 'sent' ? 'text-[#0073CF] bg-[#E8F4FC] font-medium' : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Sent Messages
                            </button>
                            <Link href="/mail/settings" className="block px-4 py-3 border-b border-gray-100 text-gray-700 hover:bg-gray-50">
                                Settings
                            </Link>
                            <Link href="/mail/blocked" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                                Blocked Users
                            </Link>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            {/* Header */}
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h1 className="text-xl font-semibold text-gray-800">
                                    {activeTab === 'inbox' ? 'Inbox' : 'Sent Messages'}
                                </h1>
                            </div>

                            {/* Action Buttons */}
                            <div className="px-5 py-3 border-b border-gray-100 flex gap-3">
                                <button
                                    className={`px-4 py-1.5 text-sm rounded border ${selectedMessages.length > 0
                                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={selectedMessages.length === 0}
                                >
                                    Delete Selected
                                </button>
                                <button
                                    className={`px-4 py-1.5 text-sm rounded border ${selectedMessages.length > 0
                                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={selectedMessages.length === 0}
                                >
                                    Block Selected
                                </button>
                            </div>

                            {/* Message Table */}
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="w-10 px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedMessages.length === messages.length && messages.length > 0}
                                                onChange={toggleSelectAll}
                                                className="rounded"
                                            />
                                        </th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">From</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Subject</th>
                                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Received</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                                No messages in your {activeTab}.
                                            </td>
                                        </tr>
                                    ) : (
                                        messages.map(message => (
                                            <tr
                                                key={message.id}
                                                className={`border-b border-gray-100 hover:bg-gray-50 ${!message.read ? 'bg-[#E8F4FC]' : ''}`}
                                            >
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedMessages.includes(message.id)}
                                                        onChange={() => toggleSelect(message.id)}
                                                        className="rounded"
                                                    />
                                                </td>
                                                <td className={`px-4 py-3 ${!message.read ? 'font-semibold' : ''}`}>
                                                    <Link href={`/mail/${message.id}`} className="text-[#0073CF] hover:underline">
                                                        {message.from}
                                                    </Link>
                                                </td>
                                                <td className={`px-4 py-3 ${!message.read ? 'font-semibold' : ''}`}>
                                                    <Link href={`/mail/${message.id}`} className="text-gray-700 hover:text-[#0073CF]">
                                                        {message.subject}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-500">
                                                    {formatDate(message.received)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            {/* Bottom Actions */}
                            <div className="px-5 py-3 border-t border-gray-100">
                                <Link href="/mail/compose" className="text-[#0073CF] text-sm hover:underline">
                                    Compose Message
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
