"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";

import {
  GET_ALL_BOOK,
  DELETE_BOOK,
} from "@/components/apis/BookServices";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Edit, 
  Trash2, 
  BookOpen, 
  Bookmark, 
  Image as ImageIcon,
  Search,
  X,
  Filter
} from "lucide-react";

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  
  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState<"all" | "title" | "author">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "free" | "paid">("all");

  const loadBooks = async () => {
    setLoading(true);
    const result = await GET_ALL_BOOK();
    if (result.success) {
      setBooks(result.data);
      setFilteredBooks(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Filter books when search term, filter type, or status filter changes
  useEffect(() => {
    let result = [...books];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(book => 
        statusFilter === "free" ? book.is_free === true : book.is_free === false
      );
    }

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(book => {
        if (searchFilter === "title") {
          return book.title?.toLowerCase().includes(term);
        } else if (searchFilter === "author") {
          return book.author?.toLowerCase().includes(term);
        } else {
          // Search in all fields
          return (
            book.title?.toLowerCase().includes(term) ||
            book.author?.toLowerCase().includes(term) ||
            book.language?.toLowerCase().includes(term) ||
            book.id?.toString().includes(term)
          );
        }
      });
    }

    setFilteredBooks(result);
  }, [searchTerm, searchFilter, statusFilter, books]);

  const confirmDelete = (book: any) => {
    setSelectedBook(book);
    setOpenDelete(true);
  };

  const deleteBook = async () => {
    if (!selectedBook) return;
    const result = await DELETE_BOOK(selectedBook.id);
    if (result.success) {
      loadBooks();
    }
    setOpenDelete(false);
  };

  const handleImageError = (bookId: number) => {
    setImageError(prev => ({ ...prev, [bookId]: true }));
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchFilter("all");
    setStatusFilter("all");
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                Daftar Buku
              </h1>
              <p className="text-gray-500 mt-1">Kelola koleksi buku perpustakaan</p>
            </div>
            <Link href="/books/create">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Bookmark className="h-4 w-4 mr-2" />
                Tambah Buku
              </Button>
            </Link>
          </div>

          {/* Search Section */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Cari buku..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Search Filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                  >
                    <option value="all">Semua Field</option>
                    <option value="title">Judul</option>
                    <option value="author">Author</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                  >
                    <option value="all">Semua Status</option>
                    <option value="free">🆓 Gratis</option>
                    <option value="paid">💰 Berbayar</option>
                  </select>

                  {/* Clear Filter Button */}
                  {(searchTerm || searchFilter !== "all" || statusFilter !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              {/* Search Stats */}
              <div className="mt-2 text-sm text-gray-500">
                {filteredBooks.length === 0 && searchTerm && (
                  <span>Tidak ada buku yang ditemukan untuk "{searchTerm}"</span>
                )}
                {filteredBooks.length > 0 && searchTerm && (
                  <span>
                    Menampilkan {filteredBooks.length} dari {books.length} buku untuk "{searchTerm}"
                  </span>
                )}
                {filteredBooks.length > 0 && !searchTerm && statusFilter !== "all" && (
                  <span>
                    Menampilkan {filteredBooks.length} buku {statusFilter === "free" ? "gratis" : "berbayar"}
                  </span>
                )}
                {!searchTerm && statusFilter === "all" && filteredBooks.length === books.length && (
                  <span>Total {books.length} buku</span>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Data Buku</span>
                <Badge variant="outline" className="text-sm">
                  Total: {filteredBooks.length} Buku
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data buku...</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-lg">
                  <Table className="min-w-[900px]">
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-12 font-semibold">ID</TableHead>
                        <TableHead className="w-20 font-semibold">Cover</TableHead>
                        <TableHead className="font-semibold">Judul</TableHead>
                        <TableHead className="font-semibold">Author</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Rating</TableHead>
                        <TableHead className="font-semibold">Views</TableHead>
                        <TableHead className="font-semibold text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredBooks.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-12">
                            <div className="flex flex-col items-center gap-2">
                              <BookOpen className="h-12 w-12 text-gray-300" />
                              <p className="text-gray-500 font-medium">
                                {searchTerm ? "Tidak ada buku yang ditemukan" : "Belum ada buku"}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {searchTerm 
                                  ? `Coba cari dengan kata kunci lain` 
                                  : "Mulai tambahkan buku ke perpustakaan"}
                              </p>
                              {searchTerm ? (
                                <Button
                                  variant="outline"
                                  onClick={clearSearch}
                                  className="mt-2"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Hapus Filter
                                </Button>
                              ) : (
                                <Link href="/books/create">
                                  <Button variant="outline" className="mt-2">
                                    <Bookmark className="h-4 w-4 mr-2" />
                                    Tambah Buku Sekarang
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBooks.map((book) => (
                          <TableRow key={book.id} className="hover:bg-gray-50 transition-colors">
                            <TableCell className="font-medium text-gray-500">
                              {book.id}
                            </TableCell>

                            <TableCell>
                              {book.image ? (
                                !imageError[book.id] ? (
                                  <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                    <img
                                      src={book.image}
                                      alt={book.title}
                                      className="w-full h-full object-cover"
                                      onError={() => handleImageError(book.id)}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-16 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <ImageIcon className="h-6 w-6 text-gray-400" />
                                  </div>
                                )
                              ) : (
                                <div className="w-16 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                  <ImageIcon className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </TableCell>

                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-800">{book.title}</p>
                                {book.language && (
                                  <p className="text-xs text-gray-400 mt-0.5">
                                    {book.language}
                                  </p>
                                )}
                              </div>
                            </TableCell>

                            <TableCell>
                              <span className="text-gray-600">{book.author}</span>
                            </TableCell>

                            <TableCell>
                              {book.is_free ? (
                                <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                                  🆓 Gratis
                                </Badge>
                              ) : (
                                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100">
                                  💰 Berbayar
                                </Badge>
                              )}
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span className="font-medium">{book.rating}</span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-1 text-gray-600">
                                <Eye className="h-4 w-4" />
                                <span>{book.views}</span>
                              </div>
                            </TableCell>

                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Link href={`/books/edit/${book.id}`}>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 px-3"
                                  >
                                    <Edit className="h-3.5 w-3.5 mr-1" />
                                    Edit
                                  </Button>
                                </Link>

                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="h-8 px-3"
                                  onClick={() => confirmDelete(book)}
                                >
                                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                                  Hapus
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delete Dialog */}
          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-red-600 flex items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  Hapus Buku
                </DialogTitle>
              </DialogHeader>

              <div className="py-4">
                <p className="text-gray-700">
                  Apakah Anda yakin ingin menghapus buku:
                </p>
                <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="font-semibold text-gray-800 text-lg">
                    {selectedBook?.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    oleh {selectedBook?.author}
                  </p>
                  {selectedBook?.image && (
                    <div className="mt-2 w-20 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={selectedBook.image}
                        alt={selectedBook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  ⚠️ Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>

              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpenDelete(false)}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={deleteBook}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}