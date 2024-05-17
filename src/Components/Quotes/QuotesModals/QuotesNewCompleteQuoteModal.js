import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ButtonCancel, ButtonSuccess } from '../../Buttons/Buttons';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Ajax, { GetToken } from '../../../Util/ajax';
import { redirect } from '../../../Util/web';

const QuotesNewCompleteQuoteModal = props => {
  const { open, handleClose } = props;
  
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const {setValue, getValues}= useFormContext();

  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiDialog-paper' : {
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          minWidth: 420,
          maxWidth: 540,
        }
      },
      '& .MuiPaper-rounded': {
        borderRadius: 8,
      },
      '& .MuiDialogTitle-root, & .MuiDialogContent-root': {
        padding: 0,
      }
    },
    title: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: theme.spacing(1),
    },
    description: {
      color: '#0000008A',
    },
    agreeTerms: {
      marginTop: theme.spacing(2),
      alignItems: 'flex-start',
      '& .MuiFormControlLabel-label': {
        color: '#0000008A',
        marginTop: theme.spacing(1),
      }
    },
    actions: {
      padding: 0,
      marginTop: theme.spacing(2),
    }
  }));

  const classes = useStyles();
  
  const onCompleteQuotation = async () => {
    const newQuote = getValues('newQuote');
    const customerId= getValues('customerId');
    const intermediaryId= getValues('intermediaryId');
    const coveragesSelected = getValues('coveragesSelected');
    const sumInsuredBasis = getValues('sumInsuredBasis');
    const program = getValues('program');
    const currency = getValues('currency');
    const commissionRate = getValues('commission');
    const serviceFee = getValues('serviceFee');
    
    // Set backdrop loader to ON
    setValue('backdropOpen', true);
    try {
      const token = await GetToken();
      let quoteId = newQuote.id;
      
      if (!quoteId) {
        const result = await Ajax.postData(`${window.appConfig.apiUrl}/internal/quotes`, {}, token);
        result.commission = newQuote.commission ?? 0.125;
        result.name = newQuote.name;
        setValue('newQuote', result);
        quoteId = result.id;
      }
      
      const URL = `${window.appConfig.apiUrl}/internal/quotes/${quoteId}/create`;
      const payload = {
        // '@type': this.state.newQuote['@type'], // Don't use the system provided one.
        '@type': "NewQuote", // hard-coded
        sumInsuredBasis,
        notes: program,
        name: newQuote.name,
        customerId,
        intermediaryId,
        commissionRate,
        serviceFee: {
          amount: serviceFee,
          currency: 'USD',
        },
        inceptionDate: newQuote.inceptionDate,
        expiryDate: newQuote.expiryDate,
        currency,
        quoteItems: [...coveragesSelected.map(coverage => {
          return {
            '@type': "NewQuoteItem",
            coverageId: coverage.id,
            name: coverage.name,
            quantity: coverage.quantity,
            sumInsured: {
              amount: coverage.sumInsuredIndividual,
              currency: currency,
            }
          };
        })],
      };
      await Ajax.postData(URL, payload, token);
      // Re-direct back to quotes listing page.
      redirect('/quotations?command=refresh');
    } catch (_) {
      setValue('ajaxError', true);
    }
    // Remove loader
    setValue('backdropOpen', false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography className={classes.title}>Complete quotation</Typography>
      </DialogTitle>
      <DialogContent>
        <div id="alert-dialog-description">
          <Typography className={classes.description} gutterBottom>
            After the quote is completed a new quote document will be generated that can be send to the customer
          </Typography>
        </div>
        <FormControlLabel
          className={classes.agreeTerms}
          control={
            <Checkbox color="secondary" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
          }
          label="I have read the terms & conditions and I would like to generate a new quote document"
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <ButtonCancel onClick={handleClose}>
          Cancel
        </ButtonCancel>
        <ButtonSuccess
          disabled={!agreeTerms}
          onClick={() => {
            handleClose();
            onCompleteQuotation();
          }}
        >
          Complete quotation
        </ButtonSuccess>
      </DialogActions>
    </Dialog>
  );
};

export default QuotesNewCompleteQuoteModal;
