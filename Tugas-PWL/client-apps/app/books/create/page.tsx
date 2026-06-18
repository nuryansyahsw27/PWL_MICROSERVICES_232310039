"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CREATE_BOOK } from "@/components/apis/BookServices";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddBook() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [views, setViews] = useState(0);
  const [isFree, setIsFree] = useState(true);
  const [language, setLanguage] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveBook = async () => {
    setIsLoading(true);
    try {
      const result = await CREATE_BOOK({
        title,
        author,
        rating,
        views,
        is_free: isFree,
        language,
        sinopsis,
        story,
        image,
      });

      if (result.success) {
        alert("Buku berhasil ditambahkan");
        router.push("/books");
      } else {
        alert("Gagal menambahkan buku");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/books">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Tambah Buku</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Form Tambah Buku</CardTitle>
              <CardDescription>
                Isikan data buku yang ingin ditambahkan ke perpustakaan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Judul Buku</Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul buku"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  placeholder="Masukkan nama penulis"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              {/* Rating & Views - Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="0"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="views">Views</Label>
                  <Input
                    id="views"
                    type="number"
                    placeholder="0"
                    value={views}
                    onChange={(e) => setViews(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Language & Free Book */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Bahasa</Label>
                  <Input
                    id="language"
                    placeholder="Contoh: Indonesia, English"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-4 pt-6">
                  <Switch
                    id="isFree"
                    checked={isFree}
                    onCheckedChange={setIsFree}
                  />
                  <Label htmlFor="isFree" className="cursor-pointer">
                    {isFree ? "Buku Gratis" : "Buku Berbayar"}
                  </Label>
                </div>
              </div>

              {/* Synopsis */}
              <div className="space-y-2">
                <Label htmlFor="sinopsis">Sinopsis</Label>
                <Textarea
                  id="sinopsis"
                  placeholder="Tuliskan sinopsis buku"
                  value={sinopsis}
                  onChange={(e) => setSinopsis(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Story */}
              <div className="space-y-2">
                <Label htmlFor="story">Cerita / Konten</Label>
                <Textarea
                  id="story"
                  placeholder="Tuliskan cerita atau konten buku"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={6}
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">URL Gambar</Label>
                <Input
                  id="image"
                  placeholder="https://example.com/cover.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                {image && (
                  <div className="mt-2">
                    <img 
                      src={image} 
                      alt="Preview" 
                      className="h-32 w-auto object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={saveBook}
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Simpan Buku
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/books")}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}