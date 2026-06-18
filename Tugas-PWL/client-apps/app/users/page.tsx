"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, UserCircle } from "lucide-react";
import { GET_ALL_USER, GET_USER_STATS } from "@/components/apis/UserServices";

interface User {
  id: number | string;
  username: string;
  email: string;
  role: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [error, setError] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await GET_ALL_USER();
      console.log("GET_ALL_USER result:", result);
      
      if (result.success === false) {
        setError(result.message || "Gagal memuat data user");
        setUsers([]);
        setTotalUsers(0);
      } else {
        // Handle different response formats
        let userData = [];
        if (Array.isArray(result)) {
          userData = result;
        } else if (result.data && Array.isArray(result.data)) {
          userData = result.data;
        } else if (result.users && Array.isArray(result.users)) {
          userData = result.users;
        } else {
          userData = [];
        }
        
        setUsers(userData);
        setTotalUsers(userData.length);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Terjadi kesalahan saat memuat data");
      setUsers([]);
      setTotalUsers(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Get user stats
  const fetchUserStats = async () => {
    try {
      const stats = await GET_USER_STATS();
      setTotalUsers(stats.totalUsers || 0);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserStats();
  }, []);

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    const roleLower = role?.toLowerCase() || "";
    switch (roleLower) {
      case "admin":
      case "administrator":
        return "bg-red-100 text-red-700 border-red-200";
      case "moderator":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "user":
      case "customer":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-purple-100 text-purple-700 border-purple-200";
    }
  };

  const getRoleLabel = (role: string) => {
    const roleLower = role?.toLowerCase() || "";
    switch (roleLower) {
      case "admin":
      case "administrator":
        return "Administrator";
      case "moderator":
        return "Moderator";
      case "user":
      case "customer":
        return "Pengguna";
      default:
        return role || "Unknown";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    return statusLower === "active" || statusLower === "aktif"
      ? "bg-green-100 text-green-700 border-green-200"
      : "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusLabel = (status: string) => {
    const statusLower = status?.toLowerCase() || "";
    return statusLower === "active" || statusLower === "aktif" ? "Aktif" : "Tidak Aktif";
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="p-6 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat data user...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Users className="h-8 w-8 text-indigo-600" />
                Manajemen User
              </h1>
              <p className="text-gray-500 mt-1">Daftar seluruh pengguna perpustakaan</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 px-4 py-2 text-sm">
                Total: {totalUsers} User
              </Badge>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari user (username, email, atau role)..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-12 font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Username</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">Tanggal Bergabung</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center gap-2">
                          <UserCircle className="h-12 w-12 text-gray-300" />
                          <p className="text-gray-500 font-medium">Tidak ada data user</p>
                          <p className="text-gray-400 text-sm">
                            {searchTerm ? "Coba ubah kata kunci pencarian" : "Belum ada user yang terdaftar"}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <TableRow key={user.id || index} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium text-gray-500">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border-2 border-indigo-100">
                              <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                                {user.username?.charAt(0)?.toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-800">{user.username || "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">{user.email || "-"}</TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {getRoleLabel(user.role)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 hidden md:table-cell">
                          {formatDate(user.created_at || user.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Footer Info */}
          {filteredUsers.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Menampilkan {filteredUsers.length} dari {users.length} user
            </div>
          )}

          {/* Refresh Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                fetchUsers();
                fetchUserStats();
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              ↻ Refresh Data
            </button>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}