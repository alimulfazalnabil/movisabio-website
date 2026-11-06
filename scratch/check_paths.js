const fs = require('fs');

const files = [
  'osiris_repository_audit.md',
  'movisabio_integration_gap_analysis.md',
  'live_feature_capability_matrix.md',
  'proposed_integration_architecture.md',
  'api_and_environment_dependency_matrix.md',
  'security_and_licensing_review.md',
  'implementation_roadmap.md'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hasFile = content.includes('file:///');
  const hasH = content.includes('H:\\');
  const hasC = content.includes('C:\\');
  console.log(`${f}: file:///=${hasFile}, H:\\=${hasH}, C:\\=${hasC}`);
});
