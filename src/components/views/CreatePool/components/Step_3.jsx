import React, { Component } from 'react';
import { utils } from 'web3';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';

import CSVReader from '../../../CSVReader';
import WhitelistTable from '../../../WhitelistTable';

class StepThree extends Component {
  constructor(props) {
    super(props);
    const {
      formik: {
        values: { hasWhitelist, whitelist },
      },
    } = this.props;

    this.state = {
      whitelist: hasWhitelist && !!whitelist.length ? whitelist : [],
      invalidItemNumbers: [],
    };
  }

  render() {
    const { formik } = this.props; // *** formik props passed in from MultistepForm parent component
    const { values, handleChange, handleBlur, touched, errors, setFieldValue } = formik;
    return (
      <div>
        <div className="row">
          <div className="col-md-4" style={{ paddingTop: '27px' }}>
            <FormLabel>Lock Destination</FormLabel>
            <Switch
              id="lockPayoutAddress"
              name="lockPayoutAddress"
              checked={values.lockPayoutAddress}
              onChange={handleChange}
              value="lockPayoutAddress"
              color="primary"
            />
          </div>
          {!!values.lockPayoutAddress && (
            <div className="col-md-8">
              <TextField
                id="payoutAddress"
                name="payoutAddress"
                label="Destination Address"
                placeholder="0x..."
                value={values.payoutAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.payoutAddress && !!errors.payoutAddress}
                helperText={touched.payoutAddress && errors.payoutAddress}
                autoComplete="Off"
                spellCheck="false"
                type="text"
                margin="normal"
                fullWidth
              />
              <TextField
                id="payoutTxData"
                name="payoutTxData"
                label="Transaction data"
                multiline
                rowsMax="6"
                value={values.payoutTxData}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.payoutTxData && !!errors.payoutTxData}
                helperText={touched.payoutTxData && errors.payoutTxData}
                autoComplete="Off"
                spellCheck="false"
                type="text"
                margin="normal"
                fullWidth
              />
            </div>
          )}
        </div>
        <div className="row" style={{ marginTop: '27px' }}>
          <div className="col-md-4">
            <FormLabel>Whitelist</FormLabel>
            <Switch
              id="hasWhitelist"
              name="hasWhitelist"
              checked={values.hasWhitelist}
              onChange={handleChange}
              value="hasWhitelist"
              color="primary"
            />
          </div>
          {!!values.hasWhitelist && (
            <div className="col-md-8" style={{ paddingTop: '9px' }}>
              <CSVReader
                label="Whitelist CSV (address, name)"
                onFileLoaded={(data, meta) => {
                  const csvIncludesHeader =
                    meta.fields.includes('address') && meta.fields.includes('name');
                  const invalidItemNumbers = [];
                  const validItems = data.filter((item, index) => {
                    const itemNumber = csvIncludesHeader ? index + 2 : index + 1;
                    if (!item.address) {
                      invalidItemNumbers.push(itemNumber);
                      return false;
                    }
                    const isAddress = utils.isAddress(item.address);
                    if (!isAddress) {
                      invalidItemNumbers.push(itemNumber);
                    }
                    return isAddress;
                  });
                  /*
                    ToDo: Supports tables that have 'address' and 'name' as headings,
                    should also support tables without headings.
                  */
                  setFieldValue('whitelist', validItems);

                  this.setState({
                    whitelist: validItems,
                    invalidItemNumbers: invalidItemNumbers,
                  });
                }}
                onError={error => {
                  // oops something went wrong, check your file is properly formatted
                  console.log('error', error);
                }}
                inputId="some-input-id"
              />
              {!!this.state.invalidItemNumbers.length && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                  style={{ marginTop: '1rem' }}
                >
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  {`The following CSV rows contained invalid ethereum addresses: ${this.state.invalidItemNumbers.join(
                    ', ',
                  )}.`}
                </div>
              )}
              {!!this.state.whitelist.length && <WhitelistTable whitelist={this.state.whitelist} />}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default StepThree;
