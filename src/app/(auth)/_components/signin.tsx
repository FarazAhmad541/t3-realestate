/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '../auth.module.css'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [inputType, setInputType] = useState<'password' | 'text'>('password')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleFocus = () => {
    setInputType('text')
  }

  const handleBlur = () => {
    if (!isPasswordVisible) {
      setInputType('password')
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
    setInputType(isPasswordVisible ? 'password' : 'text')
  }
  const onSubmit = (data: any) => {
    console.log(data)
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

        <div className={styles.field_contianer}>
          <button type='submit' className={styles.button}>
            Sign in
          </button>
        </div>

        <div className={styles.divider} />

        <p>Or connect with</p>

        <button type='button' className={styles.google}>
          <Image src='/google.png' width={25} height={25} alt='google' />
          <p className={styles.google_text}>Google</p>
        </button>
      </form>
    </div>
  )
}
