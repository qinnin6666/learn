import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

interface UserJWTPayload {
  jti: string
  iat: number
  iss: string
}

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY
  if (!secret || secret.length === 0) {
    throw new Error('jwt environment not set')
  }
  return secret
}

export async function generateToken(username: string) {
  return await new SignJWT({ 'urn:example:claim': true })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setIssuer(username)
    .setExpirationTime('10m')
    .sign(new TextEncoder().encode(getJwtSecretKey()))
}

export async function verifyToken(token: string) {
  try {
    const verifyied = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
    return verifyied.payload as UserJWTPayload
  } catch (error) {
    throw new Error('your token is expired')
  }
}
