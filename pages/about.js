import Seo from '../components/Seo';

const About = ({ data1, data2 }) => {
  return (
    <div>
      <Seo title='About' />
      <h1>About</h1>
      <p>{data1}</p>
      <p>{data2}</p>
    </div>
  );
};

const getServerSideProps = () => {
  return {
    props: {
      data1: 'Hello',
      data2: 'ServerSideProps',
    },
  };
};
export default About;
export { getServerSideProps };
