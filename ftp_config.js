// Embedded FTP config data as a JS object
const ftpConfig = {
  config: {}
};

if (typeof module !== 'undefined') module.exports = ftpConfig;
if (typeof window !== 'undefined') window.ftpConfig = ftpConfig;
