import { userDetail } from 'constants/userDetail'

export default function handler(req, res) {
  const { uid } = req.query
  res.status(200).json(uid ? userDetail[uid] : {})
}
