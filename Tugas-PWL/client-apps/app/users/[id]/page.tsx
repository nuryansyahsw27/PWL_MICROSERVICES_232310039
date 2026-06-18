"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  GET_USER_BY_ID,
} from "@/components/apis/UserServices";

export default function UserDetail() {
  const params =
    useParams();

  const [user, setUser] =
    useState<any>(
      null
    );

  const loadUser =
    async () => {
      const result =
        await GET_USER_BY_ID(
          String(
            params.id
          )
        );

      if (
        result.success
      ) {
        setUser(
          result.data
        );
      }
    };

  useEffect(() => {
    loadUser();
  }, []);

  if (!user) {
    return (
      <div
        style={{
          padding: 30,
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 30,
      }}
    >
      <h1>
        Detail User
      </h1>

      <br />

      <p>
        ID :
        {user.id}
      </p>

      <p>
        Username :
        {
          user.username
        }
      </p>

      <p>
        Email :
        {user.email}
      </p>

      <p>
        Role :
        {user.role}
      </p>
    </div>
  );
}