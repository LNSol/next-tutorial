const UserBox = ({ user }) => {
  return (
    <>
      <div className='user-box'>
        <p>
          {user.id}: {user.name}
        </p>
      </div>

      <style jsx>{`
        .user-box {
          border: 1px solid red;
          height: 41px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};
export default UserBox;
