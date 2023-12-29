import JishoApi from 'unofficial-jisho-api';
import fs from 'node:fs/promises'

const jisho = new JishoApi();

async function fetchVerbs(phrase, page) {
    console.info('---')
    console.info(`fetching page ${page} for ${phrase} ...`)

    const result = await jisho.searchForPhrase(phrase, page)

    if (result.data.length === 20) {
        const next = await fetchVerbs(phrase, page + 1)
        return result.data.concat(next)
    }

    console.info('returning result')
    console.info('---')
    return result.data
}

const result = await fetchVerbs('#verb #common', 1)

fs.writeFile('./app/data/verbs.json', JSON.stringify(result))