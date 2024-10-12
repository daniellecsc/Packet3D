'use client';
import Image from 'next/image';
import React, { useState, FormEvent } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  feedback: string;
};

type ContactProps = {
  onFeedbackSubmitted: () => void; // Callback to refresh the feedback list
};

export default function Contact() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert(error);
    } finally {
      reset({ name: '', email: '', feedback: '' });
    }
  };

  return (
    <section
      id='contact'
      className='relative bg-darkTeal-bgColor h-lvh flex lg:flex-row flex-col gap-5 lg:px-24 py-10 pb-32 lg:py-12 justify-center items-center overflow-hidden'
    >
      <div className='about-map absolute inset-0 opacity-75 z-0' />
      <div className='contact-map absolute inset-0 opacity-100 z-0' />

      <div className='relative lg:w-[60%] w-full z-10 flex justify-start items-start flex-col mt-56 md:mt-56 lg:mt-16 lg:px-0 px-10'>
        <div className='relative flex flex-col w-full justify-start lg:items-start items-center text-center lg:text-start'>
          <h1 className='text-white-headline_titles_description font-bold text-[40px] md:text-[55px] 2xl:text-[70px] leading-[100%] drop-shadow-md'>
            Get in touch with us!
          </h1>
          <p className='text-white-lightgray_desc font-normal text-[16px]'>
            Let us know about your experience!
          </p>
        </div>

        <div className='relative flex flex-col justify-center lg:justify-start items-start w-full'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-1 mt-11 w-full items-center lg:items-start'
          >
            <div></div>
            <input
              type='text'
              className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
              placeholder='Name'
              aria-describedby='name-error'
              required
              {...register('name', { required: 'Name is required' })}
            />
            {errors?.name?.message && (
              <p className='mt-0 text-sm text-red-500'>{errors.name.message}</p>
            )}

            <input
              type='email'
              className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
              placeholder='Email'
              aria-describedby='email-error'
              required
              {...register('email', { required: 'Email is required' })}
            />
            {errors?.email?.message && (
              <p className='mt-0 text-sm text-red-500'>
                {errors.email.message}
              </p>
            )}
            <textarea
              className='w-[300px] md:w-[370px] h-[130px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
              placeholder='Message'
              aria-describedby='feedback-error'
              required
              {...register('feedback', { required: 'Message is required' })}
            />
            {errors?.feedback?.message && (
              <p className='mt-0 text-sm text-red-500'>
                {errors.feedback.message}
              </p>
            )}

            <button
              type='submit'
              className='gradient-button gradient-button-hovered p-4 rounded-md text-darkTeal-bgColor font-semibold flex flex-row w-[300px] md:w-[370px] h-[50px] justify-center items-center gap-2 mt-3'
            >
              Submit
            </button>
          </form>
        </div>

        <div className='flex flex-col mt-10 w-full justify-start lg:items-start items-center'>
          <p className='w-[300px] md:w-[370px] lg:w-auto text-white-subheading_details font-bold text-[16px]'>
            Find us on:
          </p>

          <div className='flex flex-row gap-3 mt-1 w-[300px] md:w-[370px] lg:w-auto'>
            <a href='https://www.facebook.com/profile.php?id=61565802862968&mibextid=LQQJ4d'>
              <FaFacebook className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
            </a>
            <a href='https://www.instagram.com/packet3d'>
              <RiInstagramFill className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
            </a>
            <a href='https://x.com/packet3d'>
              <FaSquareXTwitter className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
            </a>
            <a className='ml-4 md:ml-20 flex'>
              <BiLogoGmail className='text-teal-icons text-xl transform transition-transform hover:scale-125 hover:text-white-panels' />
              <p className='text-white-subheading_details font-normal text-[13px] ml-1'>
                teampacket3d@gmail.com
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className='relative flex flex-row z-10 lg:w-[50%] w-full mt-14'>
        <Image
          src='/Envelope.png'
          alt='envelope'
          width={600}
          height={600}
          className='hidden lg:flex'
        />
      </div>
    </section>
  );
}
