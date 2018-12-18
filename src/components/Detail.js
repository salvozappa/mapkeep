import React from 'react';

class Detail extends React.Component {

    removeDetail(event) {
        event.preventDefault();
        this.props.onClickRemoveDetail();
    }

    render() {
        if (this.props.detail) {
            return (
                <div className="detail overlay">
                    <div className="close-button" onClick={(event) => this.removeDetail(event)}></div>
                    <h1>{this.props.detail.display_name}</h1>
                </div>
            );
        }
        else return '';
    }
}

export default Detail;
