function writecookie(key, value, days) {
    let expiryDate = new Date();
    days = days || 7;

    expiryDate.setDate(expiryDate.getDate() + days);

    let displayCookie = document.cookie = key + "=" + value + ";" + " expires=" + expiryDate.toGMTString() + ";" + "path=/";
    console.log(displayCookie);
}

export default writecookie;