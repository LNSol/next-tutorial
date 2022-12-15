import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Infinite = () => {
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPage: null });
  const [users, setUsers] = useState([]);
  const targetRef = useRef(null);

  const intersectionHandler = (entries, observer) => {
    if (entries[0].isIntersecting) {
      console.log('intersecting@@@');
      observer.unobserve(entries[0].target);
      if (pageInfo.page < pageInfo.totalPage)
        setPageInfo((prevPageInfo) => ({
          ...prevPageInfo,
          page: prevPageInfo.page + 1,
        }));
    }
  };

  useEffect(() => {
    console.log('mount@@@@@@@@@@');
    const controller = new AbortController();
    const { signal } = controller;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}api/users?page=${pageInfo.page}`,
        { signal }
      )
      .then((res) => res.data)
      .then((data) => {
        console.log('data > ', data);
        setUsers((prevUsers) => [...prevUsers, ...data.data]);
        setPageInfo((prevPageInfo) => ({
          ...prevPageInfo,
          totalPage: data.totalPage,
        }));
      })
      .catch(console.error);
    return () => {
      console.log('unmount&&&&&&&&&&');
      controller.abort();
    };
  }, [pageInfo.page]);

  useEffect(() => {
    const $container = document.getElementById('container');
    const option = {
      root: $container,
      threshold: 1,
    };
    const observer = new IntersectionObserver(intersectionHandler, option);
    // if (targetRef.current) observer.observe(targetRef.current);
  }, [users]);

  return (
    <div>
      <h2>Infinite Example</h2>
      <ul id='container'>
        {users.map((user, idx) => (
          <li
            key={user.id}
            ref={users.length - 1 === idx ? targetRef : null}
          >
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          setPageInfo((prevPageInfo) => ({
            ...prevPageInfo,
            page: prevPageInfo.page - 1,
          }))
        }
      >
        Prev
      </button>
      <button
        onClick={() =>
          setPageInfo((prevPageInfo) => ({
            ...prevPageInfo,
            page: prevPageInfo.page + 1,
          }))
        }
      >
        Next
      </button>
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
export default Infinite;
