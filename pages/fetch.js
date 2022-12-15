import { useEffect, useState } from 'react';

const FetchUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/users/1`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div>
      <h2>FetchUser</h2>
      {user && (
        <p>
          {user.id}: {user.name}
        </p>
      )}
    </div>
  );
};
export default FetchUser;
