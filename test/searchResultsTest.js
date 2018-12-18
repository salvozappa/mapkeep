const assert = require('assert');
const { getSearchResult } = require('../src/lib/searchResults');

describe('searchResults', () => {
    describe('#getSearchResult()', () => {
        it('Should return a search result if present', () => {
            const searchResults = [
                {
                    place_id: 'A',
                    foo: 'bar'
                },
                {
                    place_id: 'B',
                    abc: 'xyz'
                }
            ];
            const result = getSearchResult(searchResults, 'A');
            assert.ok(typeof result === 'object');
        });

        it('Should return null if a search result if not present', () => {
            const searchResults = [
                {
                    place_id: 'A',
                    foo: 'bar'
                },
                {
                    place_id: 'B',
                    abc: 'xyz'
                }
            ];
            const result = getSearchResult(searchResults, 'C');
            assert.ok(result === null);
        })

        it('Should return the exact search result if present', () => {
            const searchResults = [
                {
                    place_id: 'A',
                    foo: 'bar'
                },
                {
                    place_id: 'B',
                    abc: 'xyz'
                }
            ];
            const expectedResult = {
                place_id: 'A',
                foo: 'bar'
            };
            const result = getSearchResult(searchResults, 'A');
            assert.deepEqual(result, expectedResult);
        });
    })
});
