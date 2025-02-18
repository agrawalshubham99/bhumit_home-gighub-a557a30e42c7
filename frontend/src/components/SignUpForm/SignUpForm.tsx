import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import config from '../../config/config';

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  // const [skills, setSkills] = useState([]);



  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backendUrl}/createUser`, { email, password, firstName, LastName });
      console.log(response);
      if (response.data.message === 'User registered successfully') {
        navigate('/login');
      } else {
        console.error('Registration failed');
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className={className} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email and password to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">First Name</Label>
                <Input
                  id="firstName"
                  type="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                // required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Last Name</Label>
                <Input
                  id="lastName"
                  type="lastName"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                // required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                // required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                // required
                />
              </div>
              <Button className="w-full" type="submit">Sign Up</Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Log In
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}