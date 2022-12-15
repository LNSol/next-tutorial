const MESSAGES = Array.from({ length: 76 }, (_, idx) => ({
  id: idx + 1,
  content: `Message${idx + 1}`,
}));
const CNT = 20;
const TOTAL_PAGE = Math.ceil(MESSAGES.length / CNT);

const messages = (req, res) => {
  const page = Number(req.query.page) || TOTAL_PAGE;
  console.log('R page > ', page);
  const sIdx = page !== 1 ? MESSAGES.length - (TOTAL_PAGE + 1 - page) * CNT : 0;
  const eIdx = MESSAGES.length - (TOTAL_PAGE - page) * CNT;

  res.status(200).json({
    msgs: MESSAGES.slice(sIdx, eIdx),
    curPage: page,
  });
};
export default messages;
