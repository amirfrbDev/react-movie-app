import { FaArrowRight, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MovieCastSlider({ castData }) {

    return (
        <div className='w-full rounded-lg '>
            <h2 className='text-xl md:text-2xl font-bold mb-5 mt-8 md:mt-0'>Top Billed Cast</h2>
            <ul className='flex overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 h-fit  gap-4 md:p-3 pl-2  shadow-inner shadow-black rounded-lg' id='chos'>
                {castData?.data?.cast?.length ? (
                    <>
                        {castData?.data?.cast?.slice(0, 10)?.map((actor) => (
                            <li key={actor.id} className='flex-shrink-0 w-[130px] md:w-[150px] h-[290px] md:h-[300px] rounded-lg shadow-xl shadow-black'>
                                <Link to={`/person/${actor.id}`}>
                                    {
                                        actor.profile_path ? (
                                            <img
                                                src={`https://media.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`}
                                                alt={actor.name}
                                                className='w-full h-[175px] object-cover rounded-t-lg transition-all hover:brightness-110'
                                            />
                                        ) : (
                                            <div className='w-full h-[175px] flex items-center justify-center bg-black/50 rounded-lg rounded-b-none'><span className='w-fit h-fit'><FaUser fontSize={60} className="text-gray" /></span></div>
                                        )
                                    }
                                </Link>
                                <Link to={`/person/${actor.id}`}>
                                    <p className='font-semibold text-center mt-2 transition-colors hover:text-white/70'>{actor.name}</p>
                                </Link>
                                <p className='text-xs text-center text-gray-600'>{actor.character}</p>
                            </li>
                        ))}
                        <li className='flex items-center justify-center flex-shrink-0 w-[140px] h-[300px] '>
                            <Link className='h-fit flex items-center gap-1 hover:text-white/70'>View more <span><FaArrowRight /></span></Link>
                        </li>
                    </>
                ) : <h1 className='w-full text-center my-10'>No Cast has been added</h1>
                }

            </ul>
            <Link to="#" className='w-fit min-w-0 flex transition-all underline hover:text-white/70'>
                <h2 className='text-sm md:text-lg mt-4 w-fit'>Full Cast & Crew</h2>
            </Link>
        </div >
    );
}

export default MovieCastSlider;
