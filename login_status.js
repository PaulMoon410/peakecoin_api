// JS helper for login_status.json
async function fetchLoginStatus() {
    const res = await fetch('login_status.json');
    return await res.json();
}
