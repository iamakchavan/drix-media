import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwgsbcklmqmhtblxkcnt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3Z3NiY2tsbXFtaHRibHhrY250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NjA5NjYsImV4cCI6MjA5MzEzNjk2Nn0.5J1EJ9w-dAgtyVnXfpv35GYm3QniuYhDcF_F5GLQMPQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.auth.signUp({
    email: 'drixbackoffice@gmail.com',
    password: 'DrixMedia'
  });

  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('Successfully signed up user:', data.user?.email);
  }
}

run();
