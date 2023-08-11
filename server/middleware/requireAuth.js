import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import OrganizationDetails from '../models/Client.js'

export const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]
  console.log('Token:', token)

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
  //  let  _id = '64cf2f450a0eb1cb019c6e42'
    req.OrganizationDetails = await OrganizationDetails.findOne({ _id }).select('_id')
    console.log('Client:', req.ClientAuth)
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

