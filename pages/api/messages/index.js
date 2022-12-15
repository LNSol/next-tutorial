const MESSAGES = Array.from({ length: 100 }, (_, idx) => ({
  id: idx + 1,
  content: `Message${idx + 1}`,
}));
const CNT = 20;
const TOTAL_PAGE = Math.ceil(MESSAGES.length / CNT);

const messages = (req, res) => {
  const page = Number(req.query.page) || 1;
  console.log('page > ', page);
  const sIdx = -page * CNT;
  const eIdx = MESSAGES.length - CNT * (page - 1);
  res.status(200).json({
    msgs: MESSAGES.slice(sIdx, eIdx),
    curPage: page,
    hasMore: page < TOTAL_PAGE,
  });
};
export default messages;
