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

    // Check if user exists in database (by email)
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // First, check if user already exists by email
    const { data: existingUsers, error: lookupError } = await supabase
      .from("profiles")
      .select("id, email, full_name, avatar_url")
      .eq("email", userData.email)

    console.log("[Google Auth] Email lookup result:", {
      email: userData.email,
      existingUsers,
      lookupError
    })

    let userId: string
    let userName: string
    let userAvatar: string | null

    // Check if we found any existing users
    const existingUser = existingUsers && existingUsers.length > 0 ? existingUsers[0] : null

    if (existingUser) {
      // User exists, use existing data
      console.log("[Google Auth] Found existing user:", existingUser.id)
      userId = existingUser.id
      userName = existingUser.full_name || userData.name
      userAvatar = existingUser.avatar_url || userData.picture
    } else {
      // New user, create UUID and insert with upsert to prevent duplicates
      console.log("[Google Auth] Creating new user for:", userData.email)
      userId = crypto.randomUUID()
      userName = userData.name
      userAvatar = userData.picture

      // Use upsert with email as the conflict resolution key
      const { data: upsertedUser, error: upsertError } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            email: userData.email,
            full_name: userName,
            avatar_url: userAvatar,
          },
          {
            onConflict: 'email',
            ignoreDuplicates: false
          }
        )
        .select('id')
        .single()

      if (upsertError) {
        console.error("[Google Auth] Error upserting user:", upsertError)

        // If upsert failed, try to get the existing user again
        const { data: retryUser } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", userData.email)
          .single()

        if (retryUser) {
          userId = retryUser.id
          console.log("[Google Auth] Found user on retry:", userId)
        }
      } else if (upsertedUser) {
        userId = upsertedUser.id
        console.log("[Google Auth] Upserted user ID:", userId)
      }
    }

    // Create user object and encode it for the client
    const user = {
      id: userId,
      email: userData.email,
      name: userName,
      avatar: userAvatar,
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
