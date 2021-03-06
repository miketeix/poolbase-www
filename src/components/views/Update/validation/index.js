import * as Yup from 'yup';
import { ethereumAddress } from '../../../../lib/validators';

const maxAllocation = ({ maxContribution }) =>
  Yup.object().shape({
    maxAllocation: Yup.number()
      .min(maxContribution, `Must be more than the max contribution of ${maxContribution} Ether`)
      .required('Required'),
  });

const fee = () =>
  Yup.object().shape({
    fee: Yup.number()
      .min(0, `Must be more than zero`)
      .max(100, `Must be less than 100`)
      .required('Required'),
  });

const adminPayoutAddress = () =>
  Yup.object().shape({
    adminPayoutAddress: ethereumAddress().required('Required'),
  });

export default {
  maxAllocation,
  fee,
  adminPayoutAddress,
};
