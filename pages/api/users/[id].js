const Users = [
  { id: 1, name: 'Lim' },
  { id: 2, name: 'Jang' },
];
const user = (req, res) => {
  const { id } = req.query;
  const user = Users.find((user) => user.id === Number(id));
  res.status(200).json(user);
};
export default user;
