'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VoterDashboard = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [sessionExpiry, setSessionExpiry] = useState(30 * 60); // 30 minutes in seconds
  const [showProgress, setShowProgress] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [votingToken, setVotingToken] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const [isVerifyingToken, setIsVerifyingToken] = useState(false);

  // Session countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionExpiry((prev) => {
        if (prev <= 1) {
          // Session expired - logout
          alert('Session expired. Please login again.');
          window.location.href = '/voter/login';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Mock data for voting sessions with candidates
  const votingSessions = {
    active: [
      {
        id: 1,
        title: "Presidential Election 2025",
        description: "Vote for the next President of the United States",
        endDate: "2025-11-04",
        status: "active",
        hasVoted: false,
        candidates: [
          { 
            id: 'cand1', 
            name: 'Alice Johnson', 
            party: 'Democratic Party', 
            votes: 1247, 
            percentage: 42.3, 
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ff?w=150&h=150&fit=crop&crop=face',
            quote: "Together, we can build a stronger future for every American family."
          },
          { 
            id: 'cand2', 
            name: 'Bob Wilson', 
            party: 'Republican Party', 
            votes: 1156, 
            percentage: 39.2, 
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            quote: "America first, prosperity for all through free enterprise and limited government."
          },
          { 
            id: 'cand3', 
            name: 'Carol Davis', 
            party: 'Independent', 
            votes: 545, 
            percentage: 18.5, 
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            quote: "Breaking partisan barriers to deliver real solutions for real people."
          }
        ],
        totalVotes: 2948,
        votersCount: 5000
      },
      {
        id: 2,
        title: "Local School Board Election",
        description: "Choose your local school board representatives",
        endDate: "2025-08-15",
        status: "active",
        hasVoted: true,
        candidates: [
          { 
            id: 'sb1', 
            name: 'Dr. Sarah Lee', 
            party: 'Education First', 
            votes: 234, 
            percentage: 45.6, 
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            quote: "Every child deserves access to quality education and innovative learning opportunities."
          },
          { 
            id: 'sb2', 
            name: 'Mike Thompson', 
            party: 'Progressive Education', 
            votes: 189, 
            percentage: 36.8, 
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            quote: "Transforming education through technology and community engagement."
          },
          { 
            id: 'sb3', 
            name: 'Lisa Rodriguez', 
            party: 'Community Choice', 
            votes: 90, 
            percentage: 17.6, 
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            quote: "Putting parents and students at the center of educational decision-making."
          }
        ],
        totalVotes: 513,
        votersCount: 850
      }
    ],
    completed: [
      {
        id: 3,
        title: "State Governor Election",
        description: "State-wide gubernatorial election",
        endDate: "2025-06-01",
        status: "completed",
        hasVoted: true,
        results: "Results Published",
        candidates: [
          { 
            id: 'gov1', 
            name: 'David Martinez', 
            party: 'Democratic Party', 
            votes: 892, 
            percentage: 45.4, 
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
            quote: "Working together to build sustainable prosperity for our state's future."
          },
          { 
            id: 'gov2', 
            name: 'Emma Taylor', 
            party: 'Republican Party', 
            votes: 734, 
            percentage: 37.3, 
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
            quote: "Lower taxes, smaller government, and more opportunities for businesses to thrive."
          },
          { 
            id: 'gov3', 
            name: 'James Clark', 
            party: 'Green Party', 
            votes: 341, 
            percentage: 17.3, 
            image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
            quote: "Environmental protection and social justice go hand in hand for a better tomorrow."
          }
        ],
        totalVotes: 1967,
        votersCount: 2100
      }
    ],
    upcoming: [
      {
        id: 4,
        title: "Municipal Council Election",
        description: "City council member elections",
        startDate: "2025-09-01",
        status: "upcoming",
        hasVoted: false,
        candidates: []
      }
    ]
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5, transition: { type: "spring", stiffness: 300 } }
  };

  const getStatusColor = (status, hasVoted) => {
    if (hasVoted) return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'active') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (status === 'completed') return 'bg-gray-100 text-gray-800 border-gray-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getStatusText = (status, hasVoted) => {
    if (hasVoted && status === 'active') return 'Voted';
    if (hasVoted && status === 'completed') return 'Voted';
    if (status === 'active') return 'Vote Now';
    if (status === 'completed') return 'Completed';
    return 'Upcoming';
  };

  const handleVoteSubmit = () => {
    if (!selectedCandidate) {
      alert('Please select a candidate');
      return;
    }
    
    // Mark as voted
    votingSessions.active = votingSessions.active.map(session => 
      session.id === selectedSession.id 
        ? { ...session, hasVoted: true }
        : session
    );
    
    setIsVoting(false);
    setSelectedSession(null);
    setSelectedCandidate('');
    setTokenVerified(false);
    setVotingToken('');
    setGeneratedToken('');
    alert('Vote submitted successfully!');
  };

  const generateVotingToken = async () => {
    setIsGeneratingToken(true);
    // Simulate API call to generate token and send to email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a random 6-digit token (this would be sent to email in real implementation)
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedToken(token); // Store for verification (in real app, this would be stored in backend)
    setIsGeneratingToken(false);
    
    // Show success message that token was sent to email
    alert('Voting token has been sent to your registered email address.');
  };

  const verifyVotingToken = async () => {
    if (!votingToken.trim()) {
      alert('Please enter a voting token');
      return;
    }
    
    setIsVerifyingToken(true);
    // Simulate API call to verify token
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (votingToken === generatedToken) {
      setTokenVerified(true);
      setShowTokenModal(false);
      setIsVoting(true);
    } else {
      alert('Invalid voting token. Please check and try again.');
    }
    setIsVerifyingToken(false);
  };

  const handleCastVoteClick = (session) => {
    setSelectedSession(session);
    setShowTokenModal(true);
    setTokenVerified(false);
    setVotingToken('');
    setGeneratedToken('');
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Voter Dashboard</h1>
              <p className="text-gray-600">Cast your vote and monitor election progress</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <i className="ri-shield-check-line mr-1"></i>
                Verified Voter
              </div>
              <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                <i className="ri-time-line mr-1"></i>
                Session: {formatTime(sessionExpiry)}
              </div>
              <button 
                onClick={() => window.location.href = '/voter/login'}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ri-logout-box-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Voting Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...votingSessions.active].map((session, index) => (
            <motion.div
              key={session.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {session.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {session.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status, session.hasVoted)}`}>
                    {getStatusText(session.status, session.hasVoted)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-group-line mr-2"></i>
                    <span>{session.candidates?.length || 0} candidates</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="ri-calendar-line mr-2"></i>
                    <span>
                      {session.endDate ? `Ends: ${session.endDate}` : `Starts: ${session.startDate}`}
                    </span>
                  </div>
                  {session.results && (
                    <div className="flex items-center text-sm text-green-600">
                      <i className="ri-bar-chart-line mr-2"></i>
                      <span>{session.results}</span>
                    </div>
                  )}
                  {session.totalVotes && (
                    <div className="flex items-center text-sm text-blue-600">
                      <i className="ri-pie-chart-line mr-2"></i>
                      <span>{session.totalVotes} votes cast of {session.votersCount} registered</span>
                    </div>
                  )}
                </div>

                {/* Show progress for voted sessions */}
                {session.hasVoted && session.candidates?.length > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Current Results:</h4>
                    <div className="space-y-2">
                      {session.candidates.slice(0, 3).map((candidate, idx) => (
                        <div key={candidate.id} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${getCandidateDotColor(idx)}`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium">{candidate.name}</span>
                              <span>{candidate.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <motion.div
                                className={`h-1 rounded-full bg-gradient-to-r ${getCandidateColor(idx)}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${candidate.percentage}%` }}
                                transition={{ duration: 1, delay: idx * 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleCastVoteClick(session)}
                    disabled={session.hasVoted}
                    className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                      session.hasVoted 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                    }`}
                  >
                    <i className="ri-vote-line mr-2"></i>
                    {session.hasVoted ? 'Vote Cast' : 'Cast Vote'}
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedSession(session);
                      setShowProgress(true);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <i className="ri-bar-chart-line mr-2"></i>
                    View Progress
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {votingSessions.active.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i className="ri-inbox-line text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No active sessions</h3>
            <p className="text-gray-600">There are no active voting sessions at this time.</p>
          </motion.div>
        )}
      </div>

      {/* Voting Token Modal */}
      <AnimatePresence>
        {showTokenModal && selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTokenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Voting Verification</h2>
                  <p className="text-gray-600">Generate and verify your voting token</p>
                </div>
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* Election Info */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-1">{selectedSession.title}</h3>
                  <p className="text-sm text-blue-700">{selectedSession.description}</p>
                </div>

                {/* Step 1: Generate Token */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                    <h4 className="font-semibold text-gray-900">Generate Voting Token</h4>
                  </div>
                  
                  {!generatedToken ? (
                    <button
                      onClick={generateVotingToken}
                      disabled={isGeneratingToken}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                    >
                      {isGeneratingToken ? (
                        <>
                          <i className="ri-loader-4-line mr-2 animate-spin"></i>
                          Sending token to email...
                        </>
                      ) : (
                        <>
                          <i className="ri-mail-line mr-2"></i>
                          Send Voting Token to Email
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center">
                        <i className="ri-mail-check-line text-2xl text-green-600 mr-3"></i>
                        <div className="flex-1">
                          <p className="text-sm text-green-700 mb-1">Voting token sent successfully!</p>
                          <p className="text-xs text-green-600">Check your registered email address for the 6-digit voting token.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 2: Verify Token */}
                {generatedToken && (
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <h4 className="font-semibold text-gray-900">Enter Token from Email</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={votingToken}
                        onChange={(e) => setVotingToken(e.target.value)}
                        placeholder="Enter 6-digit token from email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-xl tracking-wider font-bold"
                        maxLength="6"
                      />
                      
                      <button
                        onClick={verifyVotingToken}
                        disabled={!votingToken.trim() || isVerifyingToken}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                      >
                        {isVerifyingToken ? (
                          <>
                            <i className="ri-loader-4-line mr-2 animate-spin"></i>
                            Verifying Token...
                          </>
                        ) : (
                          <>
                            <i className="ri-shield-check-line mr-2"></i>
                            Verify Token & Proceed to Vote
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start">
                    <i className="ri-shield-line text-yellow-600 mr-2 mt-0.5"></i>
                    <div className="text-sm">
                      <p className="text-yellow-800 font-medium">Security Notice</p>
                      <p className="text-yellow-700">Your voting token will be sent to your registered email address. Please check your inbox and spam folder. Do not share this token with anyone.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voting Modal */}
      <AnimatePresence>
        {isVoting && selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsVoting(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSession.title}</h2>
                  <p className="text-gray-600">Select your candidate</p>
                </div>
                <button
                  onClick={() => setIsVoting(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {selectedSession.candidates.map((candidate, index) => (
                  <motion.label
                    key={candidate.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedCandidate === candidate.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <input
                        type="radio"
                        name="candidate"
                        value={candidate.id}
                        checked={selectedCandidate === candidate.id}
                        onChange={(e) => setSelectedCandidate(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 mt-1 flex items-center justify-center ${
                        selectedCandidate === candidate.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedCandidate === candidate.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </div>
                      <div className="w-20 h-20 rounded-full overflow-hidden mr-4 border-3 border-white shadow-lg flex-shrink-0">
                        <img 
                          src={candidate.image} 
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-lg mb-1">{candidate.name}</div>
                        <div className="text-sm text-gray-600 mb-3">{candidate.party}</div>
                        <div className="text-sm text-gray-700 italic">
                          <i className="ri-double-quotes-l text-blue-500 mr-1"></i>
                          {candidate.quote}
                          <i className="ri-double-quotes-r text-blue-500 ml-1"></i>
                        </div>
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsVoting(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVoteSubmit}
                  disabled={!selectedCandidate}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
                >
                  <i className="ri-check-line mr-2"></i>
                  Submit Vote
                </button>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start">
                  <i className="ri-warning-line text-yellow-600 mr-2 mt-0.5"></i>
                  <div className="text-sm">
                    <p className="text-yellow-800 font-medium">Important Notice</p>
                    <p className="text-yellow-700">Once submitted, your vote cannot be changed. Please review your selection carefully.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Modal */}
      <AnimatePresence>
        {showProgress && selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProgress(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSession.title}</h2>
                  <p className="text-gray-600">Real-time Election Progress</p>
                </div>
                <button
                  onClick={() => setShowProgress(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <i className="ri-close-line text-gray-600"></i>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Votes</p>
                      <p className="text-2xl font-bold">{selectedSession.totalVotes?.toLocaleString() || 0}</p>
                    </div>
                    <i className="ri-checkbox-circle-line text-3xl text-blue-200"></i>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Turnout Rate</p>
                      <p className="text-2xl font-bold">
                        {selectedSession.votersCount ? 
                          Math.round((selectedSession.totalVotes / selectedSession.votersCount) * 100) : 0}%
                      </p>
                    </div>
                    <i className="ri-pie-chart-line text-3xl text-green-200"></i>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Leading</p>
                      <p className="text-lg font-bold">{selectedSession.candidates?.[0]?.name || 'N/A'}</p>
                    </div>
                    <i className="ri-trophy-line text-3xl text-purple-200"></i>
                  </div>
                </div>
              </div>

              {/* Candidates Results */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Results</h3>
                <div className="space-y-4">
                  {selectedSession.candidates?.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6"
                    >
                      <div className="flex items-start mb-4">
                        <div className="flex items-center flex-1">
                          <div className={`w-4 h-4 rounded-full mr-4 mt-1 ${getCandidateDotColor(index)}`}></div>
                          <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-3 border-white shadow-md flex-shrink-0">
                            <img 
                              src={candidate.image} 
                              alt={candidate.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-medium text-gray-900 text-lg">{candidate.name}</span>
                                <span className="text-sm text-gray-600 ml-2">({candidate.party})</span>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-gray-900">{candidate.votes?.toLocaleString() || 0} votes</span>
                                <span className="text-sm text-gray-600 ml-2">({candidate.percentage || 0}%)</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-600 italic mb-3">
                              <i className="ri-double-quotes-l text-blue-500 mr-1"></i>
                              {candidate.quote}
                              <i className="ri-double-quotes-r text-blue-500 ml-1"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${getCandidateColor(index)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${candidate.percentage || 0}%` }}
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
                  Results update in real-time
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoterDashboard;
