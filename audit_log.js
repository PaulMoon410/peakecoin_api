// JS helper for audit_log.json
async function fetchAuditLog() {
    const res = await fetch('audit_log.json');
    return await res.json();
}
