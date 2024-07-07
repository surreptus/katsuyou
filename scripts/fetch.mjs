import JishoApi from 'unofficial-jisho-api';
import fs from 'node:fs/promises'

/**
 * this file handles getting the latest verbs from jisho with the provided
 * tags to filter down on
 */

const jisho = new JishoApi();
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

/**
 * 
 * @param {*} phrase 
 * @param {*} page 
 * @returns 
 */

async function fetchVerbs(phrase, page) {
    console.info('---')
    console.info(`fetching page ${page} for ${phrase} ...`)

    const result = await jisho.searchForPhrase(phrase, page)

    if (result.data.length === 20) {
        for (var i = 0; i < MAX_RETRIES; i++) {
            try {
                const next = await fetchVerbs(phrase, page + 1)
                return result.data.concat(next)
            } catch (e) {
                console.error(e)
                await new Promise(r => setTimeout(r, RETRY_DELAY));
            }
        }
    }

    console.info('returning result')
    console.info('---')
    return result.data
}

const result = await fetchVerbs('#verb #common #words', 1)

fs.writeFile('./src/data/raw.json', JSON.stringify(result))