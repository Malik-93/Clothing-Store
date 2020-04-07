import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Progress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
class DefaultAppLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loaded: false,
      label: 'Cancel',
    };
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  componentWillReceiveProps(nextProps) {
    const loading = nextProps.loading;
    if (loading.loader === true) {
      this.setState(() => ({ open: true }));
    } else {
      this.setState({ loaded: true, label: 'Okay', open: false });
    }
  }
  render() {
    const { loaded, label } = this.state;
    const actions = [
      <RaisedButton label={label} onClick={this.handleClose} primary={true} />,
    ];
    return (
      <Dialog
        title="Loading..."
        modal={true}
        open={this.state.open}
        actions={actions}
      >
        {loaded ? <p>Succes</p> : <Progress />}
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(DefaultAppLoader);
