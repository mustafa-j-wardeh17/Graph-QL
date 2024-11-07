import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ page, setPage, totalPages }: {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number
}) => {


    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1)
        }
    }
    const handlePrevPage = () => {
        if (page !== 1) {
            setPage(prev => prev - 1)
        }
    }
    return (
        <div className="w-full flex items-center justify-center">
            <div className=" flex items-center gap-2">
                <button
                    onClick={handlePrevPage}
                    className="p-[9px] border duration-200 border-neutral-500 text-neutral-500 hover:text-neutral-300 rounded-md"
                >
                    <IoIosArrowBack />
                </button>
                <span className="">{page}</span>
                <button
                    onClick={handleNextPage}
                    className="p-[9px] border duration-200 border-neutral-500 text-neutral-500 hover:text-neutral-300 rounded-md"
                >
                    <IoIosArrowForward />
                </button>

            </div>
        </div>
    )
}

export default Pagination