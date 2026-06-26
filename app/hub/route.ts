import { NextResponse } from 'next/server'
import { PROPOSAL_HTML } from './_proposal'

export async function GET() {
  return new NextResponse(PROPOSAL_HTML, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  })
}
