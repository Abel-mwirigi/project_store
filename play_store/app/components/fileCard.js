import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    CardActions,
    Button,
} from '@mui/material';

const FileCard = ({ file }) => {
    return (
        <Card style={{ maxWidth: "200px" }}>
            <CardMedia
                component="img"
                alt={file.fileName}
                height="100px"
                image={file.fileImage ? file.fileImage : "../assets/4.png"}
                title={file.fileName}
            />
            <CardContent>
                <Typography variant="h5" noWrap sx={{}}>
                    {file.fileName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" href={file.fileUrl} >
                    Explore
                </Button>
            </CardActions>
        </Card>
    );
};

export default FileCard;
