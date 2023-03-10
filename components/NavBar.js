import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Image
        src='/vercel.svg'
        alt='vercel-logo'
        width={50}
        height={50}
      />
      <div>
        <Link
          href='/'
          className={router.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        <Link
          href='/about'
          className={router.pathname === '/about' ? 'active' : ''}
        >
          About
        </Link>
        <Link
          href='/infinite'
          className={router.pathname === '/inifinite' ? 'active' : ''}
        >
          Infinite
        </Link>
        <Link
          href='/infinite/reverse'
          className={router.pathname === '/infinite/reverse' ? 'active' : ''}
        >
          Reverse
        </Link>
        <Link
          href='/toss'
          className={router.pathname === '/toss' ? 'active' : ''}
        >
          Toss
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
}
