import fs from 'node:fs/promises'

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
        .sort()[0]
}

async function cleanupVerbs() {
    return raw.reduce((carry, verb) => {
        // we dont want suru verbs since that's all captured by する
        if (!isStandaloneVerb(verb)) return carry

        // there are some duplicate entries unfortunately in the datset
        if (carry.find(existing => existing.slug === verb.slug)) {
            return carry
        }

        const lowestWanikaniLevel = getLowestWanikaniLevel(verb)

        return carry.concat({
            lowestWanikaniLevel: lowestWanikaniLevel || 60,
            ...verb
        })
    }, [])
        .sort((a, b) => {
            return a.lowestWanikaniLevel >= b.lowestWanikaniLevel
                ? 1
                : -1
        })
}

const result = await cleanupVerbs()

fs.writeFile('./app/data/verbs.json', JSON.stringify(result))