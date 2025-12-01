import { type NextRequest, NextResponse } from "next/server"
import { AUTH_CONFIG } from "@/lib/auth-config"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url))
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: AUTH_CONFIG.google.clientId,
        client_secret: AUTH_CONFIG.google.clientSecret,
        redirect_uri: `${request.nextUrl.origin}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    })

    const tokens = await tokenResponse.json()

    if (!tokens.access_token) {
      console.error("Token exchange failed:", tokens)
      return NextResponse.redirect(new URL("/login?error=token_failed", request.url))
    }

    // Get user info
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const userData = await userResponse.json()

    // Create user object and encode it for the client
    const user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      avatar: userData.picture,
      provider: "google",
    }

    // Redirect to dashboard with user data in query (will be stored client-side)
    const redirectUrl = new URL("/dashboard", request.url)
    redirectUrl.searchParams.set("auth", Buffer.from(JSON.stringify(user)).toString("base64"))

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error("Google OAuth error:", error)
    return NextResponse.redirect(new URL("/login?error=server_error", request.url))
  }
}
