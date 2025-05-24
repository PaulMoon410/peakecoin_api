// JS helper for ftp_config.json
async function fetchFtpConfig() {
    const res = await fetch('ftp_config.json');
    return await res.json();
}
