require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://api.1inch.dev/traces/v1.0/chain/';

const API_KEY = "t8QR94g31WPWC4tFYjM7xnO0WHewKxSb"

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSyncedInterval(chain) {
  const url = `${BASE_URL}${chain}/synced-interval`;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });
  return response.data;
}

async function getBlockTraceByNumber(chain, blockNumber, txHash) {

  await delay(1000); // This adds a 1-second delay before each request. Adjust as necessary to avoid our rate limits.

  const url = `${BASE_URL}${chain}/block-trace/${blockNumber}`;


  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`

    }
  })
    .then(response => {
      if (response.status === 200) {
        console.log(response);
      } else {
        console.error('API responded with status:', response.status);
      }
    })
    .catch(error => {
      console.error('Error making the getBlockTraceByNumber request:', error.message);
    });
  return response.data;
}

async function getBlockTraceByNumberAndTxHash(chain, blockNumber, txHash) {
  await delay(1000); // This adds a 1-second delay before each request. Adjust as necessary to avoid our rate limits.

  const url = `${BASE_URL}${chain}/block-trace/${blockNumber}/tx-hash/${txHash}`;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`

    }
  })
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      } else {
        console.error('API responded with status:', response.status);
      }
    })
    .catch(error => {
      console.error('Error making the getBlockTraceByNumberAndTxHash request:', error.message);
    });
  return response.data;
}

(async function() {
  try {
    const chain = 1; // Example chain
    const blockNumber = 15000000; // Example block number
    const txHash = '0x16897e492b2e023d8f07be9e925f2c15a91000ef11a01fc71e70f75050f1e03c'; // Example transaction hash

    const syncedInterval = await getSyncedInterval(chain);
    console.log("Synced Interval:", syncedInterval);

    const blockTrace = await getBlockTraceByNumber(chain, blockNumber, txHash);
    console.log("Block Trace:", blockTrace);

    const txTrace = await getBlockTraceByNumberAndTxHash(chain, blockNumber, txHash);
    console.log("Transaction Trace:", txTrace);

  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.data : error.message);
  }
})();
