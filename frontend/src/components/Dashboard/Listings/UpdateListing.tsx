import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from '../../../config/config';
import { getDecodeTokenHook } from '@/hooks/useAuth';

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async (userId: string) => {
      try {
        const response = await axios.post(`${config.backendUrl}/listings/getUserByLists`, { userId });
        const userListing = response.data.data.find((item: any) => item._id === id);
        setListing(userListing);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    const decodedToken = getDecodeTokenHook();
    const userId = decodedToken?.userId;
    if (userId) {
      fetchListing(userId);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${config.backendUrl}/listings/updateList/${id}`, listing);
      navigate('/my-jobs');
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="jobTitle"
                type="text"
                placeholder={listing.jobTitle}
                value={listing.jobTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="postedBy"
                type="text"
                placeholder={listing.postedBy}
                value={listing.postedBy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder={listing.location}
                value={listing.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                type="text"
                placeholder={listing.department}
                value={listing.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                type="text"
                placeholder={listing.status}
                value={listing.status}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="price">Wages</Label>
              <Input
                id="price"
                name="price"
                type="text"
                placeholder={listing.price}
                value={listing.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="jobDescription">Description</Label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                placeholder={listing.jobDescription}
                value={listing.jobDescription}
                onChange={handleChange}
                required
                className="w-full bg-zinc-950 p-2 border rounded-md"
              />
            </div>
            <Button type="submit" className="w-full">
              Update Listing
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditListing;