export function PersonScreen() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Person Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <img 
            src="placeholder.jpg"
            alt="Person Name"
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">Person Name</h1>
            <p className="text-gray-600 mb-4">Software Engineer at TechCorp</p>
            
            {/* Community Vote Stats */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Community Votes</h2>
              
              {/* Vote Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#FF6601] font-semibold">75% Technical</span>
                  <span className="text-gray-600 font-semibold">25% Non-Technical</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#FF6601] transition-all duration-500"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>

              {/* Total Votes */}
              <div className="mt-4 text-center text-gray-600">
                Based on 1,234 votes
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button 
            onClick={() => window.history.back()}
            className="text-[#FF6601] hover:text-orange-700 font-medium"
          >
            ← Back to Leaderboard
          </button>
        </div>
      </div>
    </div>
  )
} 