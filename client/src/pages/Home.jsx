import { useState , useEffect } from 'react';
import { Card, FormField, Loader } from '../components';
import {instance} from '../utils';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  )
};


export default function Home() {
  const [searchText,setSearchText] = useState('');
  const [allPosts,setAllPosts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [searchedResults,setSearchedResults] = useState([]);
  const [searchTimeout,setSearchTimeout] = useState(null)
  
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data } = await instance.get('/')
      setAllPosts(data.posts)
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }

  }

  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };


  useEffect(() => {
     fetchPosts()
  },[]);



  return (
    <section>
       <div>
          <h1 className='font-extrabold text-[#222328] text-[32px]'>The ShowCase</h1>
          <p className='mt-2 text-[#666e75] text-[17px] max-w-[700px]'>Browse the thousands of beautiful images genrated by OpenAI</p>
       </div>
       <div className='mt-6 max-w-[1000px]'>
          <FormField type='text' label='Search' value={searchText} placeholder='Search Imagination' handleChange={handleSearch}/>
       </div>

       <div className='mt-8'>
          {loading ? (
            <div className="flex justify-center items-center">
               <Loader />
            </div>
          ) : (
            <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
          )}
       </div>
    </section>
  )
}
