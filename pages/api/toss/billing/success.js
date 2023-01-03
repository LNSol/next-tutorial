import axios from 'axios';
import { Buffer } from 'buffer';

const billingSuccess = (req, res) => {
  const { customerKey, authKey } = req.query;
  const options = {
    method: 'POST',
    url: 'https://api.tosspayments.com/v1/billing/authorizations/issue',
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_TOSS_SECRET_KEY + ':',
        'utf-8'
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    data: {
      authKey,
      customerKey,
    },
  };

  axios(options)
    .then((response) => {
      console.log('response.data > ', response.data);
      return res.status(200).send('ok');
    })
    .catch((err) => {
      console.error(err);
      return res.status(500);
    });
};
export default billingSuccess;
