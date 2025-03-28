
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { ArrowRight, Share2 } from 'lucide-react'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [position, setPosition] = useState(0)
  const [referralCode, setReferralCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Simulate API call
    setPosition(Math.floor(Math.random() * 100) + 1)
    setReferralCode(btoa(email).slice(0, 8))
    setSubmitted(true)
  }

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`
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
                  Coming Soon
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
                  className="flex-none rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 group"
                >
                  Join 
                  <ArrowRight className="ml-2 h-6 w-6 inline transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
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
                Position <span className="text-white font-semibold">#{position}</span> in line
              </p>
              <p className="text-gray-400">
                Share your referral link to move up the list faster
              </p>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <p className="font-mono text-sm text-gray-400 break-all">
                {window.location.origin}?ref={referralCode}
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
        )}
      </div>
      <Toaster position="top-center" theme="dark" />
    </div>
  )
}

export default App