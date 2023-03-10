import { loadTossPayments } from '@tosspayments/payment-sdk';
import { loadBrandPay } from '@tosspayments/brandpay-sdk';
import { useEffect } from 'react';
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
          orderId: 'agalinfighter-22',
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
          orderId: 'easyPay-agalinfighter-33',
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

  const billing = () => {
    loadTossPayments(clientKey)
      .then((tossPayments) => {
        console.log('카드 등록');
        tossPayments.requestBillingAuth('카드', {
          customerKey: 'agalinfighter',
          successUrl: `${API_URL}api/toss/billing/success`,
          failUrl: `${API_URL}api/toss/billing/fail`,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const billingPay = () => {
    fetch(`${API_URL}api/toss/billing/pay`, {
      method: 'POST',
      body: JSON.stringify({
        billingKey: 'AtzN0qXP-1Ln82dxyaU6Zh6-NN2sHWRha7zQpUFIpMA=',
        customerKey: 'agalinfighter',
      }),
    })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const brandPay = () => {
    loadBrandPay(clientKey, '대면슬레이어', {
      redirectUrl: 'http://localhost:3001/api/toss/brand/callbackauth',
    }).then((brandpay) => {
      brandpay
        .requestPayment({
          amount: 15000,
          orderId: 'agalin111',
          orderName: '토토스스 외 2건',
        })
        .then((pay) => {
          console.log('pay > ', pay); // amount, methodId, orderId, paymentKey
          fetch(`${API_URL}api/toss/brand/success`, {
            method: 'POST',
            body: JSON.stringify({ ...pay, customerKey: 'agalinfighter' }),
          });
        });
    });
  };

  const openPaymentSetting = () => {
    loadBrandPay(clientKey, '대면슬레이어', {
      redirectUrl: `${API_URL}api/toss/brand/callbackauth`,
    }).then((brandpay) => {
      brandpay.openSettings();
    });
  };

  let bw;
  const paymentSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    loadBrandPay(clientKey, '대면슬레이어', {
      redirectUrl: `${API_URL}api/toss/brand/callbackauth`,
    }).then((brandpay) => {
      bw = brandpay.createPaymentMethodsWidget({ amount: 60000 });
      console.log(bw);
      bw.render('#payment-widget', {
        methodType: '카드', // '카드' | '계좌'
        // methodId: '33', // 위젯에서 기본 결제 수단으로 선택할 결제 수단의 ID
        ui: {
          promotionSection: {
            summary: {
              visible: false,
            },
            description: {
              visible: false,
            },
          },
        },
      });
    });
  }, []);

  return (
    <>
      <h2>TossPayments Example</h2>
      <p>Test Client Key: {clientKey}</p>
      <p>Test Secret Key: {secretKey}</p>
      <button onClick={pay}>결제하기</button>
      <button onClick={easyTossPay}>간편결제 - 토스페이</button>
      <button onClick={billing}>카드 등록하기</button>
      <button onClick={billingPay}>등록한 카드로 결제하기</button>
      <button onClick={brandPay}>홈텔페이</button>
      <button onClick={openPaymentSetting}>결제 수단 관리</button>

      <form id='payment-form'>
        <div id='payment-widget'></div>
        <button
          id='payment-submit'
          onClick={paymentSubmit}
        >
          결제하기
        </button>
      </form>
    </>
  );
};
export default Toss;
