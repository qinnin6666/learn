import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from 'nanoid'

export interface UserJWTPayload {
  jti: string
  iat: number
  iss: string
  isAdmin: string
}

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY
  if (!secret || secret.length === 0) {
    throw new Error('jwt environment not set')
  }
  return secret
}

export async function generateToken(username: string, isAdmin: string) {
  return await new SignJWT({ isAdmin })
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
    return verifyied.payload as unknown as UserJWTPayload
  } catch (error) {
    throw new Error('your token is expired')
  }
}
