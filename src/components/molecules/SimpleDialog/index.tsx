import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface SimpleDialogProps {
  dialogTitle: string
	open: boolean;
	selectedValue: { id: number, value: string };
	targetList: { id: number, value: string }[];
	onClose: (id: number, value: string) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, targetList, open } = props;

  const handleClose = () => {
    onClose(selectedValue.id, selectedValue.value);
  };

  const handleListItemClick = (id: number, value: string) => {
    onClose(id, value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
			<DialogTitle>{props.dialogTitle}</DialogTitle>
      <List>
        {targetList.map((item) => (
          <ListItem button onClick={() => handleListItemClick(item.id, item.value)} key={item.value}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.value} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
