'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [selectedSessionForUpload, setSelectedSessionForUpload] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedSessionForProgress, setSelectedSessionForProgress] = useState('session1');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [sessionForm, setSessionForm] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: ''
  });

  // Simulate real-time updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      // This would normally come from your WebSocket or API
      // For demo purposes, we'll just update the state occasionally
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  // Mock data for voting sessions with voting progress
  const votingSessions = [
    {
      id: 'session1',
      title: 'Presidential Election 2025',
      description: 'Vote for the next President',
      status: 'active',
      startTime: '2025-07-20T09:00',
      endTime: '2025-11-04T18:00',
      votersCount: 1250,
      votedCount: 823,
      candidates: [
        { name: 'Alice Johnson', votes: 345, percentage: 41.9 },
        { name: 'Bob Wilson', votes: 298, percentage: 36.2 },
        { name: 'Carol Davis', votes: 180, percentage: 21.9 }
      ],
      turnoutRate: 65.8
    },
    {
      id: 'session2',
      title: 'Local School Board Election',
      description: 'Choose school board representatives',
      status: 'upcoming',
      startTime: '2025-08-15T08:00',
      endTime: '2025-08-15T20:00',
      votersCount: 850,
      votedCount: 0,
      candidates: [
        { name: 'Dr. Sarah Lee', votes: 0, percentage: 0 },
        { name: 'Mike Thompson', votes: 0, percentage: 0 },
        { name: 'Lisa Rodriguez', votes: 0, percentage: 0 }
      ],
      turnoutRate: 0
    },
    {
      id: 'session3',
      title: 'State Governor Election',
      description: 'State-wide gubernatorial election',
      status: 'completed',
      startTime: '2025-06-01T08:00',
      endTime: '2025-06-01T20:00',
      votersCount: 2100,
      votedCount: 1967,
      candidates: [
        { name: 'David Martinez', votes: 892, percentage: 45.4 },
        { name: 'Emma Taylor', votes: 734, percentage: 37.3 },
        { name: 'James Clark', votes: 341, percentage: 17.3 }
      ],
      turnoutRate: 93.7
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };

  const handleSessionFormChange = (field, value) => {
    setSessionForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateSession = (e) => {
    e.preventDefault();
    if (!sessionForm.title || !sessionForm.description || !sessionForm.startDate || !sessionForm.endDate) {
      alert('Please fill in all required fields');
      return;
    }
    // Handle session creation logic here
    console.log('Creating session:', sessionForm);
    // Reset form
    setSessionForm({
      title: '',
      description: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    });
  };

  // Handle CSV upload for specific session from voting cards
  const handleUploadCsvToSession = (sessionId) => {
    const session = votingSessions.find(s => s.id === sessionId);
    if (session) {
      // Create a file input element and trigger click
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.csv';
      fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          // Handle the CSV upload for this specific session
          console.log(`Uploading CSV to session: ${session.title}`, file);
          alert(`CSV file "${file.name}" uploaded successfully to "${session.title}"!\n\nThe voters from this CSV will be added to the session.`);
        }
      };
      fileInput.click();
    }
  };

  // Handle sending invites to voters
  const handleSendInvites = (sessionId) => {
    const session = votingSessions.find(s => s.id === sessionId);
    if (session) {
      // Simulate sending invites
      console.log(`Sending invites for session: ${session.title}`);
      
      // Show confirmation dialog
      const confirmed = window.confirm(
        `Send voting invites to all ${session.votersCount} voters for "${session.title}"?\n\n` +
        `This will send email invitations with voting credentials and session details.`
      );
      
      if (confirmed) {
        // Simulate invite sending process
        alert(
          `🎉 Voting invites sent successfully!\n\n` +
          `✅ ${session.votersCount} invitations sent\n` +
          `📧 Voters will receive:\n` +
          `   • Voting credentials (Voter ID & PIN)\n` +
          `   • Session details and voting period\n` +
          `   • Direct link to voting portal\n\n` +
          `📊 You can track email delivery status in the session progress view.`
        );
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 70) return 'from-green-500 to-green-600';
    if (percentage >= 40) return 'from-yellow-500 to-yellow-600';
    return 'from-blue-500 to-blue-600';
  };

  const getCandidateColor = (index) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600', 
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600'
    ];
    return colors[index % colors.length];
  };

  const getCandidateDotColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500', 
      'bg-orange-500',
      'bg-pink-500'
    ];
    return colors[index % colors.length];
  };

  const ProgressModal = () => {
    const session = votingSessions.find(s => s.id === selectedSessionForProgress);
    if (!session) return null;

    return (
      <AnimatePresence>
        {isProgressModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsProgressModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{session.title}</h2>
                  <p className="text-gray-600">Real-time Voting Progress</p>
                </div>
                <button
                  onClick={() => setIsProgressModalOpen(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Voters</p>
                      <p className="text-2xl font-bold">{session.votersCount.toLocaleString()}</p>
                    </div>
                    <i className="ri-group-line text-3xl text-blue-200"></i>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Votes Cast</p>
                      <p className="text-2xl font-bold">{session.votedCount.toLocaleString()}</p>
                    </div>
                    <i className="ri-checkbox-circle-line text-3xl text-green-200"></i>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Turnout Rate</p>
                      <p className="text-2xl font-bold">{session.turnoutRate}%</p>
                    </div>
                    <i className="ri-pie-chart-line text-3xl text-purple-200"></i>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Remaining</p>
                      <p className="text-2xl font-bold">{(session.votersCount - session.votedCount).toLocaleString()}</p>
                    </div>
                    <i className="ri-hourglass-line text-3xl text-orange-200"></i>
                  </div>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Overall Voting Progress</h3>
                  <span className="text-sm text-gray-600">{session.votedCount} / {session.votersCount} votes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <motion.div
                    className={`h-4 rounded-full bg-gradient-to-r ${getProgressColor(session.turnoutRate)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${session.turnoutRate}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-right text-sm text-gray-600 mt-1">{session.turnoutRate}% turnout</p>
              </div>

              {/* Candidates Results */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Results by Candidate</h3>
                <div className="space-y-4">
                  {session.candidates.map((candidate, index) => (
                    <motion.div
                      key={candidate.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-3 ${getCandidateDotColor(index)}`}></div>
                          <span className="font-medium text-gray-900">{candidate.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900">{candidate.votes.toLocaleString()} votes</span>
                          <span className="text-sm text-gray-600 ml-2">({candidate.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${getCandidateColor(index)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${candidate.percentage}%` }}
                          transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Live Updates Indicator */}
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center text-sm text-gray-600">
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  Live updates every 5 seconds
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-xl"
          animate={{ 
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage voting sessions and voters</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <i className="ri-admin-line mr-2"></i>
                Administrator
              </div>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <i className="ri-logout-box-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Top Section - Create Session */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {/* Create Voting Session */}
          <motion.section 
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <i className="ri-add-circle-line text-white text-xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Create Voting Session</h2>
                <p className="text-sm text-gray-600">Create a new voting session</p>
              </div>
            </div>
            
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={sessionForm.title}
                  onChange={(e) => handleSessionFormChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Enter session title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={3}
                  value={sessionForm.description}
                  onChange={(e) => handleSessionFormChange('description', e.target.value)}
                  className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Enter session description"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={sessionForm.startDate}
                    onChange={(e) => handleSessionFormChange('startDate', e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={sessionForm.startTime}
                    onChange={(e) => handleSessionFormChange('startTime', e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={sessionForm.endDate}
                    onChange={(e) => handleSessionFormChange('endDate', e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={sessionForm.endTime}
                    onChange={(e) => handleSessionFormChange('endTime', e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <i className="ri-add-line mr-2"></i>
                Create Session
              </motion.button>
            </form>
          </motion.section>
        </motion.div>

        {/* Voting Sessions Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6"
        >
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
              <i className="ri-list-check-line text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Voting Sessions</h2>
              <p className="text-gray-600">Monitor all active and upcoming voting sessions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {votingSessions.map((session, sessionIndex) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sessionIndex * 0.1 }}
                className="p-6 bg-white/60 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg">{session.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}>
                    {session.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{session.description}</p>
                
                {/* Progress Bar for Active/Completed Sessions */}
                {(session.status === 'active' || session.status === 'completed') && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Voting Progress</span>
                      <span className="text-sm font-medium text-gray-700">
                        {session.votedCount} / {session.votersCount} ({session.turnoutRate}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <motion.div
                        className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(session.turnoutRate)}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${session.turnoutRate}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    
                    {/* Candidate Progress Bars */}
                    <div className="space-y-2">
                      {session.candidates.slice(0, 3).map((candidate, index) => (
                        <div key={candidate.name} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getCandidateDotColor(index)}`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-700 font-medium truncate">{candidate.name}</span>
                              <span className="text-xs text-gray-600">{candidate.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <motion.div
                                className={`h-1.5 rounded-full bg-gradient-to-r ${getCandidateColor(index)}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${candidate.percentage}%` }}
                                transition={{ duration: 1.2, delay: (sessionIndex * 0.1) + (index * 0.2), ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Leading Candidate for Active/Completed Sessions */}
                {(session.status === 'active' || session.status === 'completed') && session.candidates.length > 0 && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <i className="ri-trophy-line text-yellow-600 mr-2"></i>
                        <span className="text-sm text-gray-800 font-medium">Leading:</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-semibold text-gray-900">{session.candidates[0].name}</span>
                        <span className="text-xs text-gray-700 ml-1">({session.candidates[0].percentage}%)</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>
                    <i className="ri-group-line mr-1"></i>
                    {session.votersCount} voters
                  </span>
                  <span>
                    <i className="ri-calendar-line mr-1"></i>
                    {new Date(session.startTime).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {/* First Row - Edit and Progress/View */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                      <i className="ri-edit-line mr-1"></i>
                      Edit
                    </button>
                    {(session.status === 'active' || session.status === 'completed') && (
                      <button 
                        onClick={() => {
                          setSelectedSessionForProgress(session.id);
                          setIsProgressModalOpen(true);
                        }}
                        className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                      >
                        <i className="ri-bar-chart-line mr-1"></i>
                        Progress
                      </button>
                    )}
                    {session.status === 'upcoming' && (
                      <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                        <i className="ri-eye-line mr-1"></i>
                        View
                      </button>
                    )}
                  </div>
                  
                  {/* Second Row - Upload CSV and Send Invites */}
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUploadCsvToSession(session.id)}
                      className="flex-1 bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-200 transition-all duration-300"
                    >
                      <i className="ri-upload-cloud-line mr-1"></i>
                      Upload CSV
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendInvites(session.id)}
                      className="flex-1 bg-orange-100 text-orange-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-200 transition-all duration-300"
                    >
                      <i className="ri-mail-send-line mr-1"></i>
                      Send Invites
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Progress Modal */}
      <ProgressModal />
    </div>
  );
};

export default AdminDashboard;
