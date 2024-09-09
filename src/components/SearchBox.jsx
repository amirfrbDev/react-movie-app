import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import "./SearchBox.css";
import { useQuery } from '@tanstack/react-query';
import { getSearchedItems } from '../services/search';
import SearchItemCard from './shared/SearchItemCard';
import useDebounce from '../hooks/useDebounce'; // Import debounce hook
import { IoIosArrowForward, IoMdArrowDropright } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';

function SearchBox() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);
  const [abortController, setAbortController] = useState(null);

  const navigate = useNavigate()

  const { isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ["searched-movies", debouncedInput.toLowerCase().trim()], // Use debounced input in query key
    queryFn: async () => {
      const controller = new AbortController();
      setAbortController(controller);

      try {
        return await getSearchedItems(debouncedInput, controller.signal);
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Request Cancelled!");
        } else {
          throw error;
        }
      }
    },
    retry: 3,
    enabled: false,
  });

  useEffect(() => {
    if (debouncedInput) {
      if (abortController) {
        abortController.abort();
      }
      refetch();
    }

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [debouncedInput]);

  const searchHandler = (event) => {
    event.preventDefault()
    navigate(`/search?query=${input}`)
    console.log("hey")
  }

 

  return (
    <div className='w-full h-screen bg-cover flex align-middle flex-col items-center -z-50' id='gooz'>
      <form className='w-3/4 flex flex-col text-xl mt-36' onSubmit={searchHandler}>
        <div className='h-12 flex flex-col relative'>
          <input
            type="text"
            placeholder='Search...'
            className='flex items-center w-full h-full rounded-full pl-5 text-white bg-white/15 transition-all focus:bg-white/35'
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          {
            input &&
            <button type='button' className='flex justify-center items-center w-8 h-8 absolute right-12 top-[6px] text-white rounded-full transition-all hover:bg-black/30' onClick={() => setInput("")}>
              <RxCross2 fontSize={25} />
            </button>
          }
          <button type='submit' className='flex justify-center items-center w-9 h-9 absolute right-3 top-1 text-white rounded-full transition-all hover:bg-black/30 '>
            <CiSearch fontSize={30} />
          </button>
        </div>
        {data?.data?.results?.length > 0 && debouncedInput && (
          <div className='bg-gray-700 w-full h-64 mt-2 p-4 rounded-xl overflow-y-scroll'>
            <ul>
              {isFetching ? <h2>Loading...</h2> : (
                data.data?.results?.map(item => (
                  <SearchItemCard key={item.id} item={item} type={item.media_type === "person" ? "person" : "else"} />
                ))
              )
              }
              {!isFetching && <Link><p className='justify-end text-white flex items-center'>See More<span><IoMdArrowDropright /></span></p></Link>}

            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBox;
