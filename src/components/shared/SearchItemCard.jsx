import React from 'react';
import { FaFilm, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SearchItemCard({ item, type }) {
  const commonClasses = 'flex-shrink-0 w-[98px] h-[147px] rounded border-2 border-gray-100 overflow-hidden transition-all shadow-zinc-900 hover:shadow-2xl'; // Ensure fixed size and prevent shrinkage
 
  const mediaType = item.media_type

  if (type === 'person') {
    return (
      <li className="flex gap-2 mt-3 hover:bg-gray-600 p-2 rounded-lg">
        <Link to={`persons/${item.id}`} className={`${commonClasses} h-[98px] `}>
          {item.profile_path ? (
            <img
              src={`https://media.themoviedb.org/t/p/w90_and_h90_face/${item.profile_path}`}
              alt={item.title || item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-900">
              <FaUser fontSize={60} className="text-white" />
            </div>
          )}
        </Link>

        <div className="flex flex-col justify-between pb-4 pl-2">
          <div>
            <Link to={`person/${item.id}`}>
              <h1 className="text-xl text-white/100 transition-all hover:text-white/70">
                {item.title || item.name}{' '}

                <span className="text-white/40">(person)</span>

              </h1>
            </Link>
            <p className="text-sm mt-1 text-white/50 ">{item.first_air_date}</p>
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className="flex gap-2 mt-3 hover:bg-gray-600 p-2 rounded-lg">
        <Link to={`${mediaType}/${item.id}`} className={commonClasses}>
          {item.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w94_and_h141_bestv2/${item.poster_path}`}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-900">
              <FaFilm fontSize={40} className="text-white" />
            </div>
          )}
        </Link>

        <div className="flex flex-col justify-between pb-4">
          <div>
            <Link to={`${mediaType}/${item.id}`}>
              <h1 className="text-xl text-white/100 transition-all hover:text-white/70">
                {item.title || item.name}{' '}
                {(item.original_name || item.original_title) && (
                  <span className="text-white/40">({item.original_name || item.original_title})</span>
                )}
              </h1>
            </Link>
            <p className="text-sm mt-1 text-white/50 ">{item.first_air_date}</p>
          </div>
          <p className="text-sm text-white">
            {item?.overview?.split(' ').slice(0, 40).join(' ')}...
          </p>
        </div>
      </li>
    );
  }
}

export default SearchItemCard;
