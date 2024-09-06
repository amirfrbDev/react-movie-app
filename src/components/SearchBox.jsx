import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import "./SearchBox.css";
import { useQuery } from '@tanstack/react-query';
import { getSearchedItems } from '../services/search';
import SearchItemCard from './shared/SearchItemCard';
import useDebounce from '../hooks/useDebounce'; // Import debounce hook
import { IoIosArrowForward, IoMdArrowDropright } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

function SearchBox() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300); // Use debounce with 300ms delay
  const [abortController, setAbortController] = useState(null);

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
    retry:3,
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

  return (
    <div className='w-full h-screen bg-cover flex align-middle flex-col items-center -z-50' id='gooz'>
      <form className='w-3/4 flex flex-col text-xl mt-36' onSubmit={(e) => e.preventDefault()}>
        <div className='h-12 flex flex-col relative'>
          <input
            type="text"
            placeholder='Search...'
            className='w-full h-full rounded-full pl-5 text-white bg-white/15 transition-all focus:bg-white/35'
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          {
            input &&
            <button className='w-7 h-7 absolute right-12 top-2 text-white' onClick={() => setInput("")}>
              <RxCross2 fontSize={30} />
            </button>
          }
          <button type='submit' className='w-7 h-7 absolute right-4 top-2 text-white'>
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
