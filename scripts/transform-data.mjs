/**
 * this file has two main products, a object map 
 */
import fs from 'node:fs/promises'

const DEFAULT_LEVEL = 60
const raw = JSON.parse(await fs.readFile('./app/data/raw.json'))

function isStandaloneVerb(verb) {
    return verb.senses.find(
        sense => sense.parts_of_speech.find(
            partOfSpeech => partOfSpeech.match(/(Godan verb|Ichidan verb|Suru verb - included)/)
        )
    )
}

// parses the lowest wanikani level out as a number
function getLowestWanikaniLevel(verb) {
    return verb.tags.filter(tag => tag.match(/wanikani/))
        .map(level => parseInt(level.match(/\d+/)[0]))
        .sort()[0] || DEFAULT_LEVEL
}

/**
 * Making an assumption here that there is at least one sense, and that the
 * senses all share the same parts of speech.
 * 
 * @param {*} senses 
 */
function getGroupFromSenses(verb) {
    const partsOfSpeech = verb.senses[0].parts_of_speech.join('')

    if (partsOfSpeech.match('Ichidan verb')) return 'ichidan'
    if (partsOfSpeech.match('Godan verb')) return 'ichidan'

    return 'irregular'
}

async function cleanupVerbs() {
    return raw.reduce((carry, verb) => {
        // we dont want suru verbs since that's all captured by する
        if (!isStandaloneVerb(verb)) return carry

        // there are some duplicate entries unfortunately in the datset
        if (carry[verb.slug]) return carry

        // find the wanikani level to use for sorting the verbs
        const lowestWanikaniLevel = getLowestWanikaniLevel(verb)

        carry[verb.slug] = {
            wanikaniLevel: lowestWanikaniLevel,
            slug: verb.slug,
            group: getGroupFromSenses(verb),
            reading: verb.japanese[0].reading,
            jlpt: verb.jlpt,
            senses: verb.senses.map(sense => ({
                definitions: sense.english_definitions,
                partsOfSpeech: sense.partsOfSpeech,
                tags: sense.tags
            }))
        }

        return carry;
    }, {})
}

const result = await cleanupVerbs()

const lessons = [...Object.values(result)]
    .sort((a, b) => a.wanikaniLevel - b.wanikaniLevel)
    .map(entry => entry.slug)

fs.writeFile('./app/data/verbs.json', JSON.stringify(result))
fs.writeFile('./app/data/lessons.json', JSON.stringify(lessons))