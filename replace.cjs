const fs = require('fs');
const path = require('path');

const replacements = {
  'avatar_image_path': 'avatarImagePath',
  'logo_name': 'logoName',
  'full_name': 'fullName',
  'header_image_path': 'headerImagePath',
  'company_url': 'companyUrl',
  'logo_path': 'logoPath',
  'alt_name': 'altName',
  'website_link': 'websiteLink',
  'certificate_link': 'certificateLink',
  'color_code': 'colorCode',
  'profile_image_path': 'profileImagePath'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const [key, value] of Object.entries(replacements)) {
        if (content.includes(key)) {
          content = content.split(key).join(value);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory('./src');
