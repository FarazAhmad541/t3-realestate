'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react';
import { z } from 'zod';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSignUp, useUser } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

import ToastContainer from '~/components/Toast/ToastContainer/ToastContainer';
import useToast from '~/hooks/useToast';

import styles from '../auth.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
});

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        clearErrors,
    } = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
    });

    const { signUp, isLoaded, setActive } = useSignUp();
    const { isSignedIn } = useUser();
    const { toasts, removeToast, addToast } = useToast();
    const router = useRouter();
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const [isPending, setIsPending] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    if (!isLoaded) return null;

    if (isSignedIn) router.push('/');

    const handleFocus = () => {
        setInputType('text');
    };

    const handleBlur = () => {
        if (!isPasswordVisible) {
            setInputType('password');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof z.infer<typeof SignUpSchema>;
        setValue(name, e.target.value);
        clearErrors(name);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
        setInputType(isPasswordVisible ? 'password' : 'text');
    };

    const handleSignUp = async (data: z.infer<typeof SignUpSchema>) => {
        setIsPending(true);
        console.log(data);
        if (!isLoaded) {
            return null;
        }
        const { email, password, confirmPassword } = data;
        if (!email) {
            setError(
                'email',
                { type: 'required', message: 'Email is required' },
                { shouldFocus: true },
            );
        }
        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'invalid',
                message: 'Passwords do not match',
            });
        }

        try {
            const { status, createdSessionId } = await signUp.create({
                emailAddress: email,
                password: password,
            });
            if (status === 'complete' && createdSessionId) {
                await setActive({ session: createdSessionId });
                router.push('/');
            }
        } catch (err: any) {
            console.log(err);
            if (isClerkAPIResponseError(err)) {
                console.log(err.errors[0].message);
                addToast(err.errors[0].message, 'error');
            }
            setIsPending(false);
        }
    };

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;

        try {
            // Use the Clerk SDK to authenticate with Google and redirect the user
            await signUp.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            if (isClerkAPIResponseError(err)) {
                console.log(JSON.stringify(err, null, 2));
                addToast(err.errors[0].message, 'error');
                return;
            }
        }
    };

    const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
        await handleSignUp(data);
    };
    return (
        <div className={styles.form_container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.field_contianer}>
                    <label htmlFor="email" className={styles.label}>
                        Email:
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        required
                        className={clsx(
                            styles.input,
                            errors.email && styles.input_error,
                        )}
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className={styles.error}>{errors.email.message}</p>
                    )}
                </div>
                <div className={styles.field_contianer}>
                    <label htmlFor="password" className={styles.label}>
                        Password:
                    </label>
                    <div className={styles.password_wrapper}>
                        <input
                            {...register('password')}
                            type={inputType}
                            id="password"
                            placeholder="Enter Password"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={clsx(
                                styles.input,
                                errors?.password && styles.input_error,
                            )}
                        />
                        <button
                            type="button"
                            className={styles.password_button}
                            onClick={togglePasswordVisibility}
                            aria-label={
                                isPasswordVisible
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {isPasswordVisible ? (
                                <EyeOffIcon className={styles.password_icon} />
                            ) : (
                                <EyeIcon className={styles.password_icon} />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className={styles.error}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className={styles.field_contianer}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                        Confirm Password:
                    </label>
                    <div className={styles.password_wrapper}>
                        <input
                            {...register('confirmPassword')}
                            type={inputType}
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={clsx(
                                styles.input,
                                errors?.confirmPassword && styles.input_error,
                            )}
                        />
                        <button
                            type="button"
                            className={styles.password_button}
                            onClick={togglePasswordVisibility}
                            aria-label={
                                isPasswordVisible
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {isPasswordVisible ? (
                                <EyeOffIcon className={styles.password_icon} />
                            ) : (
                                <EyeIcon className={styles.password_icon} />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className={styles.error}>
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className={styles.button}
                    disabled={isPending}
                >
                    {isPending && <LoaderCircle className={styles.spinner} />}
                    <p className={styles.button_text}>Sign up</p>
                </button>

                <div className={styles.divider} />

                <p>Or connect with</p>

                <button
                    type="button"
                    className={styles.google}
                    onClick={handleGoogleSignUp}
                >
                    <Image
                        src="/google.png"
                        width={25}
                        height={25}
                        alt="google"
                    />
                    <p className={styles.google_text}>Google</p>
                </button>
            </form>

            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
}
