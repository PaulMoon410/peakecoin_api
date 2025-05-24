// JS helper for users.json
async function fetchUsers() {
    const res = await fetch('users.json');
    return await res.json();
}
