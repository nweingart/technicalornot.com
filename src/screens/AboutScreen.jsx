import { motion } from 'framer-motion'

export function AboutScreen() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">About Technical or Not</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">The Game</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <p className="text-gray-700 mb-4">
            Technical or Not is a fun game that challenges your ability to identify whether someone is technical based on their appearance. 
            It's designed to challenge our biases about what a "technical person" looks like.
          </p>
          <p className="text-gray-700">
            Players are shown profile pictures and must guess whether each person is technical or not. 
            After each guess, you'll learn the truth and see their background.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why I Built This</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <p className="text-gray-700">
            The tech industry is diverse, but our mental image of "technical people" often isn't. 
            This game aims to highlight that technical talent comes in all forms, challenging our unconscious biases.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <p className="text-gray-700 mb-4">
            If you see your profile in the stack and want it taken down (whether it was submitted by you or someone else) 
            email me at <a href="mailto:ned@technicalornot.com" className="text-[#FF6601] hover:text-[#FF7F33]">
            ned@technicalornot.com</a> and I will take it down immediately.
          </p>
          <p className="text-gray-700">
            This project is purely for fun (maybe clout) and I will not be monetizing this in anyway. 
            I do not own any rights to any of the content or anything else associated with the site. I will delete all images and personal info when I've had my fun and take down the site. 
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">About the Developer</h2>
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="flex items-start gap-6">
            <img 
              src="/developer-image.jpg" 
              alt="Developer"
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-xl font-medium mb-2">Ned</h3>
              <p className="text-gray-700 mb-4">
                I like writing code and messong around. I tweet a lot into the void so follow me there.
              </p>
              <div className="flex gap-4">
                <motion.a 
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-6 h-6 fill-[#FF6601]" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-6 h-6 fill-[#FF6601]" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.203 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://instagram.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-6 h-6 fill-[#FF6601]" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <svg className="w-6 h-6 fill-[#FF6601]" viewBox="0 0 24 24">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 