// JS helper for announcements.json
async function fetchAnnouncements() {
    const res = await fetch('announcements.json');
    return await res.json();
}

// Embedded announcements data as a JS object
const announcements = {
  announcements: []
};

if (typeof module !== 'undefined') module.exports = announcements;
if (typeof window !== 'undefined') window.announcements = announcements;
