import axios from 'axios';
import { Buffer } from 'buffer';

const tossSuccess = (req, res) => {
  const { paymentKey, orderId, amount } = req.query;

  const options = {
    method: 'POST',
    url: 'https://api.tosspayments.com/v1/payments/confirm',
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_TOSS_SECRET_KEY + ':',
        'utf-8'
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    data: {
      paymentKey,
      orderId,
      amount,
    },
  };

  axios(options)
    .then((response) => {
      console.log('response > ', response);
      res.status(200).redirect('http://localhost:3001/toss');
    })
    .catch((err) => {
      console.error('error > ', err);
    });
};
export default tossSuccess;
