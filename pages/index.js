import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Seo from '../components/Seo';

const fetchMovies = () =>
  fetch(
    // `https://api.themoviedb.org/3/movie/popular?api_key=9a6f3cb7a0030a8e92c5120f48b69dba`
    // '/api/movies'
    `${process.env.NEXT_PUBLIC_API_URL}/api/movies`
  ).then((res) => res.json());

const Home = ({ results }) => {
  // const { data, isLoading, isSuccess } = useQuery({
  //   queryKey: ['movies', 'popular'],
  //   queryFn: fetchMovies,
  //   staleTime: 30000,
  //   cacheTime: 30000,
  // });

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('data > ', data);
  //   }
  // }, [data]);

  // if (isLoading) {
  //   console.log('loading...');
  //   return <h3>Loading...</h3>;
  // }
  const router = useRouter();
  const onClickMovie = (id, title) => {
    router.push(`/movies/${title}/${id}`);
    // router.push(
    //   {
    //     pathname: `/movies/${title}/${id}`,
    //     query: {
    //       id,
    //       title,
    //       somethingSecret: 'secret',
    //     },
    //   },
    //   `/movies/${title}`
    // );
  };

  return (
    <div className='container'>
      <Seo title='Home' />
      {/* {isLoading && <h3>Loading...</h3>}
      {isSuccess && */}
      {results.map((movie) => (
        <div
          key={movie.id}
          className='movie'
        >
          <Image
            className='img'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            width={230}
            height={300}
            alt='movie-poster'
            onClick={() => onClickMovie(movie.id, movie.title)}
          />
          {/* <Link href={`/movies/${movie.id}`}> */}
          <Link
            // href={{
            //   pathname: `/movies/${movie.original_title}/${movie.id}`,
            //   query: {
            //     id: movie.id,
            //     title: movie.original_title,
            //     somethingSecret: 'secret',
            //   },
            // }}
            // as={`/movies/${movie.original_title}`}
            href={`/movies/${movie.original_title}/${movie.id}`}
          >
            <h4>{movie.original_title}</h4>
          </Link>
        </div>
      ))}
      {/* ))} */}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie .img {
          max-width: 100% !important;
          border-radius: 12px !important;
          transition: transform 0.2s ease-in-out !important;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px !important;
        }
        .movie:hover .img {
          transform: scale(1.05) translateY(-10px) !important;
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};
export default Home;

const getServerSideProps = async () => {
  const { results } = await fetchMovies();
  console.log('results > ', results);
  return {
    props: {
      results,
    },
  };
};
export { getServerSideProps };
