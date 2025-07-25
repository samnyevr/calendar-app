// check to see if a Date is a valid date data
function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

// download object to json file locally
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export { isDateValid, download }