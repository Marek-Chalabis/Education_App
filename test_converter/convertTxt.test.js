const convert = require('../convertTxt.js');
const path = require('path');

//TODO correct path after init Vue
test('Test converter', () => {
    let pathToFiles = path.join(process.cwd(), "test_converter")

    convert(pathToFiles).then(function (result) {
        expect(result).toStrictEqual({
            A_test: [{
                    question: 'A1-Qestion',
                    answer: 'A1-ODP'
                },
                {
                    question: 'A2-Qestion',
                    answer: 'A2-ODP'
                },
                {
                    question: 'A3-Qestion',
                    answer: 'A3-ODP'
                }
            ],
            B_test: [{
                    question: 'B1-Qestion',
                    answer: 'B1-ODP'
                },
                {
                    question: 'B2-Qestion',
                    answer: 'B2-ODP'
                },
                {
                    question: 'B3-Qestion',
                    answer: 'B3-ODP\n- tekst for new line\n- tekst for new line\n- tekst for new line'
                }
            ]
        })
    })


})