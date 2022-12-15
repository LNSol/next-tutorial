const USERS = Array.from({ length: 100 }, (_, idx) => ({
  id: idx + 1,
  name: `User${idx + 1}`,
}));
const CNT = 8;
const LAST_PAGE = Math.ceil(USERS.length / CNT);

const users = (req, res) => {
  const page = Number(req.query.page);
  const sIdx = (page - 1) * CNT;
  const eIdx = sIdx + CNT;
  console.log('Called@@@@ :: ', page);

  res.status(200).json({ data: USERS.slice(sIdx, eIdx), totalPage: LAST_PAGE });
};
export default users;
