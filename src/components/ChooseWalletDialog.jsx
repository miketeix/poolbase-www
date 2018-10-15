/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import blue from '@material-ui/core/colors/blue';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Consumer as UserConsumer } from '../contextProviders/UserProvider';
import { feathersClient} from '../lib/feathersClient';
import { ethereumAddress } from '../lib/validators';
import PlusIcon from './PlusIcon';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

const newWalletValidationSchema = Yup.object().shape({
  newAddress: ethereumAddress().required('Required'),
  newAddressName: Yup.string()
});

class ChooseWalletDialog extends React.Component {
  
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleSubmitNewWallet = (currentUser, onSignIn) => async (values, bag) => {
    try {
      const user = await feathersClient
      .service('/users')
      .patch(currentUser.id, {
        $push: {
          wallets: {
            address: values.newAddress,
            name: values.newAddressName
          }
        }
      });

      React.toast.success('Your you\'ve successfully added a new wallet.');
      this.props.onClose(values.newAddress);
      onSignIn(currentUser.id);
    } catch(e) {
      console.log('e', e);
      React.toast.error('Oops! Something went wrong while adding wallet.');
    }
  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    return (
      <UserConsumer>
        {({ state: { currentUser }, actions: { onSignIn } }) => (
          <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">Choose a wallet</DialogTitle>
            <div>
              <List>
                {currentUser && !!currentUser.wallets.length &&
                  currentUser.wallets.map(({ address, name }) => (
                    <ListItem button onClick={() => this.handleListItemClick(address)} key={address}>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          <WalletIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={address} secondary={name} />
                    </ListItem>
                  ))}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WalletIcon />
                    </Avatar>
                  </ListItemAvatar>
                    <ListItemText>
                      <Formik
                        initialValues={{
                          newAddress: '',
                          newAddressName: ''
                        }}
                        enableReinitialize={false}
                        validationSchema={newWalletValidationSchema}
                        onSubmit={this.handleSubmitNewWallet(currentUser,onSignIn)}
                        render={formikProps => {

                          const { values, handleSubmit, isSubmitting, handleChange, handleBlur, touched, errors } = formikProps;

                          return (
                            <form id="wallet-form" onSubmit={(e)=>{
                              e.stopPropagation()
                              handleSubmit(e)
                            }}>
                              <div className="row" style={{marginBottom: '7px'}}>
                                <div className={!values.newAddress ? 'd-flex col' : 'col-md-7'}>
                                  <TextField
                                    id="newAddress"
                                    name="newAddress"
                                    value={values.newAddress}
                                    autoComplete="Off"
                                    spellCheck="false"
                                    placeholder="Add Wallet address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.newAddress && !!errors.newAddress}
                                    helperText={touched.newAddress && errors.newAddress}
                                    margin="normal"
                                    fullWidth
                                  />
                                </div>
                                {
                                  values.newAddress && <div className="d-flex col-md-5">
                                  <TextField
                                    id="newAddressName"
                                    name="newAddressName"
                                    value={values.newAddressName}
                                    autoComplete="Off"
                                    spellCheck="false"
                                    placeholder="Wallet name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.newAddressName && !!errors.newAddressName}
                                    helperText={touched.newAddressName && errors.newAddressName}
                                    margin="normal"
                                    autoFocus={true}
                                    fullWidth
                                  />
                                  { !errors.newAddress &&
                                      <Tooltip title="Add" >
                                      <div style={{marginTop: 'auto'}}>
                                      <IconButton
                                        aria-label="Add item"
                                        form="wallet-form"
                                        type="submit"
                                      >
                                        <PlusIcon disabled={!!errors.newAddress} color="#3f51b5" />
                                      </IconButton>
                                      </div>
                                    </Tooltip>
                                  }
                                </div>
                              }
                              </div>
                            </form>
                          )
                        }
                      }
                      />
                    </ListItemText>
                </ListItem>
              </List>
            </div>
          </Dialog>
        )}
      </UserConsumer>
    );
  }
}

ChooseWalletDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(ChooseWalletDialog);
