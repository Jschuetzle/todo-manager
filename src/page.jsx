import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomDialog from './dialog';

export default class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      open: false,
      add: true,
      index: -1,
      data: {},
    };
  }

  addTask() {
    this.setState({ add: true });
    this.setState({ open: true });
    this.setState({ index: -1 });
  }

  editTask(index) {
    this.setState({ add: false });
    this.setState({ open: true });
    this.setState({ index: index });
  }

  dialogCallback = (data) => {
    if (data.action === 'cancel') {
      this.setState({ open: false });
    } else if (data.action === 'submit') {
      toast.success('Task Added Successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      this.setState({ entries: [...this.state.entries, data.data] });
      this.setState({ open: false });
    } else if (data.action === 'edit') {
      this.editEntry(data);
      toast.success('Task Edited Successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      this.setState({ open: false });
    }
  };

  toggle = (index) => {
    let updatedEntries = [...this.state.entries];
    updatedEntries[index]['checked'] = !updatedEntries[index]['checked'];
    this.setState({ entries: updatedEntries });
  };

  deleteTask = (index) => {
    this.setState((prevState) => ({
      entries: [
        ...prevState.entries.slice(0, index),
        ...prevState.entries.slice(index + 1),
      ],
    }));
    toast.success('Task Deleted', { position: toast.POSITION.BOTTOM_RIGHT });
  };

  editEntry = (data) => {
    let updatedEntries = [...this.state.entries];
    updatedEntries[data.index] = data.data;

    this.setState({ entries: updatedEntries });
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Dialog open={this.state.open}>
          <CustomDialog
            add={this.state.add}
            open={this.state.open}
            callback={this.dialogCallback}
            entries={this.state.entries}
            index={this.state.index}
          />
        </Dialog>

        <AppBar position="static">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography></Typography>

            <div>
              <MenuIcon sx={{ verticalAlign: 'middle' }} />
              <Typography variant="p">FRAMEWORKS</Typography>
            </div>

            {/* Fix button position */}

            <Button
              variant="contained"
              sx={{ marginLeft: '10px', float: 'right' }}
              onClick={() => this.addTask()}
            >
              <AddCircleIcon />
              <Typography variant="p">ADD</Typography>
            </Button>
          </Toolbar>
        </AppBar>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* can i make this align='center' characteristic a default? */}
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Deadline</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Is Complete</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.entries.map((entry, index) => (
                <TableRow key={entry.title}>
                  <TableCell align="center">{entry.title}</TableCell>
                  <TableCell align="center">{entry.description}</TableCell>
                  <TableCell align="center">
                    {new Date(entry.deadline).toLocaleDateString('en-US')}
                  </TableCell>
                  <TableCell align="center">{entry.priority}</TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={entry.checked}
                      onChange={(e) => {
                        this.toggle(index);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {!entry.checked && (
                      <Button
                        variant="contained"
                        sx={{ width: 100 }}
                        onClick={() => this.editTask(index)}
                      >
                        Update
                      </Button>
                    )}
                    <br />
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ width: 100, verticalAlign: 'center' }}
                      onClick={() => {
                        this.setState((prevState) => ({
                          entries: [
                            ...prevState.entries.slice(0, index),
                            ...prevState.entries.slice(index + 1),
                          ],
                        }));
                        toast.success('Task Deleted', {
                          position: toast.POSITION.BOTTOM_RIGHT,
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </>
    );
  }
}
