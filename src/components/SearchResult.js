import React from 'react';

class SearchResult extends React.Component {
    onClick(event) {
        event.preventDefault();
        this.props.onClickResult(this.props.placeId);
    }

    onMouseOver(event) {
        event.preventDefault();
        this.props.onMouseOverResult(this.props.placeId)
    }

    onMouseLeave(event) {
        event.preventDefault();
        this.props.onMouseLeaveResult(this.props.placeId)
    }

    render() {
        return <li
            onClick={event => this.onClick(event)}
            onMouseOver={event => this.onMouseOver(event)}
            onMouseLeave={event => this.onMouseLeave(event)}
        >
                {this.props.displayName}
        </li>;
    }
}

export default SearchResult;
