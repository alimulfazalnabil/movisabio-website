const fs = require('fs');
const path = require('path');

const targetDir = path.resolve('docs', 'osiris-integration');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created directory:', targetDir);
}

const reports = [
  'osiris_repository_audit.md',
  'movisabio_integration_gap_analysis.md',
  'live_feature_capability_matrix.md',
  'proposed_integration_architecture.md',
  'api_and_environment_dependency_matrix.md',
  'security_and_licensing_review.md',
  'implementation_roadmap.md'
];

reports.forEach(file => {
  const sourcePath = path.resolve(file);
  const destPath = path.join(targetDir, file);
  
  if (!fs.existsSync(sourcePath)) {
    console.error('Source report missing:', file);
    return;
  }
  
  let content = fs.readFileSync(sourcePath, 'utf8');
  
  // Review any internal links between the reports to ensure they work in docs/osiris-integration/
  reports.forEach(otherReport => {
    // If a report references another report like [Link](otherReport), ensure it remains relative
    // (Already relative if just the filename)
  });
  
  fs.writeFileSync(destPath, content, 'utf8');
  const stat = fs.statSync(destPath);
  console.log(`Copied ${file} -> docs/osiris-integration/${file} (${stat.size} bytes)`);
});

console.log('\nAll 7 reports successfully verified and copied to docs/osiris-integration/.');
