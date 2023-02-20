import {useState} from 'react'
import { FormField, Loader } from '../components'
import preview from '../assets/preview.png'
import { useNavigate } from "react-router-dom";
import {instance} from '../utils';

export default function CreatePost() {

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading,setLoading] = useState(false)
  const [form , setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  });

  const navigate = useNavigate();
  const handleChange = (e) => {setForm({...form,[e.target.name]:e.target.value})}
  const generateImg = async () => {
     if(form.prompt) {
       setGeneratingImg(true)

       try {
        const {data}= await instance.post('/create',{    
          prompt:form.prompt
        })
        setForm({...form , photo:`data:image/jpeg;base64,${data.photo}`})
       } catch(e) {
        console.log(e)
       } finally {
         setGeneratingImg(false)
       }
     } else {
      alert('fill the prompt')
     }
  }

  const handleSubmit = async (e) => {
     e.preventDefault();

     if(form.prompt && form.photo) {
      setLoading(true)
      try {
        await instance.post('/upload',{...form});
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
       
  }


  return (
    <section>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create Post</h1>
        <p className='mt-2 text-[#666e75] text-[17px] max-w-[700px]'>Create what you imagine</p>
      </div> 
      <div className='sm:flex justify-between items-center'>
      <form className="mt-5 max-w-3xl sm:w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            label="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            label="Write What You Imagine"
            type="text"
            name="prompt"
            placeholder="CAt eating biscuit"
            value={form.prompt}
            handleChange={handleChange}
          />

          <div className="sm:hidden relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            disabled={generatingImg ? true : false}
            className="mt-3 text-white bg-pink-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>

        <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
      <div className='hidden sm:flex w-1/2 justify-center items-center'>
       <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          </div>
     </div>

    </section> 
  )
}
