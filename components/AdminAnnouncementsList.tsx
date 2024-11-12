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
import { Announcement } from '@/app/lib/definitions';
import { AdminAnnouncementCard } from './AnnouncementCard';
import { BiSolidEditAlt } from 'react-icons/bi';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { MdClose } from 'react-icons/md';

export default function Announcements() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Announcement | null>(null);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isDeleteDialogOpen, setDeleteDialog] = useState<boolean>(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  const methods = useForm<AnnouncementFormData>({
    mode: 'onSubmit',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const fetchAnnouncements = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch('/api/announcements');
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    fetchAnnouncements(); // Call the function correctly
  }, []);

  const handleFetchAnnouncement = async (announcementId: string) => {
    try {
      const response = await fetch(
        `/api/announcements?announcementId=${announcementId}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch announcement');
      }
      const data = await response.json();
      //populate fields from fetched post
      reset({
        id: data.id,
        title: data.title,
        content: data.content,
      });

      setEdit(false);
      setSelectedPost(data);

      return true;
    } catch (error) {
      console.error('Error fetching announcement:', error);
      return null;
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      // Send DELETE request to the API endpoint with the announcement ID in the query string
      const response = await fetch(`/api/announcements?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      // Check if deletion was successful
      if (response.ok) {
        console.log('Announcement deleted successfully:', result.message);
        await fetchAnnouncements();
        setSelectedPost(null);
        setDeleteDialog(false);
        setDialogMessage(result.message || 'Update has been set.');
        // Optionally, add logic here to update the UI after successful deletion
      } else {
        console.error('Error deleting announcement:', result.error);
      }
    } catch (error) {
      console.error('Failed to delete announcement:', error);
    } finally {
      setDialogVisible(true);
      setTimeout(() => setDialogVisible(false), 5000);
    }
  };

  const onSubmit: SubmitHandler<AnnouncementFormData> = async (data) => {
    console.log('Submitting form data:', data);
    try {
      const response = await fetch('/api/announcements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          content: data.content,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setEdit(false);
        await fetchAnnouncements();
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
      setEditDialogOpen(false);
      setDialogVisible(true);
      setTimeout(() => setDialogVisible(false), 5000);
    }
  };

  return (
    <div
      id='announceForm'
      className='relative bg-darkTeal-bgColor w-full flex flex-col gap-0 justify-center items-center px-10 '
    >
      <div className='flex justify-start w-full'>
        <h1 className='font-bold text-white-headline_titles_description text-xl'>
          Announcements List
        </h1>
      </div>

      <div className='relative  w-full flex justify-start items-start flex-row gap-10 mt-6 h-[600px]'>
        <div
          className={`relative flex flex-col justify-start h-full items-start gap-2 overflow-y-auto ${
            selectedPost ? ' w-[50%]' : 'w-full'
          }`}
        >
          {loading ? (
            <>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-1/2 mb-4'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-1/2 mb-4'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-1/2 mb-4'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
              <div className='animate-pulse p-4 border border-teal-inputf_bg rounded-lg bg-teal-inputf_bg w-full flex justify-between flex-col'>
                <div className='h-6 bg-teal-inputf_border rounded w-3/4 mb-2'></div>
                <div className='h-4 bg-teal-inputf_border rounded w-1/2 mb-4'></div>
                {/* <div className='h-8 bg-gray-600 rounded w-full'></div> */}
              </div>
            </> //redesign here
          ) : (
            <>
              {announcements.map((announcement, index) => {
                return (
                  <AdminAnnouncementCard
                    key={index}
                    title={announcement.title}
                    createdAt={announcement.created_at}
                    announcementId={announcement.id}
                    onClick={() => {
                      handleFetchAnnouncement(announcement.id);
                    }}
                  />
                );
              })}
            </>
          )}
        </div>

        {selectedPost && (
          <div className='relative flex flex-col justify-center items-start w-[50%] border border-teal-inputf_border p-4 rounded-md'>
            <div className='flex flex-row w-full justify-between'>
              <h1 className='font-bold text-white-headline_titles_description text-xl'>
                Announcement
              </h1>
              <div className='flex flex-row gap-2'>
                <button
                  className='p-1 hover:bg-gray-700 rounded-md'
                  onClick={() => setEdit(true)}
                >
                  <RiEdit2Line
                    className='
                text-xl text-teal-navbar_active '
                  />
                </button>
                <button className='p-1 hover:bg-gray-700 rounded-md'>
                  <RiDeleteBinLine
                    className='
                text-xl text-red-500 '
                    onClick={() => setDeleteDialog(true)}
                  />
                </button>
                <button
                  className='p-1 hover:bg-gray-700 rounded-md'
                  onClick={() => setSelectedPost(null)}
                >
                  <MdClose
                    className='
                text-xl text-white-panels '
                  />
                </button>
              </div>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col gap-2 w-full items-center mt-5'
              >
                <input
                  className={`h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active  text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md w-full shadow-md p-4 ${
                    !isEdit
                      ? 'cursor-not-allowed bg-gray-800'
                      : 'bg-teal-inputf_bg'
                  }`}
                  placeholder='Edit title here'
                  disabled={!isEdit}
                  required
                  {...register('title', {
                    required: 'Title is Required',
                  })}
                />
                {errors.title?.message && (
                  <p className='mt-0 text-xs text-red-500'>
                    {errors.title.message}
                  </p>
                )}

                <textarea
                  className={`h-[500px] w-full text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4 ${
                    !isEdit
                      ? 'cursor-not-allowed bg-gray-800'
                      : 'bg-teal-inputf_bg'
                  }`}
                  placeholder='Edit description here '
                  disabled={!isEdit}
                  required
                  {...register('content', {
                    required: 'Content is Required',
                  })}
                />
                {errors.content?.message && (
                  <p className='mt-0 text-xs text-red-500'>
                    {errors.content.message}
                  </p>
                )}

                {isEdit && (
                  <div className='flex w-full justify-end gap-2'>
                    <button
                      type='button'
                      onClick={() => setEdit(false)}
                      className=' text-white-headline_titles_description border-[1px] border-teal-inputf_border p-4 rounded-md font-semibold flex flex-row h-[40px] justify-center items-center gap-2 mt-7'
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      onClick={() => setEditDialogOpen(true)}
                      className='gradient-button gradient-button-hovered hover:text-white-headline_titles_description p-4 rounded-md text-darkTeal-bgColor font-semibold flex flex-row h-[40px] justify-center items-center gap-2 mt-7'
                    >
                      Save Changes
                    </button>
                  </div>
                )}

                {isEditDialogOpen && (
                  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30'>
                    <div className='bg-white-panels rounded-lg p-5 shadow-md relative w-96'>
                      <h2 className='text-lg font-semibold text-black'>
                        Are you sure?
                      </h2>
                      <p className='text-sm mt-2 text-white-lightgray_desc'>
                        Do you want to save the changes you made?
                      </p>
                      <div className='flex justify-end mt-5'>
                        <button
                          onClick={() => setEditDialogOpen(false)}
                          className='mr-2 text-black px-4 py-2 rounded text-base h-8 w-50 flex items-center'
                        >
                          Cancel
                        </button>
                        <button
                          type='submit'
                          className='bg-teal-panel_inactive hover:bg-teal-inputf_bg shadow-md text-white-headline_titles_description px-4 py-2 rounded text-base h-8 w-50 flex items-center'
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </FormProvider>
          </div>
        )}

        {isDeleteDialogOpen && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30'>
            <div className='bg-white-panels rounded-lg p-5 shadow-md relative w-96'>
              <h2 className='text-lg font-semibold text-black'>
                Are you sure?
              </h2>
              <p className='text-sm mt-2 text-white-lightgray_desc'>
                This action cannot be undone.
              </p>
              <div className='flex justify-end mt-5'>
                <button
                  onClick={() => setDeleteDialog(false)}
                  className='mr-2 text-black px-4 py-2 rounded text-base h-8 w-50 flex items-center'
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    deleteAnnouncement(String(methods.getValues('id')))
                  }
                  className='bg-red-700 hover:bg-red-900 text-white-headline_titles_description px-4 py-2 rounded text-base h-8 w-50 flex items-center'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
}
