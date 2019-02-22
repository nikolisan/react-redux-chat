import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../isEmpty';
import classnames from 'classnames';

class FlashMessage extends Component {
    render() {
        const { flash } = this.props
        return (
            <div>
                { !isEmpty(flash)
                    ? 
                    <div className={classnames("alert alert-dismissible fade show ", {"alert-success": flash.success}, {"alert-danger": !flash.success})} role="alert">
                        { flash.message }
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    : <p>empty</p>
                }
            </div>        
        )
    }
}

FlashMessage.propTypes = {
    flash: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    flash: state.flash
})

export default connect(mapStateToProps, {} )(FlashMessage)