import React, { useEffect, useState } from 'react';
import { useLazyGetSummaryQuery } from '../Services/article';
import loading from '../assets/loading.svg'

const Article = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });

  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const localstorageArticles = JSON.parse(localStorage.getItem('articles'))?.slice(0, 5);

    if (localstorageArticles) {
      setAllArticles(localstorageArticles);
    }
  }, []);

  const submitBtn = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  const handleDelete = (index) => {
    const updatedArticles = [...allArticles];
    updatedArticles.splice(index, 1);
    setAllArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  return (
    <div className='mt-6 mb-10'>
      <div>
        <form onSubmit={submitBtn}>
          <div>
            <div className="rounded-lg relative w-3/6 mx-auto max-[830px]:w-4/5 max-[400px]:w-11/12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
              <input
                type="text"
                className="py-3 px-10 w-full block bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Enter a URL"
                value={article.url}
                onChange={(e) => setArticle({
                  ...article,
                  url: e.target.value
                })}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                <svg className='flex-shrink-0 w-4 h-4 text-gray-500' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path d="M30 19H20a8 8 0 1 0 0 16h16a8 8 0 0 0 6-13.292"></path><path d="M6 24.292A8 8 0 0 1 12 11h16a8 8 0 1 1 0 16H18"></path></g></svg>
              </div>
              <button
                type='submit'
                className="absolute inset-y-0 end-[0.30rem] right-1 flex items-center border border-gray-300 px-2 rounded-lg cursor-pointer h-5/6 my-auto hover:border-black transition-all">
                <svg className='flex-shrink-0 h-6 w-6 hover:scale-110' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m5.5 10.5l-2-2l2-2"></path><path d="M3.5 8.5h5a1 1 0 0 0 1-1v-3"></path></g></svg>
              </button>
            </div>
          </div>
        </form>
        {/* Browser history */}
        <div className='mt-5'>
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              className="bg-gray-300 border border-gray-400 text-sm text-gray-800 rounded-lg p-4 w-2/5 mx-auto max-[830px]:w-4/5 max-[400px]:w-11/12 mb-1">
              <div className='flex items-center gap-4'>
                <div className='border p-1 rounded-md border-black cursor-pointer' onClick={() => handleDelete(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" d="M20 20L4 4m16 0L4 20"></path></svg>
                </div>
                <p className='truncate text-blue-600'>{item.url}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='my-10 max-w-full flex justify-center items-center w-8/12 mx-auto max-[830px]:w-4/5 max-[400px]:w-11/12'>
          {isFetching ? (
            <div>
              <img src={loading} className='w-40 h-40' />
            </div>
          ) : error ? (
            <div className='flex flex-col text-center'>
              Well, that wasn't supposed to happen. Please try again later.
              <span className='text-gray-700'>{error?.data?.error}</span>
            </div>
          ) : (
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h1 className='text-2xl font-bold '>Article Summary</h1>
                <div className='p-3'>
                  <p>{article.summary}</p>
                </div>
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
};

export default Article;
