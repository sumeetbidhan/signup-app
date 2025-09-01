export type ValidationErrors = Partial<Record<string, string>>;

// a. Name: alphabets and spaces only
export const isValidName = (name: string): boolean => /^[A-Za-z ]+$/.test(name.trim());

// b. Username: alphanumeric with special chars allowed (._-@#)$ etc but no spaces
// Allow common safe specials: . _ - @ # $ ! % *
export const isValidUsername = (username: string): boolean => /^[A-Za-z0-9._@#$!%*-]+$/.test(username);

// c. Password: same character set as username; and not equal to username
export const isValidPassword = (password: string): boolean => /^[A-Za-z0-9._@#$!%*-]+$/.test(password);

// d. Confirm password: equal to password
export const isMatching = (a: string, b: string): boolean => a === b;

// e. Email: Gmail format only (same as Google email); enforcing @gmail.com
export const isValidGmail = (email: string): boolean => /^[A-Za-z0-9._%+-]+@gmail\.com$/i.test(email);

// f. Phone: Country code and phone only. Accept formats like +91 9876543210, +1-555-123-4567, +441234567890
export const isValidPhone = (phone: string): boolean => /^\+\d{1,3}[- ]?\d{6,14}$/.test(phone.replace(/\s+/g, ' '));

export const required = (value: string): boolean => value.trim().length > 0;


