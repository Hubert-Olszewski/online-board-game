import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const BasicStyleButton = styled(Button)({
  height: '40px',
  width: '120px',
  gap: '4px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '0px 12px',
  border: '2px solid',
  lineHeight: 1.5,
  backgroundColor: '#2155CD',
  borderColor: '#E0EAFF',
  textDecorationColor: '#074EE8',
  '&:hover': {
    backgroundColor: '#3B9AE1',
    color: '#000000',
  },
  '&:active': {},
  '&.MuiButton-text': {
    color: '#ffffff',
    borderRadius: '8px',
  },
  '&.Mui-disabled': {
    background: '#808080'
  }
  
});