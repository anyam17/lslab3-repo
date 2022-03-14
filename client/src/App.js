import * as React from 'react';
import axios from "axios";
import logo from './innopolisuniversity.jpg';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@mui/material/Tooltip";

import './App.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
//    backgroundColor: theme.palette.common.black,
    backgroundColor: '#282c34',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        users: [],
        loading: false,
        editForm: false,
        name: '',
        message: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.userList();
  }
  
  componentDidMount() {
    this.userList();
  }
  
  userList = () => {
    axios.get("/api/users")
      .then(( res ) => (this.setState({ users: res.data })));
  }
  
  addUser = (name) => {
      axios.post("/api/user", {name})
      .then(( res ) => (this.userList(), this.setState({ message: res.data.message })));
      setTimeout(this.setState({ message: '', name: '' }), 3000)
  }

  deleteUser = (e, id, name) => {
      e.preventDefault();
      if (window.confirm(`Are you sure you want to Delete ${name.toUpperCase()}?`)) {
        axios.delete(`/api/user?id=${id}`)
              .then(( res ) => (this.userList(), this.setState({ message: res.data.message })));
      }
  }

  editUser = (e, id, name) => {
    window.scrollTo(0, 0);
    this.setState(name);
  }

  handleChange = (event) => {
        this.setState({name: event.target.value});
  };

    handleClick = () => {
        this.setState({loading: true});
        this.addUser(this.state.name);
    }
    
     render() {
        
          return (
          <React.Fragment>
                <CssBaseline />
                <Container maxWidth="xl">

            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>
                  LS lab 3 - Infrastructure as Code (IaC)
                </h1>
                {/*<a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a> */}
              </header>
              
              <div className="Text">
                  <TextField
                    id="outlined-name"
                    label="Enter Your Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    size="small"
                  />
                <Button
                    color="success"
                    onClick={this.handleClick}
                    loading={this.state.loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    className="Field"
                  >
                    Submit
                </Button>
              </div>

                <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Message</StyledTableCell>
                            <StyledTableCell align="right">Created At&nbsp;(DateTime)</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                            <StyledTableCell align="right">Delete</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.users.length === 0 ?
                          <div styles={{align: 'center'}}><h1>There are no available users!</h1></div>
                          :
                          this.state.users.map((user, i) => (
                            <StyledTableRow key={i}>
                              <StyledTableCell component="th" scope="row">
                                Hello <strong>{ user.name.toUpperCase() }!</strong> Welcome to SNE family!
                              </StyledTableCell>
                              <StyledTableCell align="right"><Chip label={user.updatedAt} size="small" variant="outlined" color="primary"/></StyledTableCell>
                              <StyledTableCell align="right">
                                <Tooltip title="Edit User">
                                 <IconButton
                                   onClick={(e) =>
                                     this.editUser(e, user._id)
                                   }
                                   aria-label="edit user"
                                   style={{
                                     display: "inline-block",
                                     marginLeft: 10,
                                     color: "blue",
                                   }}
                                 >
                                   <EditIcon />
                                 </IconButton>
                               </Tooltip>
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <Tooltip title="Delete User">
                                 <IconButton
                                   onClick={(e) =>
                                     this.deleteUser(e, user._id, user.name)
                                   }
                                   aria-label="remove user"
                                   style={{
                                     display: "inline-block",
                                     marginLeft: 10,
                                     color: "red",
                                   }}
                                 >
                                   <DeleteIcon />
                                 </IconButton>
                               </Tooltip></StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                   <Snackbar open={this.state.message === '' ? false : true} autoHideDuration={4000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                      {this.state.message}
                    </Alert>
                  </Snackbar>
              </div>
            </Container>
            </React.Fragment>
          );
}
}
