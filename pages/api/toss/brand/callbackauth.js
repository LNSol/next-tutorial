import axios from 'axios';
import { Buffer } from 'buffer';

const brandCallbackAuth = (req, res) => {
  const { code, customerKey } = req.query;
  console.log('callback req > ', req);
  console.log('code & customerKey > ', code, '/', customerKey);

  const options = {
    method: 'POST',
    url: 'https://api.tosspayments.com/v1/brandpay/authorizations/access-token',
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_TOSS_SECRET_KEY + ':',
        'utf-8'
      ).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    data: {
      grantType: 'AuthorizationCode',
      customerKey,
      code,
    },
  };

  axios(options)
    .then((result) => {
      console.log('result > ', result);
      console.log('result.data > ', result.data);
      return res.status(200).send('ok');
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send('fail');
    });
};
export default brandCallbackAuth;
