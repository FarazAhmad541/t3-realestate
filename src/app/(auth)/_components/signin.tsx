/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ToastContainer from '~/components/Toast/ToastContainer/ToastContainer'
import useToast from '~/hooks/useToast'
import styles from '../auth.module.css'

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

import { useSignIn, useUser } from '@clerk/nextjs'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
export default function SignUp() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
  })
  const [inputType, setInputType] = useState<'password' | 'text'>('password')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { signIn, isLoaded, setActive } = useSignIn()
  const { isSignedIn } = useUser()
  const { toasts, removeToast, addToast } = useToast()
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  if (!isLoaded) return null

  if (isSignedIn) router.push('/')

  const handleFocus = () => {
    setInputType('text')
  }

  const handleBlur = () => {
    if (!isPasswordVisible) {
      setInputType('password')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof z.infer<typeof SignInSchema>
    setValue(name, e.target.value)
    clearErrors(name)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
    setInputType(isPasswordVisible ? 'password' : 'text')
  }

  const handleSignIn = async (data: z.infer<typeof SignInSchema>) => {
    setIsPending(true)
    const { email, password } = data
    if (!isLoaded) {
      return null
    }
    if (!data.email) {
      setError('email', {
        type: 'required',
        message: 'Email is required',
      })
    }
    if (!data.password) {
      setError('password', {
        type: 'required',
        message: 'Password is required',
      })
    }
    try {
      const { status, createdSessionId } = await signIn.create({
        identifier: email,
        password: password,
      })
      if (status === 'complete' && createdSessionId) {
        await setActive({ session: createdSessionId })
        router.push('/')
      }
    } catch (err) {
      console.log(err)
      if (isClerkAPIResponseError(err)) {
        console.log(err.errors[0].message)
        addToast(err.errors[0].message, 'error')
        return
      }
    }
    setIsPending(false)
  }

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    await handleSignIn(data)
  }

  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field_contianer}>
          <label htmlFor='email' className={styles.label}>
            Email:
          </label>
          <input
            {...register('email')}
            type='email'
            id='email'
            className={styles.input}
            placeholder='Enter your email'
            onChange={handleChange}
          />
        </div>
        <div className={styles.field_contianer}>
          <label htmlFor='password' className={styles.label}>
            Password:
          </label>
          <div className={styles.password_wrapper}>
            <input
              {...register('password')}
              type={inputType}
              id='password'
              placeholder='Enter Password'
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              className={clsx(
                styles.input,
                errors?.password && styles.input_error
              )}
            />
            <button
              type='button'
              className={styles.password_button}
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? (
                <EyeOffIcon className={styles.password_icon} />
              ) : (
                <EyeIcon className={styles.password_icon} />
              )}
            </button>
          </div>
        </div>

        <button type='submit' className={styles.button} disabled={isPending}>
          {isPending && <LoaderCircle className={styles.spinner} />}
          <p className={styles.button_text}>Sign Ip</p>
        </button>

        <div className={styles.divider} />

        <p>Or connect with</p>

        <button type='button' className={styles.google}>
          <Image src='/google.png' width={25} height={25} alt='google' />
          <p className={styles.google_text}>Google</p>
        </button>
      </form>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}
