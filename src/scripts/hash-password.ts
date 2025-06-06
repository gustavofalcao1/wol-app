import { createHash } from 'crypto';

const password = 'admin';
const hash = createHash('sha256').update(password).digest('hex');
console.log(`Password: ${password}`);
console.log(`Hash: ${hash}`);
