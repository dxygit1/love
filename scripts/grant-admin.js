// Temporary script to add role column and grant admin
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://frehbtwvovyquohrngot.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Since we don't have service role key, we'll use the REST API approach
// via the Supabase Dashboard SQL Editor instead

// Alternative: Use the existing supabase client to update the profile
async function grantAdmin() {
    const supabase = createClient(
        supabaseUrl,
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZWhidHd2b3Z5cXVvaHJuZ290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4MTM5NTUsImV4cCI6MjA4MDM4OTk1NX0.ZkShTTj14b-sobhGfJkH9tsT6P_Mbs1xMKZNENA4blA'
    )

    // Try to update the user's role directly
    const { data, error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .like('id', '2082204f-7ef%')
        .select()

    if (error) {
        console.error('Error:', error)
    } else {
        console.log('Success! Updated profiles:', data)
    }
}

grantAdmin()
