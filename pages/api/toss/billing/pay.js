import axios from 'axios';
import { Buffer } from 'buffer';

const billingPay = (req, res) => {
  const { billingKey, customerKey } = JSON.parse(req.body);
  console.log('billingKey > ', billingKey);
  console.log('customerKey > ', customerKey);

  const options = {
    method: 'POST',
    url: `https://api.tosspayments.com/v1/billing/${billingKey}`,
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_TOSS_SECRET_KEY + ':',
        'utf-8'
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    data: {
      customerKey,
      amount: 50000,
      orderId: 'agal1',
    },
  };

  axios(options)
    .then((response) => {
      console.log('response.data > ', response.data);
      return res.status(200).send('ok');
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send('fail');
    });
};
export default billingPay;
