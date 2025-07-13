const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Original password:', password);
  console.log('Hashed password:', hashedPassword);
  
  // Test the comparison
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Password match test:', isMatch);
}

hashPassword();
