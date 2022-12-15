import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import ChatBox from '../../components/ChatBox';

const Reverse = () => {
  const { data, isSuccess, fetchPreviousPage } = useInfiniteQuery({
    queryKey: ['chats'],
    queryFn: ({ pageParam = 0 }) =>
      axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}api/messages/reverse?page=${pageParam}`
      ),
    staleTime: 10000,
    cacheTime: 10000,
    getPreviousPageParam: (firstPage) =>
      firstPage.data.curPage !== 1 ? firstPage.data.curPage - 1 : undefined,
  });

  const getPrevPage = () => {
    fetchPreviousPage();
  };

  return (
    <div>
      <h2>Reverse Chat</h2>
      {isSuccess && (
        <ChatBox
          chats={data.pages}
          getPrevPage={getPrevPage}
        />
      )}
    </div>
  );
};
export default Reverse;
