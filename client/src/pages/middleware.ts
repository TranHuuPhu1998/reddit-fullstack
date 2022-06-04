import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET;

export default function middleware(req: any) {
  const { cookies } = req;
  const jwt = cookies;
  const url = req.url;

  if (url.include('/create-post')) {
    if (!jwt) {
      return NextResponse.redirect('/login');
    }
    try {
      verify(jwt, secret as string);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect('/login');
    }
  }
  return NextResponse.next();
}
