const { createClient } = require('@supabase/supabase-js');
const url = 'https://qizpyxtjmxzjryegzgtj.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpenB5eHRqbXh6anJ5ZWd6Z3RqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDkxMTg4NCwiZXhwIjoyMDkwNDg3ODg0fQ.uumhzfXtqOzbOQ5eQ28cjS9-690TMIHqAcevJ9bWcGc';
const supabase = createClient(url, key);

(async () => {
  const { data, error } = await supabase.from('tours').select('*').limit(1);
  console.log('ERROR', JSON.stringify(error, null, 2));
  console.log('DATA', JSON.stringify(data, null, 2));
  if (data && data.length > 0) {
    console.log('ROW_KEYS', Object.keys(data[0]));
  }
})();
