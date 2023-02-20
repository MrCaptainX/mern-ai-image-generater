import {BrowserRouter , Route , Routes , Link} from 'react-router-dom';
import {Home , CreatePost} from './pages';

function App() {

  return (
     <BrowserRouter>
        <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
           <Link to="/" className='font-semibold text-lg sm:text-2xl text-indigo-600'>A.I Image</Link>
           <Link to="/create-post" className='font-medium py-2 px-5 bg-indigo-600	rounded text-white'>Create</Link>
        </header>
        <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
     </BrowserRouter>
  )
}

export default App
