import { memo } from 'react';

const ChatMsg = ({ content }) => {
  return (
    <div>
      <p>{content}</p>
      <style jsx>{`
        p {
          border: 1px solid red;
          margin: 0;
          height: 50px;
          line-height: 50px;
        }
      `}</style>
    </div>
  );
};
export default memo(ChatMsg);
