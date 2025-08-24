var prefix = "https://www.marketwatch.com/investing/fund/";
var etfPostfix = "";
var fundPostfix = "";

function getETF(symbol, extraParam) {
  var url = prefix + symbol + etfPostfix;
  var resp = UrlFetchApp.fetch(url).getContentText();

  return extractValue(resp);
}

async function getFund(symbol, extraParam) {
  if (symbol === 'CASH') {
    return 1;
  }
    
  try {
    var url = prefix + symbol + fundPostfix;
    var response = await fetch(url);
	
	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	const result = await response.text();
			
	if (result) {
		var fundValue = extractValue(result);
		return fundValue;
	} else {
		throw new Error('Request returned empty response!');
	}
  } catch(err) {
    console.log(`Fetch for fund at ${url} failed!`, err);
    throw err;
  }
}


function extractValue(inputMarkup) {
  const marker = "<meta name=\"price\" content=\"$";
  inputMarkup = inputMarkup.substring(inputMarkup.indexOf(marker));
  inputMarkup = inputMarkup.replace(marker, '');
  inputMarkup = inputMarkup.substring(0, inputMarkup.indexOf('"'));
  
  return +inputMarkup;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getFundMapStatic(symbol, extraParam) {
  const fundData = [["VOO",593.21],["VFWAX",43.65],["VBILX",10.49],["VBTLX",9.7],["VTMSX",96.72],["VTSAX",154.86],["VTI",318.18],["VFIAX",597.75],["VEU",70.39],["FXAIX",224.95],["VIIIX",526.51],["USDINR",0],["TMUS",251.95],["SPX",0],["SP600",0], ["CASH", 1]];

  const fundValMap = new Map();

  for (f of fundData) {
	fundValMap.set(f[0], f[1]);
  }

  return fundValMap;
}

async function getFundMap() {
  const tickers = ['VOO', 'VFWAX', 'VBILX', 'VBTLX', 'VTMSX', 'VTSAX', 'VTI', 'VFIAX', 'VEU', 
    'FXAIX', 'VIIIX', 'USDINR', 'TMUS', 'SPX', 'SP600', 'CASH'];

  const fundValMap = new Map();

  // Fetch fund values
  for(ticker of tickers) {
    const fundVal = await getFund(ticker);
	fundValMap.set(ticker, +fundVal || 0);  
  }
  
  return fundValMap;
}

async function getFundJSON() {
  const fundValMap = await getFundMap();
  const fundArray = Array.from(fundValMap.entries());
  const response = {
	data: fundArray
  }	  
  
  return response;
}

getFundJSON()
 .then(r => {
	console.log(JSON.stringify(r));
 });

