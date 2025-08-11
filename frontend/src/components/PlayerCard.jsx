import React from 'react';

const PlayerCard = ({ name, photo, position, points }) => {
 
  const positionStyles = {
    Goalkeeper: {
      bg: 'bg-yellow-300',
      text: 'text-black',
      short: 'GKP'
    },
    Defender: {
      bg: 'bg-yellow-400', 
      text: 'text-black',
      short: 'DEF'
    },
    Midfielder: {
      bg: 'bg-green-400',
      text: 'text-white',
      short: 'MID'
    },
    Forward: {
      bg: 'bg-red-400',
      text: 'text-white', 
      short: 'FWD'
    }
  };

  const style = positionStyles[position] || positionStyles.Midfielder;

  return (
    <div className="bg-white border border-gray-200 rounded-lg w-48 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-3  border-b border-gray-150">
        <div className="flex justify-between items-center mb-2">
          <span className={`${style.bg} ${style.text} text-xs font-bold px-2 py-1 rounded`}>
            {style.short}
          </span>
          <span className="text-lg font-bold text-gray-900">{points}</span>
        </div>
        
        <div className="flex justify-center mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover object-top"
              
            />
          </div>
        </div>

        <h3 className="text-sm font-medium text-gray-900 text-center leading-tight">
          {name}
        </h3>
      </div>

      <div className="px-3 py-2">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>£{(Math.random() * 5 + 4).toFixed(1)}m</span>
          <span>{Math.floor(Math.random() * 30 + 70)}% owned</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;

