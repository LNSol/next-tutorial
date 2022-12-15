import { useRouter } from 'next/router';

const TestParam = () => {
  const router = useRouter();
  console.log('test router > ', router);

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};
export default TestParam;
