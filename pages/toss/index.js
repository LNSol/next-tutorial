import { loadTossPayments } from '@tosspayments/payment-sdk';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const clientKey = process.env.NEXT_PUBLIC_TOSS_TEST_KEY;
const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;

const Toss = () => {
  const pay = () => {
    console.log('결제하기!!');

    loadTossPayments(clientKey)
      .then((tossPayments) => {
        console.log('신용, 체크 카드 결제');
        tossPayments.requestPayment('카드', {
          amount: 38000,
          orderId: 'daemyunslayer9',
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

  const easyTossPay = () => {
    loadTossPayments(clientKey)
      .then((tossPayments) => {
        console.log('간편결제 - 토스페이');
        tossPayments.requestPayment('카드', {
          amount: 20000,
          orderId: 'easyPay-TossPay10',
          orderName: '토스 티셔츠 외 2건',
          customerName: '배가아몬드',
          successUrl: `${API_URL}api/toss/success`,
          failUrl: `${API_URL}api/toss/fail`,
          flowMode: 'DIRECT',
          easyPay: '토스페이',
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
      <button onClick={easyTossPay}>간편결제 - 토스페이</button>
    </>
  );
};
export default Toss;
