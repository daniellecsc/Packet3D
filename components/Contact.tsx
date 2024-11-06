'use client';
import Image from 'next/image';
import React, { useState } from 'react'; // Import useState for managing dialog visibility
import { FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { BiLogoGmail } from 'react-icons/bi';
import { FaCircleCheck } from 'react-icons/fa6';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/app/lib/feedbackSchema';

export default function Contact() {
  const [dialogVisible, setDialogVisible] = useState(false); // State for dialog visibility
  const [dialogMessage, setDialogMessage] = useState(''); // State for dialog message
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onSubmit',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
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
        setDialogMessage(result.message || 'Your message has been sent!'); // Set the dialog message
      } else {
        setDialogMessage('Error: ' + result.error); // Set error message
      }
    } catch (error: unknown) {
      console.error('Submission error:', error); // Log full error for debugging

      if (error instanceof Error) {
        setDialogMessage(error.message); // Display user-friendly message
      } else {
        setDialogMessage('An unexpected error occurred'); // Fallback message
      }
    } finally {
      reset({ name: '', email: '', feedback: '' });
      setDialogVisible(true); // Show the dialog

      // Hide the dialog after 5 seconds
      setTimeout(() => {
        setDialogVisible(false);
      }, 2000);
    }
  };

  return (
    <section
      id='contact'
      className='relative bg-darkTeal-bgColor h-lvh flex lg:flex-row flex-col gap-0 lg:px-28 py-10 pb-32 lg:py-12 justify-center items-center overflow-hidden'
    >
      <div className='about-map absolute inset-0 opacity-100 z-0' />

      <div className='relative lg:w-[90%] w-full z-10 flex justify-start items-start flex-col mt-56 md:mt-56 lg:mt-16 lg:px-0 px-10'>
        <div className='relative flex flex-col w-full justify-start lg:items-start items-center text-center lg:text-start'>
          <h1 className='text-white-headline_titles_description font-bold text-[40px] md:text-[55px] 2xl:text-[70px] leading-[100%] drop-shadow-lg'>
            Get in touch with us!
          </h1>
          <p className='text-white-lightgray_desc font-normal text-[16px] drop-shadow-md'>
            Let us know about your experience!
          </p>
        </div>

        <div className='relative flex flex-col justify-center lg:justify-start items-start w-full'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-1 mt-11 w-full items-center lg:items-start'
              noValidate
            >
              <input
                className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
                placeholder='Name'
                aria-describedby='name-error'
                required
                {...register('name')}
              />
              {errors.name?.message && (
                <p className='mt-0 text-xs text-red-500'>
                  {errors.name.message}
                </p>
              )}

              <input
                className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
                placeholder='Email'
                aria-describedby='email-error'
                required
                {...register('email')}
              />
              {errors.email?.message && (
                <p className='mt-0 text-xs text-red-500'>
                  {errors.email.message}
                </p>
              )}
              <textarea
                className='w-[300px] md:w-[370px] h-[130px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
                placeholder='Message'
                aria-describedby='feedback-error'
                required
                {...register('feedback')}
              />
              {errors.feedback?.message && (
                <p className='mt-0 text-xs text-red-500'>
                  {errors.feedback.message}
                </p>
              )}

              <button
                type='submit'
                className='gradient-button gradient-button-hovered hover:text-white-headline_titles_description p-4 rounded-md text-darkTeal-bgColor font-semibold flex flex-row w-[300px] md:w-[370px] h-[50px] justify-center items-center gap-2 mt-3'
              >
                Submit
              </button>
            </form>
          </FormProvider>
        </div>

        {/* Dialog Box */}
        {dialogVisible && (
          <div className='fixed inset-0 flex justify-center items-start mt-24 z-50'>
            <div className='bg-teal-panel_inactive rounded-lg shadow-lg py-2 px-4 max-w-md mx-auto flex gap-3'>
              <div className='text-white-headline_titles_description text-xl'>
                <FaCircleCheck />
              </div>

              <p className='text-center text-white-headline_titles_description text-sm font-medium drop-shadow-md'>
                {dialogMessage}
              </p>
            </div>
          </div>
        )}

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
          src='/BMO.webp'
          alt='bmo'
          width={450}
          height={450}
          className='hidden lg:flex'
        />
        <Image
          src='/BMO.webp'
          alt='bmo duplicate'
          width={200}
          height={200}
          className='absolute lg:left-[-170px] lg:bottom-10 hidden xl:flex'
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
    </section>
  );
}
