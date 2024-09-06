import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieReviewsById } from '../services/movie';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import "./MovieReviewsSection.css";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoIosCheckmarkCircle } from 'react-icons/io';

function MovieReviewsSection({ id, mediaType }) {
    const [reviewIndex, setReviewIndex] = useState(0); // Initialize to 0 to match array indexing
    const [reviews, setReviews] = useState(null);
    const [currentReview, setCurrentReview] = useState(null);
    const [showIndexInputBtn, setShowIndexInputBtn] = useState(false);
    const [indexInput, setIndexInput] = useState('');

    const { data: reviewsData } = useQuery({
        queryKey: ["movie-reviews", id, mediaType],
        queryFn: getMovieReviewsById,
        onSuccess: (data) => {
            console.log("Query succeeded with data:", data);
        },
        onError: (error) => {
            console.error("Query failed with error:", error);
        },
    });

    // Update reviews when reviewsData changes
    useEffect(() => {
        setReviews(reviewsData?.data?.results || []); // Default to empty array if no data
    }, [reviewsData]);

    // Update currentReview when reviews or reviewIndex changes
    useEffect(() => {
        if (reviews && reviews.length > 0) {
            setCurrentReview(reviews[reviewIndex]);
        }
    }, [reviews, reviewIndex]);

    // Set the input index to the current review index
    useEffect(() => {
        setIndexInput(reviewIndex + 1);
    }, [reviewIndex]);

    // Handle index change from input
    const handleIndexChange = () => {
        const newIndex = parseInt(indexInput, 10) - 1;
        if (newIndex >= 0 && newIndex < reviews.length) {
            setReviewIndex(newIndex);
            setShowIndexInputBtn(false);
        }
    };

    // Function to truncate review content
    const truncateContent = (content, wordLimit) => {
        const words = content.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + '...' : content;
    };

    const truncatedContent = currentReview?.content ? truncateContent(currentReview.content, 100) : '';

    return (
        <div className='mt-10'>
            <h1 className='text-2xl font-bold mb-4'>Social</h1>
            {reviews?.length ? (
                <>
                    {currentReview ? (
                        <div className='flex flex-col p-4 pb-6 shadow-black shadow-xl rounded-lg'>
                            {/* Example content */}
                            <div className='flex justify-between items-center'>
                                <button
                                    className='m-2 disabled:text-white/20'
                                    onClick={() => setReviewIndex(index => Math.max(index - 1, 0))}
                                    disabled={reviewIndex === 0}
                                >
                                    <IoIosArrowDropleftCircle fontSize={30} />
                                </button>
                                <div className='flex gap-3 items-center ml-5'>
                                    <p className='text-sm'>
                                        <input
                                            type="number"
                                            min="1"
                                            max={reviewsData?.data?.total_results || 1}
                                            value={indexInput}
                                            className='w-8 text-center bg-white/20 mr-1 rounded focus:outline-none'
                                            onChange={e => setIndexInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleIndexChange()}
                                        />
                                        /<span className='ml-1'>{reviewsData?.data?.total_results}</span>
                                    </p>
                                    {showIndexInputBtn && (
                                        <button onClick={handleIndexChange}>
                                            <IoIosCheckmarkCircle fontSize={20} />
                                        </button>
                                    )}
                                </div>
                                <button
                                    className='m-2 disabled:text-white/20'
                                    onClick={() => setReviewIndex(index => Math.min(index + 1, reviews.length - 1))}
                                    disabled={reviewIndex >= reviews.length - 1}
                                >
                                    <IoIosArrowDroprightCircle fontSize={30} />
                                </button>
                            </div>
                            <div className='mt-4 ml-3 px-4'>
                                <div className='flex items-center gap-3'>
                                    <Link>
                                        {currentReview?.author_details?.avatar_path ? (
                                            <img
                                                src={`https://media.themoviedb.org/t/p/w45_and_h45_face${currentReview?.author_details?.avatar_path}`}
                                                className='rounded-full'
                                                style={{ width: "60px", height: "60px" }}
                                            />
                                        ) : (
                                            <div
                                                className='rounded-full flex items-center justify-center text-3xl bg-red-900'
                                                style={{ width: "50px", height: "50px" }}
                                                id='review_author_logo'
                                            >
                                                {currentReview?.author?.toUpperCase()[0]}
                                            </div>
                                        )}
                                    </Link>
                                    <div className='w-fit'>
                                        <a href='#' className='transition-all hover:text-white/80'>
                                            <h2 className='text-lg w-fit inline'>
                                                A review by <span className='font-bold'>{currentReview.author}</span>
                                            </h2>
                                        </a>
                                        <p className='text-sm text-white/50'>
                                            Written by
                                            <Link className='text-white transition-all hover:text-white/80 mx-1'>
                                                {currentReview.author}
                                            </Link>
                                            on {format(new Date(currentReview?.created_at), 'dd MMMM yyyy')}
                                        </p>
                                    </div>
                                </div>
                                <div className='mt-5' id='review_body'>
                                    <ReactMarkdown>{truncatedContent}</ReactMarkdown>
                                    <Link to={`/reviews/${currentReview.id}`} className='underline ml-2'>
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading or no reviews available.</p>
                    )}
                </>
            ) : (
                <h2 className='w-full rounded-lg flex items-center justify-center text-lg shadow-lg shadow-black h-40'>
                    There is no review written for this content.
                    <Link className='underline ml-1'> Write one!</Link>
                </h2>
            )}
        </div>
    );
}

export default MovieReviewsSection;
