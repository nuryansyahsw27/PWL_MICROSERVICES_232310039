"use client";

import {
  useEffect,
  useState,
} from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  GET_BOOK_STATS,
} from "@/components/apis/BookServices";

import {
  GET_USER_STATS,
} from "@/components/apis/UserServices";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [
    totalBooks,
    setTotalBooks,
  ] = useState(0);

  const [
    totalUsers,
    setTotalUsers,
  ] = useState(0);

  const [
    totalViews,
    setTotalViews,
  ] = useState(0);

  const loadData =
    async () => {
      const bookStats =
        await GET_BOOK_STATS();

      const userStats =
        await GET_USER_STATS();

      setTotalBooks(
        bookStats.totalBooks
      );

      setTotalViews(
        bookStats.totalViews
      );

      setTotalUsers(
        userStats.totalUsers
      );
    };

  useEffect(() => {
    loadData();
  }, []);

  const chartData = [
    {
      name: "Books",
      value:
        totalBooks,
    },
    {
      name: "Users",
      value:
        totalUsers,
    },
    {
      name: "Views",
      value:
        totalViews,
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <Card>
            <CardHeader>
              <CardTitle>
                Total Books
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                {totalBooks}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Total Users
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                {totalUsers}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Total Views
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                {totalViews}
              </p>
            </CardContent>
          </Card>

        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Statistik Sistem
            </CardTitle>
          </CardHeader>

          <CardContent>

            <div className="h-[250px] md:h-[350px] w-full">

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart
                  data={
                    chartData
                  }
                >
                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                  />
                </BarChart>
              </ResponsiveContainer>

            </div>

          </CardContent>
        </Card>

      </AdminLayout>
    </ProtectedRoute>
  );
}