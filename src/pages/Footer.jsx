import { Box, Grid } from "@mui/material";
import React from "react";

const Footer = () => {

    return (

        <Grid container xs={12} className="footer">
            <Grid className="foot" item xs={6}>
                <Link to=""><Box className="text-center">TODOS</Box> </Link>
            </Grid>
            <Grid item xs={6}>
                <Box className="text-left">FINISHED</Box>
            </Grid>
        </Grid>
    )
}

export default Footer