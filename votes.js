const xhr = require('axios')
const fs = require('fs');

const CANDIDATE_ADDRESS = 'TVMP5r12ymtNerq5KB4E8zAgLDmg2FqsEG';

// file
const outFile = 'voters.json';

async function loadVotes() {
  let start = 0;
  let results = [];

  while (true) {
    console.log("start: " + start);
    let {data} = await xhr.get("https://api.tronscan.org/api/vote", {
      params: {
        candidate: CANDIDATE_ADDRESS,
        limit: 50,
        sort: 'votes',
        start,
      }
    });

    console.log("votes: " + data.data.length)

    if (data.data.length === 0) {
      break;
    }

    start += 50;

    results = [...results, ...data.data];
  }

  return  results ;
}

loadVotes().then(votes => {

  fs.writeFile(outFile, '{"data":' + JSON.stringify(votes) + "}", 'utf8', () => {
    console.log('done');
  });
})
