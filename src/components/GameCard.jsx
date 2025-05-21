export function GameCard({ person, onGuess, disabled }) {
  return (
    <div className="max-w-lg w-full mx-auto rounded overflow-hidden shadow-lg bg-white">
      <img 
        src={person.img} 
        alt={person.name}
        className="w-full h-64 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-4 text-center">{person.name}</div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onGuess(true)}
            disabled={disabled}
            className={`
              bg-green-500 text-white px-4 py-2 rounded transition text-sm
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}
            `}
          >
            Technical
          </button>
          <button
            onClick={() => onGuess(false)}
            disabled={disabled}
            className={`
              bg-red-500 text-white px-4 py-2 rounded transition text-sm
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}
            `}
          >
            Non-Technical
          </button>
        </div>
      </div>
    </div>
  )
} 