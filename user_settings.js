// JS helper for user_settings.json
async function fetchUserSettings() {
    const res = await fetch('user_settings.json');
    return await res.json();
}
