// app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import useAuth from "~/hooks/useAuth"

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { isAuthenticated } = useAuth();
  const router = useRouter();



  return (
    <>
    </>
  );
}