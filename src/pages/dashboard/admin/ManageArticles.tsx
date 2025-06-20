import { useState } from "react";
import toast from "react-hot-toast";

// RTK Query Hooks (yeh pehle se hi adminApiService.ts mein aapse banaye gaye hain)
import {
  useGetAllCareerArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from "@/features/admin/adminApiService";

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit } from "lucide-react";

// Initial state for the form
const initialFormData = {
  title: "",
  slug: "",
  summary: "",
  category: "",
  icon: "", // Icon name from lucide-react
  content: "",
};

// Available categories for the dropdown
const articleCategories = [
  "Finding a Job",
  "Resumes & Cover Letters",
  "Interviewing",
  "Pay & Salary",
  "Career Development",
  "Resume Sample",
  "Cover Letter Sample",
  "Starting a New Job",
];

const ManageArticles = () => {
  // State for the form and for tracking which article is being edited
  const [formData, setFormData] = useState(initialFormData);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  // RTK Query Hooks
  const {
    data: articlesResponse,
    isLoading: isLoadingArticles,
    isError,
  } = useGetAllCareerArticlesQuery();
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();

  const articles = articlesResponse?.data || [];

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category select change
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Reset form and editing state
  const resetForm = () => {
    setFormData(initialFormData);
    setEditingArticleId(null);
  };

  // Handle form submission (for both Create and Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticleId) {
        // --- UPDATE LOGIC ---
        await updateArticle({ id: editingArticleId, data: formData }).unwrap();
        toast.success("Article updated successfully!");
      } else {
        // --- CREATE LOGIC ---
        await createArticle(formData).unwrap();
        toast.success("Article created successfully!");
      }
      resetForm();
    } catch (err: any) {
      console.error("Failed to save article:", err);
      const errorMessage =
        err.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Handle clicking the "Edit" button
  const handleEdit = (article: any) => {
    setEditingArticleId(article._id);
    // Populate form with existing article data
    setFormData({
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      category: article.category,
      icon: article.icon || "",
      content: article.content,
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top to see the form
  };

  // Handle clicking the "Delete" button
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id).unwrap();
        toast.success("Article deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete the article.");
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* --- FORM SECTION (FOR CREATE & EDIT) --- */}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>
            {editingArticleId
              ? "Edit Career Article"
              : "Create New Career Article"}
          </CardTitle>
          <CardDescription>
            {editingArticleId
              ? "Update the article details below."
              : "Write and publish a new article for the career guide."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL-friendly-name)</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category} // Controlled component
                  onValueChange={handleSelectChange}
                  name="category"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {articleCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon Name (e.g., Briefcase)</Label>
                <Input
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isCreating || isUpdating}>
              {editingArticleId
                ? isUpdating
                  ? "Updating..."
                  : "Update Article"
                : isCreating
                  ? "Publishing..."
                  : "Publish Article"}
            </Button>
            {editingArticleId && (
              <Button variant="outline" type="button" onClick={resetForm}>
                Cancel Edit
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      {/* --- DISPLAY SECTION (TABLE OF ALL ARTICLES) --- */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Career Articles</CardTitle>
          <CardDescription>
            View, edit, or delete existing articles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingArticles ? (
            <p>Loading articles...</p>
          ) : isError ? (
            <p className="text-red-500">
              Failed to load articles. Please try again.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length > 0 ? (
                  articles.map((article: any) => (
                    <TableRow key={article._id}>
                      <TableCell className="font-medium">
                        {article.title}
                      </TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>{article.slug}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(article)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(article._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No articles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageArticles;
