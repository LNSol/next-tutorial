const tossFail = (req, res) => {
  console.log('req > ', req);
  console.log('res > ', res);

  res.status(500).json({ msg: 'fail' });
};
export default tossFail;
