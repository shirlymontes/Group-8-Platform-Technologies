const bcrypt = require('bcryptjs');

async function testPassword() {
    const plainPassword = 'password';
    const storedHash = '$2b$10$0ChLJ3F/ZeUQQg5kUoWgLef3oErJysAsNYg0Qs3CXQc4cIbF7wGIy';
    
    console.log('Testing password:', plainPassword);
    console.log('Against hash:', storedHash);
    
    const isValid = await bcrypt.compare(plainPassword, storedHash);
    console.log('Password valid:', isValid);
    
    // Test with wrong password
    const isInvalid = await bcrypt.compare('wrongpassword', storedHash);
    console.log('Wrong password valid:', isInvalid);
}

testPassword();
