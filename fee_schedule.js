// Embedded fee schedule data as a JS object
const feeSchedule = {
  fees: {}
};

if (typeof module !== 'undefined') module.exports = feeSchedule;
if (typeof window !== 'undefined') window.feeSchedule = feeSchedule;
