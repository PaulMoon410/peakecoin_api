// JS helper for user_settings.json
async function fetchUserSettings() {
    const res = await fetch('user_settings.json');
    return await res.json();
}

// Embedded user settings data as a JS object
const userSettings = {
  settings: {}
};

if (typeof module !== 'undefined') module.exports = userSettings;
if (typeof window !== 'undefined') window.userSettings = userSettings;
