// JS helper for fee_schedule.json
async function fetchFeeSchedule() {
    const res = await fetch('fee_schedule.json');
    return await res.json();
}
