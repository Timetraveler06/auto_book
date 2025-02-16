"use client";
import AuthForm from '@/components/AuthForm'
import { signInWithCredientials } from '@/lib/actions/auth';
import { signInSchema } from '@/lib/validations'
import React from 'react'

const page = () => (

  <AuthForm 
      type= "SIGN_IN"
      schema={signInSchema}
      defaultValues = {{
        email:"",
        password: ""
      }}
      onSubmit={signInWithCredientials}
      />


)

export default page