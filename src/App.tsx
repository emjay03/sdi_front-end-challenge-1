import { SetStateAction, useState } from "react";
import "./App.css";
import { RiCloseLargeFill } from "react-icons/ri";
import { News } from "./data/news";
import { Authors } from "./data/authors";
import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import dayjs from "dayjs";
function App() {
  const [author, setAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = News.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(News.length / itemsPerPage);
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handlePageClick = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };
  const openModal = (authorId: number) => {
    const foundAuthor = Authors.find((a) => a.id === authorId);
    setAuthor(foundAuthor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      |
      <div className="flex justify-center font-poppins">
        <div className="lg:max-w-[800px]  py-10  ">
          <div className="flex flex-col px-4">
            {currentItems.map((item) => {
              const author = Authors.find(
                (author) => author.id === item.author_id
              );
              return (
                <div key={item.id}>
                  <div className="flex relative">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="relative md:w-[800px] md:h-[400px] w-auto h-auto"
                    />
                    <div className=" absolute bottom-12 left-3 w-full text-center">
                      <div className="bg-[#eb0a1e] text-white absolute left-3 date ">
                        <div className="flex flex-col  py-2 px-7">
                          <span className="text-2xl font-semibold">13</span>
                          <span className="text-sm">JAN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end py-3">
                    <button className="flex items-center">
                      <PiShareFat />
                      SHARE
                    </button>
                  </div>
                  <div className="  border-t">
                    {author && (
                      <h4
                        className="text-[#ef303f] font-medium text-sm cursor-pointer"
                        onClick={() => openModal(item.author_id)}
                      >
                        {author.name}
                      </h4>
                    )}
                    {author && showModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                        <div className="modal-box bg-white p-7 rounded-lg w-100">
                          <button
                            className="absolute top-4 right-2 text-gray-600"
                            onClick={closeModal}
                          >
                            <RiCloseLargeFill size={20} />
                          </button>
                          <div className="flex  justify-center items-center pb-3">
                            <img src={author.avatar_url} className="w-44 " />
                          </div>
                          <h3 className=" text-lg">
                            {" "}
                            <strong>Name:</strong> {author.name}
                          </h3>
                          <p className=" text-lg">
                            <strong>Role:</strong> {author.role}
                            <br />
                            <strong>Place:</strong> {author.place}
                          </p>
                        </div>
                      </div>
                    )}

                    <h2 className="text-[#34414f] text-xl font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-sm">
                      {" "}
                      {dayjs(item.created_at).format("YYYY-MM-DD HH:mm")}
                    </p>

                    <p className="py-4 font-medium text-sm">{item.body}</p>

                    <button className="underline underline-offset-2 underline-md text-[#34414f] font-semibold">
                      READ ARTICLE
                    </button>
                  </div>
                </div>
              );
            })}
            {/* Pagination */}
            <div className="flex pt-10">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border-2 px-3"
              >
                <MdOutlineKeyboardArrowLeft />
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={`mx-1 ${
                    pageNumber === currentPage
                      ? "bg-[#ef303f]  px-4 text-white"
                      : " px-4 border-2  "
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="border-2 px-3"
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
