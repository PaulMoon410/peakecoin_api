// JS helper for token_metadata.json
async function fetchTokenMetadata() {
    const res = await fetch('token_metadata.json');
    return await res.json();
}
