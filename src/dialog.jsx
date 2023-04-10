import React, { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import EditIcon from '@mui/icons-material/Edit';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';
import { ToastContainer, toast } from 'react-toastify';

export default function CustomDialog(props) {
  const [add] = useState(props.add);
  let [entries] = useState(props.entries);
  let [title, setTitle] = useState(
    props.index === -1 ? null : entries[props.index].title
  );
  let [description, setDescription] = useState(
    props.index === -1 ? null : entries[props.index].description
  );
  let [deadline, setDeadline] = useState(
    props.index === -1 ? null : entries[props.index].deadline
  );
  let [priority, setPriority] = useState(
    props.index === -1 ? null : entries[props.index].priority
  );
  let [checked, setChecked] = useState(
    props.index === -1 ? null : entries[props.index].checked
  );

  let cancel = () => {
    props.callback({ action: 'cancel' });
  };

  let verifyTask = () => {
    if (title === '' || title === null) {
      toast.error('Fill Out Title', { position: toast.POSITION.BOTTOM_RIGHT });
    } else if (description === null || description === '') {
      toast.error('Fill Out Description', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (!checkDuplicate(title) && priority !== null && deadline) {
      props.callback({
        action: 'submit',
        data: {
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          checked: checked,
          setChecked: setChecked,
        },
      });
    }
  };

  let updateTask = () => {
    if (description === null || description === '') {
      toast.error('Fill Out Description', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (priority !== '' && deadline) {
      props.callback({
        action: 'edit',
        data: {
          title: title,
          description: description,
          deadline: deadline,
          priority: priority,
          checked: checked,
          setChecked: setChecked,
        },
        index: props.index,
      });
    }
  };

  let checkDuplicate = (text) => {
    for (let i = 0; i < entries.length; i++) {
      if (text === entries[i].title) {
        return true;
      }
    }
    return false;
  };

  let displayTitleHelperText = (title) => {
    if (title === '') {
      return 'Please Enter a Title';
    } else if (checkDuplicate(title)) {
      return 'Title Already Exists';
    }

    return '';
  };

  let displayDescriptionHelperText = (description) => {
    if (description === '') {
      return 'Please Enter a Description';
    }

    return '';
  };

  return (
    <>
      {add ? (
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          <AddCircleIcon />
          Add Task
        </DialogTitle>
      ) : (
        <DialogTitle sx={{ bgcolor: 'primary.dark', color: 'white' }}>
          <EditIcon />
          Edit Task
        </DialogTitle>
      )}

      <DialogContent>
        <br />
        {add ? (
          <>
            <TextField
              id="title"
              label="Title"
              sx={{ width: 300 }}
              error={
                add === true
                  ? title === null || title === '' || checkDuplicate(title)
                  : false
              }
              helperText={displayTitleHelperText(title)}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <br />
            <br />
          </>
        ) : null}

        <TextField
          id="description"
          label="Description"
          sx={{ width: 300 }}
          helperText={displayDescriptionHelperText(description)}
          error={
            add === true ? description === '' || description === null : false
          }
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />

        <br />
        <br />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={deadline}
            sx={{ width: 300 }}
            onChange={(e) => setDeadline(e)}
          />
        </LocalizationProvider>

        <br />
        <br />

        <FormControl>
          <FormLabel>Priority</FormLabel>
          <RadioGroup
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <FormControlLabel value="Low" label="Low" control={<Radio />} />

            <FormControlLabel
              value="Medium"
              label="Medium"
              control={<Radio />}
            />

            <FormControlLabel value="High" label="High" control={<Radio />} />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        {add ? (
          <>
            <Button onClick={verifyTask} variant="contained">
              <AddCircleIcon />
              Add
            </Button>
          </>
        ) : (
          <Button onClick={updateTask} variant="contained">
            <EditIcon />
            Edit
          </Button>
        )}
        <Button onClick={cancel} variant="contained" color="error">
          <DoDisturbOutlinedIcon />
          Cancel
        </Button>
      </DialogActions>
      <ToastContainer />
    </>
  );
}
