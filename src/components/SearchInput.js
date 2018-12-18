import React from 'react';

class SearchInput extends React.Component {
    updateValue(event) {
        event.preventDefault();
        this.props.onChangeSearchString(event.target.value);
    }

    submitSearch(event) {
        event.preventDefault();
        this.props.onSubmitSearch(this.props.searchString);
    }

    render() {
        return <form onSubmit={event => this.submitSearch(event)}>
            <input
                type="text"
                name="search"
                className="overlay"
                value={this.props.searchString}
                onChange={event => this.updateValue(event)}
            />
        </form>;
    }
}

export default SearchInput;
