
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { ArrowRight, Share2, Users } from 'lucide-react'
import { WaitlistUser } from './types'
import { addToWaitlist, getCurrentUser, validateEmail } from './lib/waitlist'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [userData, setUserData] = useState<WaitlistUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check for existing user
    const user = getCurrentUser();
    if (user) {
      setUserData(user);
      setSubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address')
      }

      // Get referral code from URL if exists
      const urlParams = new URLSearchParams(window.location.search)
      const refCode = urlParams.get('ref')
      
      const user = addToWaitlist(email, refCode || undefined)
      setUserData(user)
      setSubmitted(true)
      toast.success('Successfully joined the waitlist!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const copyReferralLink = () => {
    if (!userData) return
    const link = `${window.location.origin}?ref=${userData.referralCode}`
    navigator.clipboard.writeText(link)
    toast.success('Referral link copied!')
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="max-w-xl mx-auto px-4 py-16 sm:px-6 sm:py-24 relative z-10">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6 text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-200">
                  <Users className="w-4 h-4 mr-2" />
                  Join the Waitlist
                </span>
              </motion.div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Join the waitlist
              </h1>
              <p className="text-lg text-gray-400 max-w-lg mx-auto">
                Be among the first to experience something extraordinary. Sign up now and climb the ranks by inviting others.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-10">
              <div className="flex flex-col gap-4">
                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}
                <div className="flex gap-x-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="min-w-0 flex-auto rounded-lg bg-gray-900 border border-gray-800 px-4 py-3 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-none rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Join
                        <ArrowRight className="ml-2 h-6 w-6 inline transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : userData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1"
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                You're in!
              </h2>
              <p className="text-xl text-gray-400">
                Position <span className="text-white font-semibold">#{userData.position}</span> in line
              </p>
              {userData.referralCount > 0 && (
                <p className="text-green-400">
                  You've referred {userData.referralCount} {userData.referralCount === 1 ? 'person' : 'people'}!
                </p>
              )}
              <p className="text-gray-400">
                Share your referral link to move up the list faster
              </p>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <p className="font-mono text-sm text-gray-400 break-all">
                {window.location.origin}?ref={userData.referralCode}
              </p>
            </div>
            
            <button
              onClick={copyReferralLink}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 border border-gray-800 group"
            >
              <Share2 className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Copy referral link
            </button>
          </motion.div>
        ) : null}
      </div>
      <Toaster position="top-center" theme="dark" />
    </div>
  )
}

export default App