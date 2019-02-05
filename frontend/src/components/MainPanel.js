import React from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import Detail from './Detail';

class MainPanel extends React.Component {
    render() {
        return (
            <div className="main-panel">
                <SearchInput
                    searchString={this.props.searchString}
                    onChangeSearchString={this.props.onChangeSearchString}
                    onSubmitSearch={this.props.onSubmitSearch}
                />
                <SearchResults
                    searchResults={this.props.searchResults}
                    onClickResult={this.props.onClickResult}
                    onClickRemoveResults={this.props.onClickRemoveResults}
                    onMouseOverResult={this.props.onMouseOverResult}
                    onMouseLeaveResult={this.props.onMouseLeaveResult}
                />
                <Detail
                    detail={this.props.detail}
                    onClickRemoveDetail={this.props.onClickRemoveDetail}
                />
            </div>
        );
    }
}

export default MainPanel;
