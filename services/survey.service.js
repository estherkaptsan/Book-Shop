
export const surveyService = {
    getSurvey
}

function getSurvey() {
    return Promise.resolve(survey)
}

const survey =
{
    title: 'rating',
    color: 'yelow',
    cmps: [
        {
            type: 'textBox',
            info: {
                label: 'Your fullname:'
            }
        },
        {
            type: 'selectBox',
            info: {
                label: 'How was it:',
                opts: ['Great', 'Fine', 'Crap', 'Worst Ever']
            }
        },
        {
            type: 'linearScale',
            info: {
                label: 'Rate:',
                max: 5
            }
        },
    ]
}