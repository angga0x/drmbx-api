function getGmtPlus7Time() {
    const now = new Date();
    
    // Get UTC time in milliseconds and add 7 hours for GMT+7
    const gmtPlus7 = now.getTime() + (3600000 * 7);
    
    // Create a new Date object representing the time in GMT+7
    const dateInGmtPlus7 = new Date(gmtPlus7);
    
    // Manually format the date string using UTC methods to avoid local timezone conversion
    const year = dateInGmtPlus7.getUTCFullYear();
    const month = ('0' + (dateInGmtPlus7.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + dateInGmtPlus7.getUTCDate()).slice(-2);
    const hours = ('0' + dateInGmtPlus7.getUTCHours()).slice(-2);
    const minutes = ('0' + dateInGmtPlus7.getUTCMinutes()).slice(-2);
    const seconds = ('0' + dateInGmtPlus7.getUTCSeconds()).slice(-2);
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = { getGmtPlus7Time };
