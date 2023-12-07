import JishoApi from 'unofficial-jisho-api';
import fs from 'node:fs/promises'

const jisho = new JishoApi();

async function fetchVerbs(phrase, page) {
    const result = await jisho.searchForPhrase(phrase, page)
    if (result.data.length === 20) {
        const next = await fetchVerbs(phrase, page + 1)
        return result.data.concat(next)
    }

    return result.data
}

const result = await fetchVerbs('#jlpt-n5 #verb', 1)

fs.writeFile('./data/verbs.json', JSON.stringify(result))