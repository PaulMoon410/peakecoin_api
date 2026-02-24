// Embedded users data as a JS object
const users = {
  users: []
};

if (typeof module !== 'undefined') module.exports = users;
if (typeof window !== 'undefined') window.users = users;

// JS helper for users.json
async function fetchUsers() {
    const res = await fetch('users.json');
    return await res.json();
}
