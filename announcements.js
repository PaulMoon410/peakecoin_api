// JS helper for announcements.json
async function fetchAnnouncements() {
    const res = await fetch('announcements.json');
    return await res.json();
}
