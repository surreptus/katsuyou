import fs from 'node:fs/promises'

async function createLessons() {
    const verbs = JSON.parse(await fs.readFile('./app/data/verbs.json'))

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

console.log(result)

fs.writeFile('./app/data/lessons.json', JSON.stringify(result))