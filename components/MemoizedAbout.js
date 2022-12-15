import { useEffect, memo } from 'react';
const AboutC = ({ title, date }) => {
  useEffect(() => {
    console.log('MemoizedAboutC is mounted@@@@@');
  });

  return (
    <div>
      <h4>About component</h4>
      <p>
        title: {title} / date: {date}
      </p>
    </div>
  );
};
export default memo(AboutC);
