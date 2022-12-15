import { useRouter } from 'next/router';

const Detail = ({ params }) => {
  // const router = useRouter();
  // console.log('router > ', router);
  // const [title, id] = router.query.params || ['Loading...', 0];
  const [title, id] = params;

  return (
    <div>
      <h2>
        {title} ({id})
      </h2>
    </div>
  );
};

const getServerSideProps = ({ params }) => {
  return {
    props: params,
  };
};

export { getServerSideProps };
export default Detail;
