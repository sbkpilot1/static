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
	
	const options = {
    method: 'GET',
    headers: {
			'hostname': 'www.marketwatch.com',
			'port': '80',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
			'Accept': 'application/json',
			'Referer': url,
			'Accept-Encoding': 'gzip, deflate, br, zstd',
			'Accept-Language' : 'en-US,en;q=0.9,es;q=0.8,it;q=0.7,pt;q=0.6',
			'Priority': 'u=0, i',
			'Cookie': 'letsGetMikey=enabled; refresh=off; mw_loc=%7B%22Region%22%3A%22TX%22%2C%22Country%22%3A%22US%22%2C%22Continent%22%3A%22NA%22%2C%22ApplicablePrivacy%22%3A0%7D; gdprApplies=false; ab_uuid=227f5eb6-d5c2-4394-8afa-49832fede409; fullcss-quote=quote-1e61c76db6.min.css; icons-loaded=true; connect.sid=s%3AXzz1IZxbrbRpiMOqYTVozlqyCSW5vhw0.bpkcveg3JKXLGArqOAaXbDXCQ%2FUfDxrbq4jK17%2FVX1s; recentqsmkii=ExchangeTradedFund-US-VOO; _lr_geo_location_state=TX; _lr_geo_location=US; _pubcid=b53c3c98-f5bd-4873-84db-b5fac4f27a80; _pubcid_cst=%2ByxmLFMstg%3D%3D; _lr_retry_request=true; _lr_env_src_ats=false; _sp_su=false; pbjs-unifiedid=%7B%22TDID%22%3A%22f6b9e689-1870-4e30-8d40-8fcd27ff8878%22%2C%22TDID_LOOKUP%22%3A%22FALSE%22%2C%22TDID_CREATED_AT%22%3A%222025-11-11T08%3A28%3A18%22%7D; pbjs-unifiedid_cst=%2ByxmLFMstg%3D%3D; _ncg_domain_id_=db13e464-5dfe-499a-9524-2c73a801036d.1.1762849697.1794385697; permutive-id=d72a18c1-1f2c-4bb9-b4f9-9690f5b378fc; _ga=GA1.1.1832789703.1762849700; _gcl_au=1.1.885096967.1762849700; _parsely_session={%22sid%22:1%2C%22surl%22:%22https://www.marketwatch.com/investing/fund/voo%22%2C%22sref%22:%22https://www.marketwatch.com/investing/fund/voo%22%2C%22sts%22:1762849700087%2C%22slts%22:0}; _parsely_visitor={%22id%22:%22pid=d62b3aa9-55c4-4a93-860c-d69ff272b765%22%2C%22session_count%22:1%2C%22last_session_ts%22:1762849700087}; ajs_anonymous_id=9221cfa9-189a-4cd9-b072-c8260e50aef4; _fbp=fb.1.1762849700384.846227779; _meta_facebookTag_sync=1762849700384; _meta_googleAdsSegments_library_loaded=1762849700394; _ncg_g_id_=5a0c6e3b-4f74-460b-809a-23e7ab5a27a8.1.1762849700.1794385697; _scor_uid=160ed7b95e804a00bb1e8e1ce32a3a0d; _meta_cross_domain_id=545cfd0a-1a40-45bb-b370-d81c10f9331d; _meta_cross_domain_recheck=1762849701409; AMCVS_CB68E4BA55144CAA0A4C98A5%40AdobeOrg=1; s_cc=true; ab.storage.deviceId.7207231d-a9d5-4609-b67c-b1b68be1bbf7=g%3Af9d1684f-313f-19bd-a46e-38d9cf5192b4%7Ce%3Aundefined%7Cc%3A1754067674469%7Cl%3A1762849702541; _lr_sampling_rate=0; _pctx=%7Bu%7DN4IgrgzgpgThIC4B2YA2qA05owMoBcBDfSREQpAeyRCwgEt8oBJAEzIE4AmHgZi4CsvAIwB2DqIAMADkHTRvEAF8gA; _pcid=%7B%22browserId%22%3A%22mhub75nee5z5pnh9%22%7D; _dj_ses.cff7=*; _li_dcdm_c=.marketwatch.com; _lc2_fpi=9c8581eb24a2--01k3ajzc07w4ywnhz6xre2yw1a; _lc2_fpi_js=9c8581eb24a2--01k3ajzc07w4ywnhz6xre2yw1a; __pat=-18000000; xbc=%7Bkpcd%7DChBtaHViNzVuZWU1ejVwbmg5Ego2eWtRMjdJRXB1GjxkbXRPM0xHM2dOb1JkYjVJbGJCWFFhMktRZUJFNzVxeUpES29xZ2tPa2VLNnBWTzZNRlM2YlJYbDZPZGMgAA; _pcus=eyJ1c2VyU2VnbWVudHMiOnsiQ09NUE9TRVIxWCI6eyJzZWdtZW50cyI6WyJMVHM6ODhjNWM5YTg1YjJmNWU4MGViYTZiOWViOWVjYjVmOTM3NDljNzM2OTpub19zY29yZSIsIkxUcmV0dXJuOmY3N2FkMmI5NDZmZTBlOWI1NDRlOWZlMzZiYTk1NGViNmI0ZGNlYWE6bm9fc2NvcmUiLCJDU2NvcmU6YzdiZDdjNTlhZTQ5ZmEwODI0NTc1MjAwOGMzODlhMmIyZDY0MGYyNTpub19zY29yZSJdfX19; cX_P=mhub75nee5z5pnh9; _dj_sp_id=aae166ec-4f2e-4124-8554-2565463e8765; 33acrossIdTp=0dQL5k%2B9qx%2Bj3hGHoliUrod85k9JSrS8SFxMPt1BgdQ%3D; _li_ss=CgA; LANG=en_US; LANG_CHANGED=en_US; _au_1d=AU1D-0100-001755926376-PMI1GTC3-SQ94; AMCV_CB68E4BA55144CAA0A4C98A5%40AdobeOrg=1585540135%7CMCIDTS%7C20404%7CMCMID%7C53593767723949948452715316844302109255%7CMCAID%7CNONE%7CMCOPTOUT-1762856901s%7CNONE%7CMCAAMLH-1763454501%7C9%7CMCAAMB-1763454501%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCSYNCSOP%7C411-20411%7CvVersion%7C4.4.0; cX_G=cx%3A1i5v8hgg8t77k12xm0ejz6a3yb%3A3bbj5oc7k2k4f; usr_prof_v2=eyJpYyI6M30%3D; __gpi=UID=000012c7bde93154:T=1762850108:RT=1762850108:S=ALNI_MZMB-hwoYRTmwWcxnCrvbNJ_AwYNA; __eoi=ID=43993dacdf1b28f6:T=1762850108:RT=1762850108:S=AA-AfjYuWPIp8lYvXLXbm4BANryN; _pn=eyJzdWIiOnsiaWQiOiJSdHhUNXRkamJVTDdJYXFnY24wNm9YRVpER3R4R1hLUSIsInNzIjotMSwidWRyIjowfSwibHVhIjoxNzYyODUwMTIzMzUyfQ; utag_main=v_id:019a7207aedb0005642037f63dbf0506f002e067009d8$_sn:1$_ss:0$_st:1762852348469$ses_id:1762849697500%3Bexp-session$_pn:5%3Bexp-session$_prevpage:MW_Quote_Page%3Bexp-1762854148473$vapi_domain:marketwatch.com; _dj_id.cff7=.1762849705.1.1762850549..2fb837cd-168e-48f5-b0d9-eea826a154d0..946aa3e0-0c44-4008-a967-e733ea654b8a.1762849705167.5; _awl=2.1762850549.5-9f634db11b28459a62988525ff72101b-6763652d75732d63656e7472616c31-0; _rdt_uuid=1762849699980.277ad6d0-1eac-4e02-9e48-40ab3b6ab87e; ab.storage.sessionId.7207231d-a9d5-4609-b67c-b1b68be1bbf7=g%3A7494b425-100e-3aac-6e14-48158fca8be3%7Ce%3A1762852350641%7Cc%3A1762849702540%7Cl%3A1762850550641; __pvi=eyJpZCI6InYtbWh1Yjc1bm00Nm94Y2podiIsImRvbWFpbiI6Ii5tYXJrZXR3YXRjaC5jb20iLCJ0aW1lIjoxNzYyODUwNTUwNzQ0fQ%3D%3D; __tbc=%7Bkpcd%7DChBtaHViNzVuZWU1ejVwbmg5Ego2eWtRMjdJRXB1GjxkbXRPM0xHM2dOb1JkYjVJbGJCWFFhMktRZUJFNzVxeUpES29xZ2tPa2VLNnBWTzZNRlM2YlJYbDZPZGMgAA; __gads=ID=7a33ab995379cebc:T=1762849715:RT=1762850555:S=ALNI_MZCqIujqsoa7cgAQ8pQ7HgisRV1HQ; cto_bundle=0U-5sV9NU3pXQkRjRnFQWSUyRm9vWEN2R3FxaXlkcGxkTm41QiUyQnZkZjFjTWVROFQlMkZiek4lMkJQOWx6RjNJJTJGYUdxUHA1YkwlMkY5VkFRJTJCNnVLanhDcDYlMkIzaUVxejlWMjdyY2FVSGc3ZDk3bXc4ODRxWTJHb2VHN3VQJTJCNDRoSXR1dlRnWFV1aVM3eA; cto_bidid=JMLhhl81NjI3V1drQkowUTRWUGUyUzFXRnZidFNxZzZHU1hQTTRLNjA3NE1OY1NDb3Y5ajA5JTJCTnE3QzRiNTlzVFQwSXpSSEQ3emZkRGp6ektOT2Y3Z01jNUhBJTNEJTNE; s_tp=4766; s_ppv=MW_Quote_Page%2C9%2C9%2C435; datadome=SxemZHjlkqyM~QCYSVtZX75JO58~QYTsYiHu699GhQ8xnQJAArgqtIpUnFPwWiBoxexh~YpG2hcf2JRhLVjq2EABqQfuVIFn6rsABmwwBg2mGBwX1HKC3nHHtAi0y~ZZ; _ga_K2H7B9JRSS=GS2.1.s1762849699$o1$g1$t1762850569$j39$l0$h749164227; _ga_FVWZ0RM4DH=GS2.1.s1762850018$o1$g0$t1762850569$j60$l0$h0'
		}
	};
	
    var response = await fetch(url, options);
	
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

