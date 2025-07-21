"use server"

import { getSupabaseClient } from "@/lib/supabase/server"
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/constants" // Updated import

export async function seedAdminUser() {
  const supabase = await getSupabaseClient()

  // Ensure the service_role key is available for admin operations
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, message: "SUPABASE_SERVICE_ROLE_KEY is not set in environment variables." }
  }

  try {
    // Use the admin client to create a user without email confirmation
    const { data: user, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: false, // Bypass email confirmation
      // You can add more user metadata here if needed
      user_metadata: {
        full_name: "MindEase Admin",
        is_admin: true, // Custom flag for admin role
      },
    })

    if (error) {
      // Handle specific errors, e.g., user already exists
      if (error.message.includes("User already registered")) {
        return { success: true, message: "Admin user already exists in Supabase." }
      }
      console.error("Error creating admin user:", error)
      return { success: false, message: `Failed to create admin user: ${error.message}` }
    }

    // Optionally, set email_confirmed_at to bypass confirmation if not automatically set
    if (user && !user.email_confirmed_at) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        email_confirm: true, // Mark as confirmed
      })
      if (updateError) {
        console.warn("Could not set email_confirmed_at for admin user:", updateError)
      }
    }

    return { success: true, message: "Admin user created/verified in Supabase successfully!" }
  } catch (e: any) {
    console.error("Unexpected error in seedAdminUser:", e)
    return { success: false, message: `An unexpected error occurred: ${e.message}` }
  }
}
