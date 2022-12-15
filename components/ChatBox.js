import { useEffect, useRef } from 'react';
import ChatMsg from './ChatMsg';

const ChatBox = ({ chats, getPrevPage }) => {
  const topRef = useRef(null);
  const targetRef = useRef(null);
  const bottomRef = useRef(null);

  const intersectionHandler = (entries, observer) => {
    if (entries[0].isIntersecting) {
      console.log('intersecting@@@');
      observer.unobserve(entries[0].target);
      setTimeout(() => {
        getPrevPage();
      }, 200);
    }
  };

  useEffect(() => {
    console.log('chats > ', chats[0].data);
    targetRef.current?.scrollIntoView({ block: 'center', behavior: 'auto' });

    const $container = document.getElementById('chat-box');
    const option = {
      root: $container,
      threshold: 1,
    };
    const observer = new IntersectionObserver(intersectionHandler, option);
    if (topRef.current) observer.observe(topRef.current);
  }, [chats]);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'auto' });
  }, []);

  return (
    <div>
      <h2>ChatBox</h2>
      {/* <button onClick={getPrevPage}>Prev</button> */}
      <div className='chat-box'>
        {chats.map((page, pIdx) =>
          page.data.msgs.map((msg, mIdx) => (
            <div
              key={msg.id}
              ref={
                pIdx === 0 && mIdx === 0
                  ? topRef
                  : pIdx === 1 && mIdx === 0
                  ? targetRef
                  : null
              }
            >
              <ChatMsg content={msg.content} />
            </div>
          ))
        )}
        <div ref={bottomRef}></div>
      </div>
      <style jsx>{`
        .chat-box {
          border: 1px solid black;
          height: 300px;
          overflow: scroll;
        }
      `}</style>
    </div>
  );
};
export default ChatBox;
