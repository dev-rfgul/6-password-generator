import { useEffect } from "react";
import { useState, useCallback, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+}{:?>+=-.,<";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      generatedPassword += str.charAt(char);
    }

    setPassword(generatedPassword);
  }, [length, setPassword, numberAllowed, characterAllowed]);
  const copyPasswordToClipboard = useCallback(() => { 
    // passwordRef.current.select();
    passwordRef.current?.select();
    // the diff btw both of them is of optional chaining which means that if the current is null or undefined it will not throw an error in the line above if its null it will throw type error.

    passwordRef.current?.setSelectionRange(0, 50);
    // it will only select the text form the given range
    window.navigator.clipboard.writeText(password);
  },[password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  const passwordRef = useRef(null);
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md px-6 py-8 flex flex-col items-center space-y-4">
        <p className="text-white text-3xl font-bold text-center">
          Password Generator
        </p>
        <div className="flex items-center border-b border-gray-700 w-full">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-3 bg-gray-900 text-white placeholder-gray-500 border border-gray-700 rounded-lg outline-none"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
        </div>

        <button
          onClick={copyPasswordToClipboard}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105 w-full sm:w-auto"
        >
          Copy Password
        </button>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <div className="flex items-center">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              step={1}
              className="w-full sm:w-43 cursor-pointer appearance-none bg-gray-700 h-1 rounded outline-none"
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <span className="text-white ml-2">{length}</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-green-400 focus:ring-green-500"
            />
            <label htmlFor="numberInput" className="text-white ">
              Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="form-checkbox h-5 w-5 text-green-400 focus:ring-green-500"
            />
            <label htmlFor="characterInput" className="text-white ">
              {" "}
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
