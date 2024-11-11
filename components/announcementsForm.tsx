'use client';

import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  AnnouncementFormData,
  announcementSchema,
} from '@/app/lib/announcementSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaCircleCheck } from 'react-icons/fa6';
import { useSession } from 'next-auth/react'; // Import useSession hook
import { RiEdit2Line } from 'react-icons/ri';
import { LuText } from 'react-icons/lu';

export default function AnnouncementsForm() {
  const { data: session, status } = useSession(); // Using the useSession hook
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const methods = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    mode: 'onSubmit',
  });

  console.log(session?.user?.email);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<AnnouncementFormData> = async (data) => {
    if (status === 'unauthenticated') {
      setDialogMessage('You are not logged in.');
      return;
    }

    const id = session?.user?.id;

    try {
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data, // Spread the form data
          user_id: id, // Add the user_id as part of the body
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setDialogMessage(result.message || 'Announcement has been saved.');
      } else {
        setDialogMessage('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      if (error instanceof Error) {
        setDialogMessage(error.message);
      } else {
        setDialogMessage('An unexpected error occurred');
      }
    } finally {
      reset({ title: '', content: '' });
      setDialogVisible(true);
      setTimeout(() => setDialogVisible(false), 5000);
    }
  };

  if (status === 'unauthenticated') {
    return <div>You are not authenticated</div>;
  }

  return (
    <section
      id='announceForm'
      className='relative bg-darkTeal-bgColor w-full flex flex-col gap-0 justify-center items-center overflow-hidden'
    >
      <div className='relative lg:w-[95%] w-full flex justify-start items-start flex-col lg:px-0 px-10'>
        <div className='relative flex flex-col justify-center items-start w-full'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-2 w-full items-center'
              noValidate
            >
              <div className='w-full flex flex-row justify-between items-start gap-6'>
                <RiEdit2Line className='text-xl text-white-panels mt-4' />
                <div className='flex-grow'>
                  <input
                    className='h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md w-full shadow-md p-4'
                    placeholder='Announcement title'
                    required
                    {...register('title')}
                  />
                  {errors.title?.message && (
                    <p className='mt-0 text-xs text-red-500'>
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='w-full flex flex-row justify-between items-start gap-6'>
                <LuText className='text-xl text-white-panels mt-5' />
                <div className='flex-grow'>
                  <textarea
                    className='h-[500px] w-full text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
                    placeholder='Add description'
                    required
                    {...register('content')}
                  />
                  {errors.content?.message && (
                    <p className='mt-0 text-xs text-red-500'>
                      {errors.content.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='flex w-full justify-end'>
                <button
                  type='submit'
                  className='gradient-button gradient-button-hovered hover:text-white-headline_titles_description p-4 rounded-md text-darkTeal-bgColor font-semibold flex flex-row h-[40px] justify-center items-center gap-2 mt-7'
                >
                  Post Announcement
                </button>
              </div>
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
      </div>
    </section>
  );
}
