import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Footer from './Footer';

const NewLanding = ({ date }) => {
    const [taskName, setTaskName] = useState('');
    const [taskData, setTaskData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('Pending');

    const userEmail = localStorage.getItem('email'); // Retrieve user's email from localStorage

    useEffect(() => {
        if (userEmail) {
            fetchData("Pending");
        }
    }, [date, userEmail]);

    const fetchData = async (status) => {
        const url = `https://todo-list-4e637-default-rtdb.firebaseio.com/Todo%20List.json?auth=5nTrneFzZVYaWxxZ1z2fawamurT2`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            let update = [];
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (data[key].status === status && data[key].userEmail === userEmail) {
                        update.push([data[key], key]);
                    }
                }
            }

            setTaskData(update);
            setCurrentStatus(status);
        } catch (error) {
            console.error('Error reading data:', error);
        }
    };

    const handleAddTask = async () => {
        const url = `https://todo-list-4e637-default-rtdb.firebaseio.com/Todo%20List.json?auth=5nTrneFzZVYaWxxZ1z2fawamurT2`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: taskName,
                    date: date,
                    status: "Pending",
                    userEmail: userEmail // Include user's email in the task data
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setOpen(false);
            fetchData("Pending");
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const deleteData = async (id) => {
        const url = `https://todo-list-4e637-default-rtdb.firebaseio.com/Todo%20List/${id}.json?auth=5nTrneFzZVYaWxxZ1z2fawamurT2`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskName: taskName,
                    date: date,
                    status: "Finished"
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchData("Pending");
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getButtonColor = (status) => {
        return currentStatus === status ? 'text-apporange' : 'text-black';
    };

    return (
        <>
            <div>
                {taskData.map((task, index) => (
                    <Card key={index} sx={{ minWidth: 275 }} style={{ marginBottom: '2rem' }}>
                        <Box className="cardHeader">{`Date : ${task[0].date}`}</Box>
                        <CardContent>
                            {task[0]["taskName"]}
                        </CardContent>
                        {task[0].status === "Pending" && (
                            <CardActions className="cardBody" onClick={() => deleteData(task[1])}>
                                <Button className="buttonCss" size="small">Finish</Button>
                            </CardActions>
                        )}
                    </Card>
                ))}

                <Container>
                    <div>
                        <AddIcon className='iconCss' onClick={() => setOpen(true)} />
                    </div>
                </Container>

                <Grid container item className='Footer'>
                    <Grid item lg={12} xs={12} style={{ display: 'flex' }}>
                        <Grid item lg={6} xs={6} className={`foot ${getButtonColor("Pending")}`} onClick={() => fetchData("Pending")}>
                            TODOS
                        </Grid>
                        <Grid item lg={6} xs={6} className={`foot ${getButtonColor("Finished")}`} onClick={() => fetchData("Finished")}>
                            FINISHED
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        style: { width: '30%' },
                    }}
                >
                    <DialogTitle>{`Date : ${date}`}</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant="outlined"
                            multiline
                            rows={3}
                            margin="dense"
                            id="name" placeholder='Please enter task here'
                            fullWidth
                            value={taskName}
                            onChange={e => setTaskName(e.target.value)}
                        />
                    </DialogContent>
                    <Button style={{ backgroundColor: '#ffbc00', color: "white" }} onClick={handleAddTask}>Add Task</Button>
                </Dialog>
            </div>
        </>
    );
}

export default NewLanding;
