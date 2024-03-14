import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [customName, setCustomName] = useState("");
  const [customChar, setCustomChar] = useState("");
  const [buttonColor, setButtonColor] = useState('bg-blue-800');

  // useRef hook 
  const passwordRef = useRef(null)

  // const [maxLength , setMaxLength] = useState();

  const handleCustomNameChange = (e) => {
    setCustomName(e.target.value);
  }
  const handleCustomChar = (e) => {
    setCustomChar(e.target.value);
  }

  const buttonColorChanger = () => {

    setButtonColor('bg-blue-600');


    setTimeout(() => {
      setButtonColor('bg-blue-800');
    }, 1000);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    passwordGenerator();
    buttonColorChanger();
  }
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = customName ? customName : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    str += customChar ? customChar : '';
    if (numAllowed) str += '01234567890';
    if (charAllowed) str += '@#$%&*()_+';
    const charsUsed = new Array(str.length).fill(0);
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);

      while (charsUsed[charIndex] >= 1) {
        charIndex = Math.floor(Math.random() * str.length);
      }


      charsUsed[charIndex]++;

      pass += str.charAt(charIndex);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]) // setPassword is for optimiztion  to avoid unnecessary re-rendering of the component if we give password then we will go in infinite loop. We may remove set password. It is reponsivle for memoization i.e. optimization 

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-3 my-8 text-red-700 bg-gray-900 '>
        <h1 className='text-white text-center text-4xl mb-6'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />

          <button onClick={copyPasswordToClipboard} className='outline-none bg-green-600 text-white px-3 py-1 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                { setLength(e.target.value) }
              }} />
            <label >length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }} />
            <label>Character</label>
          </div>
        </div>
        <h2 className='text-center mb-4 mt-4 text-xl text-white'>Want to generate customize password ?</h2>
        <div className='flex flex-col shadow rounded-lg overflow-hidden mb-4 text-center'>
          <input type="text"
            className='outline-none w-full py-1 px-3'
            placeholder='Enter your name'
            value={customName}
            onChange={handleCustomNameChange}
          />

        </div>
        <div className='flex flex-col shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            className='outline-none w-full py-1 px-3'
            placeholder='Enter special character'
            value={customChar}
            onChange={handleCustomChar}
          />

        </div>
        <button type='submit' className={`outline-none w-full text-white px-3 py-1 shrink-0 rounded-md transition-colors duration-500 ${buttonColor}`} onClick={handleSubmit} >Submit</button>
      </div>
    </>
  )
}

export default App
