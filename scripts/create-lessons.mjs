import fs from 'node:fs/promises'

async function createLessons() {
    const verbs = JSON.parse(await fs.readFile('./app/data/verbs.json'))
    const frequency = JSON.parse(await fs.readFile('./app/data/frequency.json'))

    const filtered = verbs.filter((verb) => {
        const isNoun = verb.senses.find(sense => {
            return sense.parts_of_speech.includes('Noun')
        })

        if (isNoun) return false

        return frequency.find(freq => freq.word === verb.slug)
    })

    console.log(filtered.length)

    return verbs.reduce((lessons, verb) => {
        return [
            ...lessons,
            {
                id: verb.id,
                senses: verb.senses.reduce((senses, sense) => [
                    ...senses,
                    {
                        meanings: sense.english_definitions,
                        partsOfSpeech: sense.parts_of_speech,
                        tags: sense.tags,
                    }
                ], []),
                slug: verb.slug,
                partsOfSpeech: verb.parts_of_speech,
                createdAt: verb.created_at,
                updatedAt: verb.updated_at,
                jlpt: verb.jlpt
            }
        ]
    }, [])
}

const result = await createLessons()

fs.writeFile('./app/data/lessons.json', JSON.stringify(result))