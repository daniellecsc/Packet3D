'use client';
import Image from 'next/image';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function AdminLogIn() {
  // Set the initial state to null instead of undefined
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData); // Call the action with the form data
  };

  return (
    <section
      id='login'
      className='relative bg-darkTeal-bgColor h-lvh flex lg:flex-row lg:gap-32 gap-6 lg:px-28 lg:pt-0 pt-28 justify-center items-center overflow-hidden flex-col '
    >
      <div className='hero-map absolute inset-0 opacity-10 z-0' />

      <div className='flex flex-col w-[35%] min-h-[530px] bg-teal-panel_active/15 rounded-xl p-4 shadow-md backdrop-blur-sm items-center justify-center gap-16'>
        <div className='flex items-center gap-4 flex-col'>
          <Image src='/Logo2.png' alt='logo2' width={40} height={40} />
          <h1 className='text-5xl text-white-headline_titles_description font-bold'>
            Login
          </h1>
        </div>

        <form
          action={formAction} // Attach the submit handler
          className='flex flex-col items-center justify-center w-full gap-3'
        >
          <input
            name='email' // Set name attribute for form data
            type='email'
            className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
            placeholder='Email'
            required // Make the field required
          />
          <div className='flex flex-col gap-1'>
            <input
              name='password' // Set name attribute for form data
              type='password'
              className='w-[300px] md:w-[370px] h-[50px] text-[16px] border border-teal-inputf_border focus:outline-none focus:border-teal-navbar_active bg-teal-inputf_bg text-white-subheading_details placeholder-white-inactive_titles_desc rounded-md shadow-md p-4'
              placeholder='Password'
              required // Make the field required
            />
            <div className='w-[300px] md:w-[370px]'>
              {/* Display error message if exists */}
              {errorMessage && (
                <p className='text-red-500 text-xs'>{errorMessage}</p>
              )}
            </div>
          </div>

          <button
            type='submit'
            className='gradient-button gradient-button-hovered p-4 rounded-md text-darkTeal-bgColor font-semibold flex flex-row w-[300px] md:w-[370px] h-[50px] justify-center items-center gap-2 mt-3'
            aria-disabled={isPending} // Disable button when pending
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  );
}
