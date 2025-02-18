import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from '../../../config/config';
import { jwtDecode } from 'jwt-decode';


const AddListing = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [postedBy, setPostedBy] = useState('');
    const [location, setlocation] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setstatus] = useState('');
    const [price, setprice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token : string | null = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        const decodedToken = jwtDecode<{ userId: string }>(token);
        const userId = decodedToken.userId;

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', jobTitle);
        formData.append('company', postedBy);
        formData.append('location', location);
        formData.append('Department', department);
        formData.append('Status', status);
        formData.append('Price', price);
        if (image) {
            formData.append('image', image);
        }


        try {
            // await axios.post(`${config.backendUrl}/listings/addList`, formData, {
            //     headers: { // change to header in backend
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
            await axios.post(`${config.backendUrl}/listings/addList`, { userId, jobTitle, postedBy, location, jobDescription, department, status, price, image, });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Create Job</CardTitle>
                        <CardDescription>
                            Fill in the details below to create a new job listing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label htmlFor="title">Job Title</Label>
                                <Input
                                    id="jobTitle"
                                    type="text"
                                    placeholder='Ex. temporary hiring for Plumber'
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="company">Company</Label>
                                <Input
                                    id="postedBy"
                                    type="text"
                                    placeholder='Ex. John Doe'
                                    value={postedBy}
                                    onChange={(e) => setPostedBy(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder='Ex. Waterloo, ON'
                                    value={location}
                                    onChange={(e) => setlocation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="jobDescription"
                                    value={jobDescription}
                                    placeholder='Ex. Hiring for Plumber.'
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    required
                                    className="w-full  bg-zinc-950 p-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="department">Department</Label>
                                <textarea
                                    id="department"
                                    value={department}
                                    placeholder='Plumber'
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                    className="w-full  bg-zinc-950 p-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="status">Status</Label>
                                <textarea
                                    id="status"
                                    value={status}
                                    onChange={(e) => setstatus(e.target.value)}
                                    required
                                    className="w-full  bg-zinc-950 p-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="price">Wages</Label>
                                <textarea
                                    id="price"
                                    value={price}
                                    placeholder='Ex. $100 Per Hrs.'
                                    onChange={(e) => setprice(e.target.value)}
                                    required
                                    className="w-full  bg-zinc-950 p-2 border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="image">Upload Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Create Job
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default AddListing;