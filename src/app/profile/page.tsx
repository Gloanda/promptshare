"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



import { useEffect, useState } from "react";



import Profile from "@/components/profile";


function ProfilePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  const router = useRouter();

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`);
  }

  async function handleDelete(post) {
    router.push(`/delete-prompt?id=${post._id}`);
  }

  async function fetchPosts() {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();

    setPosts(data);
  }

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;