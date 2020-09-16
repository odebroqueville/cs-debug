"use strict";

/// Initialize extension
// Check if content is set in sync storage and set to default msg "Welcome back!" if not
function init() {
  return new Promise((resolve, reject) => {
    // Check if any search engines are stored in storage sync
    browser.storage.sync
      .get(null)
      .then((data) => {
        if (!isEmpty(data)) {
          console.log("The following content was retrieved from storage sync:");
          console.log(data);
          resolve();
        } else {
          console.log(
            "No content is stored in storage sync -> setting default message: Welcome back!",
          );
          browser.storage.sync.set({ msg: "Welcome back!" });
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("Failed to retrieve data from storage sync.");
        reject();
      });
  });
}

// Test if an object is empty
function isEmpty(value) {
  if (typeof value === "number") return false;
  else if (typeof value === "string") return value.trim().length === 0;
  else if (Array.isArray(value)) return value.length === 0;
  else if (typeof value === "object") {
    return value === null || Object.keys(value).length === 0;
  } else if (typeof value === "boolean") return false;
  else return !value;
}

init();
