"use client";
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import FileCard from '../components/fileCard';
import { Grid, Typography } from '@mui/material';

export default function ProjectFiles() {
    const queryClient = useQueryClient();

    const { data: projects, error, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            try {
                const response = await axios.get('http://localhost:3000/projects');
                return response.data;
            } catch (error) {
                throw new Error(error.response ? error.response.data.message : error.message);
            }
        },
    });

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    return (
        <Grid container spacing={2}>
            {projects.map((project) =>
                project.files.map((file) => (
                    <Grid item key={file.id} xs={12} sm={6} md={2}>
                        <FileCard file={file} />
                    </Grid>
                ))
            )}
        </Grid>
    );
};