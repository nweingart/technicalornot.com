export function VoteResults({ voteTotals }) {
  const totalVotes = voteTotals.tech + voteTotals.nontech
  const techPercent = Math.round((voteTotals.tech / totalVotes) * 100) || 0
  const nonTechPercent = Math.round((voteTotals.nontech / totalVotes) * 100) || 0
  
  return (
    <div className="w-full mt-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-center mb-3">Community Votes</h3>
      
      <div className="space-y-2">
        {/* Labels */}
        <div className="flex justify-between text-xs">
          <span className="text-green-600 font-semibold whitespace-nowrap">Technical {techPercent}%</span>
          <span className="text-red-600 font-semibold whitespace-nowrap">{nonTechPercent}% Non-Technical</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-8 flex rounded-full overflow-hidden">
          <div 
            className="bg-green-500 transition-all duration-500"
            style={{ width: `${techPercent}%` }}
          />
          <div 
            className="bg-red-500 transition-all duration-500"
            style={{ width: `${nonTechPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
} 