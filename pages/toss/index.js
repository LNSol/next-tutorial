import { loadTossPayments } from '@tosspayments/payment-sdk';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const clientKey = process.env.NEXT_PUBLIC_TOSS_TEST_KEY;
const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

const Toss = () => {
  const pay = () => {
    console.log('결제하기!!');

    loadTossPayments(clientKey)
      .then((tossPayments) => {
        console.log('결제중???');
        tossPayments.requestPayment('카드', {
          amount: 38000,
          orderId: 'vegaamond---',
          orderName: '토스 마스크 외 1건',
          customerName: '아갈인파이터',
          successUrl: `${API_URL}api/toss/success`,
          failUrl: `${API_URL}api/toss/fail`,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h2>TossPayments Example</h2>
      <p>Test Client Key: {clientKey}</p>
      <p>Test Secret Key: {secretKey}</p>
      <button onClick={pay}>결제하기</button>
    </>
  );
};
export default Toss;
