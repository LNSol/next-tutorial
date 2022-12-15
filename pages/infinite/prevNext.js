import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

const PrevNext = () => {
  const [pageInfo, setPageInfo] = useState({
    curPage: 0,
    reqPage: 1,
    flag: 1,
    totalPage: null,
  });
  const [users, setUsers] = useState([]);

  const onClickPrev = () => {
    if (pageInfo.curPage > 1) {
      setPageInfo((prevPageInfo) => ({
        ...prevPageInfo,
        flag: -1,
        reqPage: prevPageInfo.reqPage - 1,
      }));
    }
  };
  const onClickNext = () => {
    if (pageInfo.curPage < pageInfo.totalPage) {
      setPageInfo((prevPageInfo) => ({
        ...prevPageInfo,
        flag: 1,
        reqPage: prevPageInfo.reqPage + 1,
      }));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}api/users?page=${pageInfo.reqPage}`,
        {
          signal,
        }
      )
      .then((res) => res.data)
      .then((data) => {
        console.log('data > ', data);
        setPageInfo((prevPageInfo) => ({
          ...prevPageInfo,
          curPage: prevPageInfo.curPage + prevPageInfo.flag,
          totalPage: data.totalPage,
        }));
        if (pageInfo.flag === 1) {
          setUsers((prevUsers) => [
            prevUsers.length === 16 ? [...prevUsers.slice(8)] : [...prevUsers],
            ...data.data,
          ]);
        } else {
          setUsers((prevUsers) => [...data.data, ...prevUsers]);
        }
      })
      .catch(console.error);

    return () => controller.abort();
  }, [pageInfo.reqPage, pageInfo.flag]);

  useEffect(() => {
    console.log('users > ', users);
  }, [users]);

  return (
    <div>
      <h2>Infinite Example</h2>
      <ul id='container'></ul>
      <button onClick={onClickPrev}>Prev</button>
      <button onClick={onClickNext}>Next</button>
      <style jsx>{`
        ul {
          list-style: none;
          padding-left: 0;
          height: 420px;
          border: 1px solid black;
          overflow: scroll;
        }
        li {
          border: 1px solid red;
          height: 60px;
        }
      `}</style>
    </div>
  );
};
export default PrevNext;
