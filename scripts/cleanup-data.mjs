import fs from 'node:fs/promises'

const raw = JSON.parse(await fs.readFile('./app/data/raw.json'))

function isSuruVerb(verb) {
    return verb.senses.find(sense => sense.parts_of_speech.find(partOfSpeech => partOfSpeech === "Suru verb" || partOfSpeech === 'Noun'))
}

async function cleanupVerbs() {
    return raw.reduce((carry, verb) => {
        // we dont want suru verbs since that's all captured by する
        if (isSuruVerb(verb)) return carry

        // there are some duplicate entries unfortunately in the datset
        if (carry.find(existing => existing.slug === verb.slug)) {
            return carry
        }

        return carry.concat(verb)
    }, [])
}

const result = await cleanupVerbs()

console.log(result.length)

fs.writeFile('./app/data/verbs.json', JSON.stringify(result))