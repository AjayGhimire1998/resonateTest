// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
  /**creating a map object to hold the keys and values */
  const charMap = new Map(); //map object with keys ranging from "1" to "26" and corresponding values from "A" to "Z";
  charMap["0"] = "0"; //mapping "0" for "0"
  const startCharCode = "A".charCodeAt(0); //ASCII code of "A"
  for (let i = 1; i <= 26; i++) {
    charMap[i.toString()] = String.fromCharCode(startCharCode + i - 1); //incremented the ASCII code to get corresponding values and populating the map object
  }
  /** manually mapping values upto "31" to hardcode the value for month */
  charMap["27"] = "a";
  charMap["28"] = "b";
  charMap["29"] = "c";
  charMap["30"] = "d";
  charMap["31"] = "e";
  //   console.log(charMap);
  var charMap2 = charMap;

  /**generating short code for storeId */
  const storeIdString = storeId.toString(); //storeId converted to string
  let codedStoreId1;
  let codedStoreId2;
  if (storeIdString.length > 2) {
    // if storeId has 3 digits
    codedStoreId1 = charMap[storeIdString.slice(0, 2)]; // first two digits
    codedStoreId2 = charMap[storeIdString.charAt(2)]; // last digit
  } else {
    // if storeId has 2 digits
    if (parseInt(storeIdString) > 31) {
      // if storeId value ranges from 32 to 99
      codedStoreId1 = charMap[storeIdString.charAt(0)]; // first digit
      codedStoreId2 = charMap[storeIdString.charAt(1)]; // second digit
    } else {
      // if storeId value ranges from 0 to 31
      codedStoreId1 = charMap["0"]; // always generates 0
      codedStoreId2 = charMap[storeIdString]; // generates corresponding value fro charMap
    }
  }
  const codedStoreId = codedStoreId1 + codedStoreId2; // code for storeId
  //   console.log(codedStoreId);

  /** generating shortcode for date */
  //getting today's date in DDMMYY format:
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2); // only taking the last two digits of the year;
  const month = (today.getMonth() + 1).toString();
  const day = today.getDate().toString();
  const codedDate = charMap[day] + charMap[month] + charMap[year]; // code for date
  //   console.log(codedDate);

  /**generating shortcode for transactionId */
  const transactionIdString = transactionId.toString(); // transactionId converted to string
  let codedTransactionId = ""; // initialising code for transactionId as an empty string
  if (transactionId === 10000) {
    // if transactionId is 10,000
    codedTransactionId = "J000";
  } else {
    for (let j = 0; j < transactionIdString.length; j++) {
      codedTransactionId += charMap[transactionIdString.charAt(j)]; // concatenating transactionId code for each of the character in the id with its corresponsing charMap value
    }
  }
  //   console.log(codedTransactionId);

  /** generating complete shortcode */
  const shortCode = codedStoreId + codedDate + codedTransactionId; // concatenating codes for storeId, current date and transactionId to generate a 9 character long shortcode
  console.log(shortCode);
  return shortCode; //returning the shortcode
}

generateShortCode(172, 2334);

// TODO: Modify this function
function decodeShortCode(shortCode) {
  
  // Logic goes here
  /**creating a map object to hold the keys and values */
  const intMap = new Map(); //map object with keys ranging from "A" to "Z" and corresponding values from "1" to "26";
  intMap["0"] = "0"; //mapping "0" for "0"
  const startCharCode = "A".charCodeAt(0); //ASCII code of "A"
  for (let i = 1; i <= 26; i++) {
    intMap[String.fromCharCode(startCharCode + i - 1)] = i.toString(); //incremented the ASCII code to get corresponding values and populating the map object
  }
  /** manually mapping values upto "31" to hardcode the key for max month */
  intMap["a"] = "27";
  intMap["b"] = "28";
  intMap["c"] = "29";
  intMap["d"] = "30";
  intMap["e"] = "31";
  //   console.log(intMap);

  /** decoding the shortCode into storeId */
  const codedStoreId = shortCode.substring(0, 2);
  let storeId;

  if (codedStoreId.charAt(0) === "0") {
    storeId = parseInt(intMap[codedStoreId.charAt(1)]);
    // console.log(storeId);
  } else {
    storeId = parseInt(
      intMap[codedStoreId.charAt(0)] + intMap[codedStoreId.charAt(1)]
    );
    // console.log("storeId",storeId);
  }

  /** decoding shortCode into date */
  const codedDate = shortCode.substring(2, 5);
  const day = intMap[codedDate.charAt(0)];
  const month = intMap[codedDate.charAt(1)];
  const year = "20" + intMap[codedDate.charAt(2)];
  const shopDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  /** decoding shortCode into transactionId */
  const codedTransactionId = shortCode.substring(5, 10);
  //   console.log(codedTransactionId);
  let transactionId = "";
  if (codedTransactionId === "J000") {
    transactionId = 10000;
  } else {
    for (let j = 0; j < codedTransactionId.length; j++) {
      transactionId += intMap[codedTransactionId.charAt(j)];
    }
  }
  //   console.log(transactionId);
  return {
    storeId: storeId, // store id goes here,
    shopDate: shopDate, // the date the customer shopped,
    transactionId: parseInt(transactionId), // transaction id goes here
  };
}

decodeShortCode("QBWFWBCCD");

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function (storeId) {
    transactionIds.forEach(function (transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $("#test-results").append(
        "<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>"
      );
      AddTestResult("Length <= 9", shortCode.length <= 9);
      AddTestResult("Is String", typeof shortCode === "string");
      AddTestResult("Is Today", IsToday(decodeResult.shopDate));
      AddTestResult("StoreId", storeId === decodeResult.storeId);
      AddTestResult("TransId", transactionId === decodeResult.transactionId);
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $("#test-results").append(
    "<div class='" +
      (testResult ? "pass" : "fail") +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      "</span></div>"
  );
}

console.log(charMap2);
