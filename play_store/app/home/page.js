"use client";
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, Button, Link, List, ListItem, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import axios from "axios";

export default function LinkDemo() {
  const queryClient = useQueryClient();

  const { data: users, error, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: async () => {
    try {
      const response = await axios.get("http://localhost:3000/users"); // Replace with your actual API endpoint
      return response.data; // Axios automatically parses the JSON response
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
    <Box sx={{ ml: "250px", mt:"100px" }}>
      <Box>
        <Card sx={{ width:"150px", height:"300px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="../assets/4.png"
              alt="random"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {users.map((user) => (
                  <List key={user.id}>
                    <ListItem>
                      <Typography variant="body2" color="text.secondary">
                        {user.firstName}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </ListItem>
                  </List>
                ))}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
}
