
import { useState} from 'react';
const PractuceButtons = () => {

    const [message, setMessage] = useState("HELLO WORLD !!!");
    return(
        <div className='flex flex-col items-center h-screen justify-center'>
            <div>{message} </div>
            <button 
                className="mt-4 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-900 transition-colors"
                onClick={() => setMessage("Hey ya")}>
            </button>
            <button 
                className="mt-4 px-4 py-2 bg-red-400 text-white rounded hover:bg-green-900 transition-colors"
                onClick={() => setMessage("Hello World!")}>
            </button>
            <button 
                className="mt-4 px-4 py-2 bg-fpl-purple text-white rounded hover:bg-green-900 transition-colors"
                onClick={() => setMessage("Bye")}>
                
            </button>

        </div>



    );
     

};

export default PractuceButtons;
