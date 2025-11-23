import React, { useState, useCallback } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { FormStatus } from '../types';
import logoImage from '/logo.png';

export const EmailCaptureForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please enter your Email ID.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid Email ID.');
      return;
    }

    setStatus(FormStatus.LOADING);

    try {
      // specific requirement: redirect to https://trainingtwc.github.io/Prism/?EMPID="email entered"
      // Adding a small artificial delay so the user sees the button feedback before redirecting
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const targetUrl = `https://trainingtwc.github.io/Prism/?EMPID=${encodeURIComponent(email)}`;
      window.location.href = targetUrl;
      
    } catch (err) {
      setStatus(FormStatus.ERROR);
      setErrorMessage('Something went wrong. Please try again.');
    }
  }, [email]);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Prism Logo Gradient: Violet -> Blue */}
      <div className="p-1 bg-gradient-to-r from-violet-600 to-blue-600" />
      
      <div className="p-8">
        <div className="flex flex-col items-center justify-center mb-6">
          <img 
            src={logoImage} 
            alt="Third Wave Coffee Logo" 
            className="h-32 w-auto mb-2"
          />

          <p className="mt-1 text-slate-500 text-sm text-center">
            Welcome to our campus drive! Please enter your email to proceed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <Input
            label="Email ID"
            type="email"
            placeholder="Please enter Email ID"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            error={errorMessage}
            icon={<Mail className="w-5 h-5" />}
            disabled={status === FormStatus.LOADING}
            autoComplete="email"
          />

          <Button 
            type="submit" 
            className="w-full" 
            isLoading={status === FormStatus.LOADING}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {status === FormStatus.LOADING ? 'Redirecting...' : 'Get Started'}
          </Button>
        </form>

      </div>
    </div>
  );
};