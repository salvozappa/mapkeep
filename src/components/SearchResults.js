import React from 'react';
import SearchResult from './SearchResult';

class SearchResults extends React.Component {
    removeResults(event) {
        event.preventDefault();
        this.props.onClickRemoveResults()
    }

    render() {
        if (this.props.searchResults.length > 0) {
            return (
                <div className="search-result overlay">
                    <div className="close-button" onClick={(event) => this.removeResults(event)}></div>
                    <ul>
                        {this.props.searchResults.map(searchResult =>
                            <SearchResult
                                onClickResult={this.props.onClickResult}
                                onMouseOverResult={this.props.onMouseOverResult}
                                onMouseLeaveResult={this.props.onMouseLeaveResult}
                                key={searchResult.place_id}
                                placeId={searchResult.place_id}
                                displayName={searchResult.display_name}
                            ></SearchResult>)}
                    </ul>
                </div>
            );
        }
        return '';
    }
}

export default SearchResults;
