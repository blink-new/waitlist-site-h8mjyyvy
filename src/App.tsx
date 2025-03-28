
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        {!submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-center">
              Join the waitlist
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
              Be the first to experience something amazing. Sign up now and invite your friends to move up the list.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-10">
              <div className="flex gap-x-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="min-w-0 flex-auto rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg"
                  required
                />
                <button
                  type="submit"
                  className="flex-none rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Join <ArrowRight className="ml-2 h-6 w-6 inline" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">You're in!</h2>
            <p className="text-lg text-gray-600 mb-8">
              You're #{position} in line. Want to move up? Share your referral link!
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <p className="font-mono text-sm text-gray-600 break-all">
                {window.location.origin}?ref={referralCode}
              </p>
            </div>
            
            <button
              onClick={copyReferralLink}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Copy referral link
            </button>
          </motion.div>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default App