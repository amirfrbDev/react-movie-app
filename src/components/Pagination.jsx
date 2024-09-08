import { memo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "../pages/PopularMovies.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const range = 1; // Number of pages to show before and after the current page

        if (totalPages <= 5) {
            // If there are 5 or fewer pages, show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first page
            pages.push(1);

            // Show ellipsis if needed before current page
            if (currentPage > range + 2) {
                pages.push('...');
            }

            // Show pages around the current page
            for (let i = Math.max(currentPage - range, 2); i <= Math.min(currentPage + range, totalPages - 1); i++) {
                pages.push(i);
            }

            // Show ellipsis if needed after current page
            if (currentPage < totalPages - range - 1) {
                pages.push('...');
            }

            // Always show the last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className='flex justify-center mt-10 items-center text-sm gap-4 w-full'>
            <button
                className={styles.arrowButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <IoIosArrowBack className='mx-auto' />
            </button>
            {pageNumbers.map((page, index) =>
                page === '...' ? (
                    <span key={index} className={styles.notSelected}>...</span>
                ) : (
                    <button
                        key={page}
                        className={page === currentPage ? styles.selected : styles.notSelected}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}
            <button
                className={styles.arrowButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <IoIosArrowForward className='mx-auto' />
            </button>
        </div>
    );
};

export default memo(Pagination);
