import axios from 'axios';
import { Buffer } from 'buffer';

const brandSuccess = (req, res) => {
  console.log('req.body > ', req.body);
  const { paymentKey, methodId, orderId, amount, customerKey } = JSON.parse(
    req.body
  );

  const options = {
    method: 'POST',
    url: 'https://api.tosspayments.com/v1/brandpay/payments/confirm',
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_TOSS_SECRET_KEY + ':',
        'utf-8'
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    data: {
      paymentKey,
      // methodId,
      customerKey,
      orderId,
      amount,
    },
  };

  axios(options)
    .then((result) => {
      console.log('result > ', result);
      return res.status(200).send('ok');
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send('fail');
    });
};
export default brandSuccess;
