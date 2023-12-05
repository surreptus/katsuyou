import JishoApi from 'unofficial-jisho-api';

const jisho = new JishoApi();

async function fetchVerbs(phrase, page) {
    const result = await jisho.searchForPhrase('#jlpt-n5 #verb', page)
    const slugs = result.data.map(r => r.slug)

    console.log("size of verbs:", result.data.length)
    console.log("list of verbs:", slugs.join(','))

    return slugs.length === 20
        ? slugs.concat(await fetchVerbs(phrase, page + 1))
        : slugs
}

fetchVerbs('#jlpt-n5 #verb', 1)