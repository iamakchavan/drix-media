const fs = require('fs');
const path = require('path');

const dir = 'd:/Drix/drix-media/pages/admin';
const files = [
  'ProjectEditor.tsx',
  'PostEditor.tsx',
  'Docs.tsx',
  'Dashboard.tsx',
  'ContactForms.tsx',
  'BlogPosts.tsx',
  'AdminProjects.tsx',
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add import if missing
  if (!content.includes("import { supabase } from '../../lib/supabase';")) {
    // find last import and insert after
    const importMatch = content.match(/import .*?;?\n/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      content = content.replace(lastImport, lastImport + "import { supabase } from '../../lib/supabase';\n");
    }
  }

  // Replace auth check
  const oldCheck1 = `if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/admin');`;
  const newCheck = `supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin');
    });`;

  content = content.replace(oldCheck1, newCheck);

  fs.writeFileSync(filePath, content);
  console.log('Updated', file);
});

// Update AdminLayout.tsx logout
const layoutPath = path.join(dir, 'AdminLayout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf-8');
if (!layoutContent.includes("import { supabase } from '../../lib/supabase';")) {
    const importMatch = layoutContent.match(/import .*?;?\n/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      layoutContent = layoutContent.replace(lastImport, lastImport + "import { supabase } from '../../lib/supabase';\n");
    }
}
layoutContent = layoutContent.replace(`const handleLogout = () => { sessionStorage.removeItem('admin_auth'); navigate('/admin'); };`, `const handleLogout = async () => { await supabase.auth.signOut(); navigate('/admin'); };`);
fs.writeFileSync(layoutPath, layoutContent);
console.log('Updated AdminLayout.tsx');

